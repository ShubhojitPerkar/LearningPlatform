import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useNavigation } from './hooks/useNavigation';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MeetingLobby from './pages/MeetingLobby';
import LiveClassroom from './pages/LiveClassroom';
import Profile from './pages/Profile';
import Help from './pages/Help';

export default function App() {
  const { user, profile, loading } = useAuth();
  const { page, navigate } = useNavigation();

  useEffect(() => {
    if (loading) return;

    if (!user && page !== 'landing' && page !== 'login') {
      navigate('landing');
    }

    if (user && profile && (page === 'landing' || page === 'login')) {
      navigate('dashboard');
    }
  }, [user, profile, loading]);

  if (loading) return <div className="p-10">Loading...</div>;

  switch (page) {
    case 'landing': return <Landing />;
    case 'login': return <Login />;
    case 'dashboard':
      return profile ? <Dashboard role={profile.role} userName={profile.full_name} /> : <Login />;
    case 'student-dashboard': return <StudentDashboard />;
    case 'teacher-dashboard': return <TeacherDashboard />;
    case 'parent-dashboard': return <ParentDashboard />;
    case 'admin-dashboard': return <AdminDashboard />;
    case 'meeting-lobby': return <MeetingLobby />;
    case 'live-classroom': return <LiveClassroom />;
    case 'profile': return <Profile />;
    case 'help': return <Help />;
    default: return <Landing />;
  }
}