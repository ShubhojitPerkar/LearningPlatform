import { useState, useEffect } from 'react';

export type Page =
  | 'landing'
  | 'login'
  | 'otp'
  | 'dashboard'
  | 'student-dashboard'
  | 'teacher-dashboard'
  | 'parent-dashboard'
  | 'admin-dashboard'
  | 'meeting-lobby'
  | 'live-classroom'
  | 'profile'
  | 'help';

let currentPage: Page = 'landing';
let listeners: Array<(page: Page) => void> = [];

export function useNavigation() {
  const [page, setPage] = useState<Page>(currentPage);

  useEffect(() => {
    const listener = (newPage: Page) => setPage(newPage);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const navigate = (newPage: Page) => {
    currentPage = newPage;
    listeners.forEach(listener => listener(newPage));
  };

  return { page, navigate };
}
