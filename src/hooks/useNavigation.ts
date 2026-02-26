import { useEffect, useState } from 'react';

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

function getPageFromHash(): Page {
  const hash = window.location.hash.replace('#', '');
  return (hash as Page) || 'landing';
}

export function useNavigation() {
  const [page, setPage] = useState<Page>(getPageFromHash());

  useEffect(() => {
    const onHashChange = () => {
      setPage(getPageFromHash());
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (newPage: Page) => {
    window.location.hash = newPage;
  };

  return { page, navigate };
}