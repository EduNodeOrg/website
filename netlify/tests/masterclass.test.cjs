const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { handler } = require('../functions/masterclass');
const { catalog, FREE_LESSON_COUNT } = require('../../src/components/Masterclasses/catalog');
const freeLessons = require('../../src/components/Masterclasses/freeLessons');
const paid = ['python', 'sql', 'ai', 'security', 'cloud', 'javascript', 'git', 'networking', 'pandas', 'itsupport', 'stablecoins', 'ethereum', 'stellar', 'zk', 'crypto', 'bitcoin', 'chatgpt', 'claude', 'gemini', 'deepseek', 'kimi', 'glm', 'devin', 'jev'].map((file) => require(`../content/${file}`));
const originalFetch = global.fetch;
afterEach(() => { global.fetch = originalFetch; });

function event(course = catalog[0], index = 2, token) {
  return {
    httpMethod: 'GET',
    headers: token ? { 'x-auth-token': token } : {},
    queryStringParameters: { course: course.slug, lesson: course.lessons[index].slug },
  };
}
function subscription(data = { plan: 'pro', status: 'active' }, status = 200) {
  global.fetch = async (url, options) => {
    assert.equal(url, 'https://edunode.herokuapp.com/api/stripe/subscription-status');
    assert.equal(options.headers['x-auth-token'], 'test-session');
    assert.equal(options.redirect, 'error');
    assert.ok(options.signal);
    return { ok: status >= 200 && status < 300, status, json: async () => data };
  };
}

test('all twenty-four classes contain exactly two public and eight comprehensive paid lessons', () => {
  assert.equal(catalog.length, 24);
  for (const [index, course] of catalog.entries()) {
    assert.equal(course.lessons.length, 10);
    assert.equal(freeLessons[course.slug].length, FREE_LESSON_COUNT);
    assert.equal(paid[index].length, 8);
    assert.equal(FREE_LESSON_COUNT / course.lessons.length, 0.2);
    assert.equal(new Set(course.lessons.map((lesson) => lesson.slug)).size, 10);
    for (const lesson of [...freeLessons[course.slug], ...paid[index]]) {
      assert.ok(lesson.objectives.length >= 3);
      assert.ok(lesson.sections.length >= 3);
      assert.ok(lesson.sections.every((section) => section.title && section.text.length > 100));
      assert.ok(lesson.exercise.instructions.length >= 3);
      assert.ok(lesson.exercise.solution.length > 100);
      assert.ok(lesson.quiz.options.length >= 3);
      assert.ok(Number.isInteger(lesson.quiz.answer));
      assert.ok(lesson.quiz.options[lesson.quiz.answer]);
      assert.ok(lesson.quiz.explanation.length > 30);
    }
  }
});

test('all forty-eight free lessons work without authentication or a membership-service request', async () => {
  global.fetch = () => { throw new Error('Free access must not call the subscription service'); };
  for (const course of catalog) {
    for (let index = 0; index < FREE_LESSON_COUNT; index++) {
      const response = await handler(event(course, index));
      assert.equal(response.statusCode, 200);
      assert.deepEqual(JSON.parse(response.body).lesson, freeLessons[course.slug][index]);
    }
  }
});

test('all 192 paid lesson URLs reject anonymous callers without returning bodies', async () => {
  for (const course of catalog) {
    for (let index = FREE_LESSON_COUNT; index < course.lessons.length; index++) {
      const response = await handler(event(course, index));
      assert.equal(response.statusCode, 401);
      assert.equal(JSON.parse(response.body).lesson, undefined);
    }
  }
});

test('client-supplied membership flags cannot unlock a lesson', async () => {
  subscription({ plan: 'free', status: 'none' });
  const request = event(catalog[0], 2, 'test-session');
  request.queryStringParameters.plan = 'pro';
  request.queryStringParameters.isPro = 'true';
  request.headers['x-membership-tier'] = 'Pro';
  const response = await handler(request);
  assert.equal(response.statusCode, 403);
  assert.equal(JSON.parse(response.body).lesson, undefined);
});

