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

function App() {
  const { user, profile, loading } = useAuth();
  const { page, navigate } = useNavigation();

  useEffect(() => {
    if (!loading) {
      if (!user && page !== 'landing' && page !== 'login') {
        navigate('landing');
      }

      if (user && profile && (page === 'landing' || page === 'login')) {
        navigate('dashboard');
      }
    }
  }, [user, profile, loading, page, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  switch (page) {
    case 'landing':
      return <Landing />;
    case 'login':
      return <Login />;
    case 'dashboard':
      return user && profile ? (
        <Dashboard role={profile.role as any} userName={profile.full_name} />
      ) : (
        <Login />
      );
    case 'student-dashboard':
      return <StudentDashboard />;
    case 'teacher-dashboard':
      return <TeacherDashboard />;
    case 'parent-dashboard':
      return <ParentDashboard />;
    case 'admin-dashboard':
      return <AdminDashboard />;
    case 'meeting-lobby':
      return <MeetingLobby />;
    case 'live-classroom':
      return <LiveClassroom />;
    case 'profile':
      return <Profile />;
    case 'help':
      return <Help />;
    default:
      return <Landing />;
  }
}

export default App;