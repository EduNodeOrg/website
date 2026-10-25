const { catalog, FREE_LESSON_COUNT } = require('../../src/components/Masterclasses/catalog');
const freeLessons = require('../../src/components/Masterclasses/freeLessons');
const paidLessons = {
  'python-automation': require('../content/python'),
  'sql-data-analysis': require('../content/sql'),
  'ai-workflow-automation': require('../content/ai'),
  'cybersecurity-fundamentals': require('../content/security'),
  'docker-cloud-deployment': require('../content/cloud'),
  'javascript-web-fundamentals': require('../content/javascript'),
  'git-github-collaboration': require('../content/git'),
  'networking-linux-fundamentals': require('../content/networking'),
  'data-analysis-pandas': require('../content/pandas'),
  'it-support-troubleshooting': require('../content/itsupport'),
};

const SUBSCRIPTION_URL = 'https://edunode.herokuapp.com/api/stripe/subscription-status';

function respond(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'Netlify-CDN-Cache-Control': 'no-store',
      Vary: 'Authorization, x-auth-token',
      'X-Content-Type-Options': 'nosniff',
    },
    body: JSON.stringify(body),
  };
}

async function verifyMembership(headers) {
  const token = headers['x-auth-token'];
  if (typeof token !== 'string' || !token.trim() || token === '[object Object]') {
    return { status: 401, message: 'Sign in to verify your Pro membership.' };
  }
  try {
    // The existing API verifies the JWT and looks up the subscriber itself.
    // Never accept a user ID, email, tier, or entitlement supplied by the client.
    const response = await fetch(SUBSCRIPTION_URL, {
      headers: { 'x-auth-token': token, Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
      redirect: 'error',
      cache: 'no-store',
    });
    if ([400, 401, 403].includes(response.status)) {
      return { status: 401, message: 'Your session has expired. Sign in again to continue.' };
    }
    if (!response.ok) throw new Error('Subscription service unavailable');
    const subscription = await response.json();
    const validPlan = ['pro', 'enterprise'].includes(subscription.plan);
    const validStatus = ['active', 'trialing'].includes(subscription.status);
    const periodEnd = subscription.currentPeriodEnd;
    const validPeriod = periodEnd == null || (
      Number.isFinite(Date.parse(periodEnd)) && Date.parse(periodEnd) > Date.now()
    );
    if (!validPlan || !validStatus || !validPeriod) {
      return { status: 403, message: 'An active Pro membership is required for this lesson.' };
    }
    return { status: 200 };
  } catch {
    return { status: 503, message: 'We could not verify your membership. Please try again shortly.' };
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    const response = respond(405, { message: 'Method not allowed.' });
    response.headers.Allow = 'GET';
    return response;
  }
  const query = event.queryStringParameters || {};
  let course;
  let lessonIndex;
  if (query.access !== '1') {
    course = catalog.find((item) => item.slug === query.course);
    lessonIndex = course ? course.lessons.findIndex((item) => item.slug === query.lesson) : -1;
    if (!course || lessonIndex < 0) return respond(404, { message: 'Lesson not found.' });
    if (lessonIndex < FREE_LESSON_COUNT) {
      return respond(200, { lesson: freeLessons[course.slug][lessonIndex] });
    }
  }
  const headers = Object.fromEntries(
    Object.entries(event.headers || {}).map(([key, value]) => [key.toLowerCase(), value])
  );
  const access = await verifyMembership(headers);
  if (access.status !== 200) return respond(access.status, { message: access.message });
  if (query.access === '1') return respond(200, { hasAccess: true });
  return respond(200, { lesson: paidLessons[course.slug][lessonIndex - FREE_LESSON_COUNT] });
};