test('verified active Pro members receive the correct private lesson for every URL', async () => {
  subscription({ plan: 'pro', status: 'active', currentPeriodEnd: '2099-01-01T00:00:00Z' });
  for (const [courseIndex, course] of catalog.entries()) {
    for (let index = FREE_LESSON_COUNT; index < course.lessons.length; index++) {
      const response = await handler(event(course, index, 'test-session'));
      assert.equal(response.statusCode, 200);
      assert.deepEqual(JSON.parse(response.body).lesson, paid[courseIndex][index - FREE_LESSON_COUNT]);
      assert.equal(response.headers['Cache-Control'], 'private, no-store');
      assert.equal(response.headers['Netlify-CDN-Cache-Control'], 'no-store');
    }
  }
});

test('expired, canceled, unpaid, past-due, invalid, and free subscriptions fail closed', async () => {
  for (const data of [
    { plan: 'pro', status: 'canceled' },
    { plan: 'pro', status: 'unpaid' },
    { plan: 'pro', status: 'past_due' },
    { plan: 'pro', status: 'incomplete' },
    { plan: 'free', status: 'active' },
    { plan: 'pro', status: 'active', currentPeriodEnd: '2020-01-01T00:00:00Z' },
    { plan: 'pro', status: 'active', currentPeriodEnd: 'invalid-date' },
    {},
  ]) {
    subscription(data);
    const response = await handler(event(catalog[0], 2, 'test-session'));
    assert.equal(response.statusCode, 403);
    assert.equal(JSON.parse(response.body).lesson, undefined);
  }
});

test('trialing Pro and authoritative Enterprise subscriptions qualify', async () => {
  for (const data of [{ plan: 'pro', status: 'trialing' }, { plan: 'enterprise', status: 'active' }]) {
    subscription(data);
    assert.equal((await handler(event(catalog[0], 2, 'test-session'))).statusCode, 200);
  }
});

test('membership checks return only entitlement and normalize header case', async () => {
  subscription();
  const response = await handler({
    httpMethod: 'GET', headers: { 'X-Auth-Token': 'test-session' }, queryStringParameters: { access: '1' },
  });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), { hasAccess: true });
});

test('invalid sessions produce an authentication response, never paid content', async () => {
  for (const status of [400, 401, 403]) {
    subscription({}, status);
    assert.equal((await handler(event(catalog[0], 2, 'test-session'))).statusCode, 401);
  }
  assert.equal((await handler(event(catalog[0], 2, '[object Object]'))).statusCode, 401);
});

test('upstream outages, malformed responses, and timeouts are retryable without granting access', async () => {
  for (const status of [404, 429, 500, 503]) {
    subscription({}, status);
    const response = await handler(event(catalog[0], 2, 'test-session'));
    assert.equal(response.statusCode, 503);
    assert.equal(JSON.parse(response.body).lesson, undefined);
  }
  global.fetch = async () => { throw new Error('timeout'); };
  assert.equal((await handler(event(catalog[0], 2, 'test-session'))).statusCode, 503);
  global.fetch = async () => ({ ok: true, json: async () => { throw new Error('invalid JSON'); } });
  assert.equal((await handler(event(catalog[0], 2, 'test-session'))).statusCode, 503);
});

test('unknown lessons, prototype keys, and unsupported methods are rejected', async () => {
  global.fetch = () => { throw new Error('Invalid routes must not perform authentication'); };
  for (const query of [
    { course: '__proto__', lesson: 'constructor' },
    { course: '../../content/python', lesson: 'functions-and-errors' },
    { course: catalog[0].slug, lesson: 'not-a-lesson' },
    {},
  ]) {
    assert.equal((await handler({ httpMethod: 'GET', queryStringParameters: query })).statusCode, 404);
  }
  const response = await handler({ ...event(), httpMethod: 'POST' });
  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.Allow, 'GET');
});
