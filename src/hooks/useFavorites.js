import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

// Favorite courses are stored per user email in localStorage. Entries are
// self-describing ({ id, title, route }) so the dashboard can render them
// without resolving titles from the API.
const keyFor = (email) => `edunode_favorite_courses_${email || 'anonymous'}`;

export const loadFavorites = (email) => {
  try {
    const raw = JSON.parse(localStorage.getItem(keyFor(email)));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
};

export const toggleFavoriteCourse = (email, course, favorites) => {
  const exists = favorites.some((f) => f.id === course.id);
  const next = exists
    ? favorites.filter((f) => f.id !== course.id)
    : [...favorites, course];
  localStorage.setItem(keyFor(email), JSON.stringify(next));
  return next;
};

export const isFavoriteCourse = (favorites, id) =>
  favorites.some((f) => f.id === id);

// Hook for function components — reads the user email from Redux auth and
// reloads favorites if the signed-in account changes.
export const useFavorites = () => {
  const email = useSelector((state) => state.auth?.user?.email) || '';
  const [favorites, setFavorites] = useState(() => loadFavorites(email));

  useEffect(() => {
    setFavorites(loadFavorites(email));
  }, [email]);

  const toggleFavorite = useCallback(
    (course) =>
      setFavorites((prev) => toggleFavoriteCourse(email, course, prev)),
    [email]
  );

  return {
    favorites,
    toggleFavorite,
    isFavorite: (id) => isFavoriteCourse(favorites, id),
  };
};

export default useFavorites;
