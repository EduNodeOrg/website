import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Masterclasses from './index';
import MasterclassLesson from './MasterclassLesson';
import freeLessons from './freeLessons';
import { catalog } from './catalog';

jest.mock('../NavBar', () => () => <nav>Navigation</nav>);
jest.mock('../Footer/Footer', () => () => <footer>Footer</footer>);

const originalFetch = global.fetch;
beforeEach(() => {
  localStorage.clear();
  window.scrollTo = jest.fn();
  global.fetch = jest.fn();
});
afterEach(() => { global.fetch = originalFetch; });

function mount(path, auth = { isAuthenticated: false }) {
  const store = createStore((state = { auth }, action) => (
    action.type === 'AUTH_CHANGED' ? { auth: action.auth } : state
  ));
  const view = render(
    <Provider store={store}><HelmetProvider><MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/masterclasses" element={<Masterclasses />} />
        <Route path="/masterclasses/:slug/lessons/:lessonSlug" element={<MasterclassLesson />} />
        <Route path="/404" element={<h1>Not found</h1>} />
      </Routes>
    </MemoryRouter></HelmetProvider></Provider>
  );
  return { store, ...view };
}

const firstPath = '/masterclasses/python-automation/lessons/your-first-script';
const paidPath = '/masterclasses/python-automation/lessons/functions-and-errors';
const member = { isAuthenticated: true, token: 'test-session', user: { id: 'student', membership: 'Pro' } };

test('catalog exposes all ten paths and topic filters work', () => {
  mount('/masterclasses');
  expect(screen.getAllByRole('article')).toHaveLength(10);
  fireEvent.click(screen.getByRole('button', { name: 'Web Development', exact: true }));
  expect(screen.getAllByRole('article')).toHaveLength(1);
  expect(screen.getByRole('heading', { name: 'JavaScript & Modern Web Fundamentals' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Data', exact: true }));
  expect(screen.getAllByRole('article')).toHaveLength(2);
  fireEvent.click(screen.getByRole('button', { name: 'All topics' }));
  expect(screen.getAllByRole('article')).toHaveLength(10);
});

test('anonymous learners can read, practice, and complete a free lesson without network access', () => {
  mount(firstPath);
  expect(screen.getByRole('heading', { name: 'Calculate in cents, format at the boundary' })).toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('radio', { name: 'Because Python cannot represent decimal numbers' }));
  fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
  expect(screen.queryByRole('button', { name: 'Mark lesson complete' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('radio', { name: 'To avoid rounding problems in the additions' }));
  fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Mark lesson complete' }));
  expect(screen.getByText('1 of 10 lessons completed')).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem('edunode:masterclasses:guest:python-automation'))).toEqual(['your-first-script']);
});

test('moving between lessons resets the knowledge check', () => {
  mount(firstPath);
  fireEvent.click(screen.getByRole('radio', { name: 'To avoid rounding problems in the additions' }));
  fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
  fireEvent.click(screen.getByRole('link', { name: /Next · Free lesson/ }));
  expect(screen.getByRole('heading', { level: 1, name: 'Data, loops, and decisions' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Check answer' })).toBeDisabled();
});

test('direct paid lesson visits show a paywall and preserve the sign-in return path', () => {
  mount(paidPath);
  expect(screen.getByRole('heading', { name: 'Your next step is included with Pro.' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Sign in to continue/ })).toHaveAttribute('href', `/login?returnTo=${encodeURIComponent(paidPath)}`);
  expect(screen.queryByText('By the end of this lesson')).not.toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();
});

test('a browser Pro flag cannot bypass a server denial', async () => {
  global.fetch.mockResolvedValue({ ok: false, status: 403, json: async () => ({ message: 'Pro required' }) });
  mount(paidPath, member);
  expect(await screen.findByRole('link', { name: /Unlock with Pro/ })).toBeInTheDocument();
  expect(screen.queryByText('By the end of this lesson')).not.toBeInTheDocument();
});

test('verified paid content is removed immediately on sign-out', async () => {
  // Use a public fixture to exercise delivery; actual private lesson bodies
  // must not enter the browser import graph, including through test fixtures.
  global.fetch.mockResolvedValue({ ok: true, json: async () => ({ lesson: freeLessons['python-automation'][0] }) });
  const { store } = mount(paidPath, member);
  expect(await screen.findByText('By the end of this lesson')).toBeInTheDocument();
  expect(global.fetch.mock.calls[0][1].headers['x-auth-token']).toBe('test-session');
  act(() => { store.dispatch({ type: 'AUTH_CHANGED', auth: { isAuthenticated: false, token: null } }); });
  expect(screen.queryByText('By the end of this lesson')).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Sign in to continue/ })).toBeInTheDocument();
});

test('verification failures can be retried without showing lesson content', async () => {
  global.fetch
    .mockResolvedValueOnce({ ok: false, status: 503, json: async () => ({ message: 'Unavailable' }) })
    .mockResolvedValueOnce({ ok: true, json: async () => ({ lesson: freeLessons['python-automation'][0] }) });
  mount(paidPath, member);
  fireEvent.click(await screen.findByRole('button', { name: 'Try again' }));
  expect(await screen.findByText('By the end of this lesson')).toBeInTheDocument();
});

test('expired sessions prompt sign-in rather than a membership purchase', async () => {
  global.fetch.mockResolvedValue({ ok: false, status: 401, json: async () => ({ message: 'Expired' }) });
  mount(paidPath, member);
  expect(await screen.findByRole('heading', { name: 'Sign in again to continue.' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Unlock with Pro/ })).not.toBeInTheDocument();
});

test('late responses from a previous account do not disclose content to a guest', async () => {
  let resolveRequest;
  global.fetch.mockImplementation(() => new Promise((resolve) => { resolveRequest = resolve; }));
  const { store } = mount(paidPath, member);
  act(() => { store.dispatch({ type: 'AUTH_CHANGED', auth: { isAuthenticated: false } }); });
  await act(async () => {
    resolveRequest({ ok: true, json: async () => ({ lesson: freeLessons['python-automation'][0] }) });
  });
  expect(screen.queryByText('By the end of this lesson')).not.toBeInTheDocument();
});

test('unknown lesson slugs use the not-found route', async () => {
  mount('/masterclasses/python-automation/lessons/not-real');
  expect(await screen.findByRole('heading', { name: 'Not found' })).toBeInTheDocument();
});
