import { useState } from 'react';
import Layout from '../components/Layout';
import {
  Calendar,
  Video,
  Users,
  BookOpen,
  BarChart3,
  Bell,
  Settings,
  Plus,
  Play,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

interface DashboardProps {
  role: 'student' | 'teacher' | 'parent' | 'admin';
  userName: string;
}

export default function Dashboard({ role, userName }: DashboardProps) {
  const { navigate } = useNavigation();
  const [notifications] = useState(3);

  /* =====================
     DASHBOARD SWITCH
  ====================== */
  const getDashboardContent = () => {
    if (!role) return null;

    switch (role) {
      case 'student':
        return renderStudentDashboard();
      case 'teacher':
        return renderTeacherDashboard();
      case 'parent':
        return renderParentDashboard();
      case 'admin':
        return renderAdminDashboard();
      default:
        return renderStudentDashboard();
    }
  };

  /* =====================
     STUDENT DASHBOARD
  ====================== */
  const renderStudentDashboard = () => (
    <div className="space-y-8">
      {/* stats */}
      <div className="grid lg:grid-cols-4 gap-6">
        <StatCard icon={Calendar} value="3" label="Classes This Week" sub="Next: Today at 2:00 PM" />
        <StatCard icon={CheckCircle} value="94%" label="Attendance" sub="Excellent standing" color="green" />
        <StatCard icon={BookOpen} value="8" label="New Materials" sub="Unread resources" color="purple" />
        <StatCard icon={Award} value="A-" label="Grade Average" sub="Consistent performance" color="orange" />
      </div>

      {/* classes + actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border">
          <Header title="Today's Classes" action={() => navigate('student-dashboard')} />
          <div className="p-6 space-y-4">
            {[
              { title: 'Mathematics - Calculus', teacher: 'Prof. Sarah Johnson', time: '2:00 PM', live: true },
              { title: 'Physics - Quantum Mechanics', teacher: 'Dr. Michael Chen', time: '4:00 PM', live: false }
            ].map((cls, i) => (
              <ClassRow
                key={i}
                {...cls}
                onJoin={() => navigate('meeting-lobby')}
              />
            ))}
          </div>
        </div>

        <QuickActions
          actions={[
            { label: 'Join Class', icon: Play, onClick: () => navigate('meeting-lobby'), primary: true },
            { label: 'View Schedule', icon: Calendar, onClick: () => navigate('student-dashboard') },
            { label: 'Settings', icon: Settings, onClick: () => navigate('profile') }
          ]}
        />
      </div>
    </div>
  );

  /* =====================
     TEACHER DASHBOARD
  ====================== */
  const renderTeacherDashboard = () => (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-4 gap-6">
        <StatCard icon={Video} value="3" label="Classes This Week" sub="95 students" />
        <StatCard icon={Users} value="87%" label="Avg Attendance" sub="Last 30 days" color="green" />
        <StatCard icon={BookOpen} value="12" label="Materials Shared" sub="This semester" color="purple" />
        <StatCard icon={TrendingUp} value="1" label="Live Now" sub="Mathematics class" color="orange" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border">
          <Header title="My Classes" action={() => navigate('teacher-dashboard')} />
          <div className="p-6 space-y-4">
            {[
              { title: 'Mathematics - Calculus', students: 32, time: 'Now', live: true },
              { title: 'Physics - Quantum Mechanics', students: 28, time: '4:00 PM', live: false }
            ].map((cls, i) => (
              <ClassRow
                key={i}
                title={cls.title}
                teacher={`${cls.students} students • ${cls.time}`}
                live={cls.live}
                onJoin={() => navigate('live-classroom')}
              />
            ))}
          </div>
        </div>

        <QuickActions
          actions={[
            { label: 'New Class', icon: Plus, onClick: () => navigate('teacher-dashboard'), primary: true },
            { label: 'Start Teaching', icon: Play, onClick: () => navigate('live-classroom') },
            { label: 'Settings', icon: Settings, onClick: () => navigate('profile') }
          ]}
        />
      </div>
    </div>
  );

  /* =====================
     PARENT DASHBOARD
  ====================== */
  const renderParentDashboard = () => (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-4 gap-6">
        <StatCard icon={Users} value="2" label="Children" sub="Active students" />
        <StatCard icon={CheckCircle} value="93%" label="Avg Attendance" sub="Both children" color="green" />
        <StatCard icon={Award} value="A" label="Avg Grade" sub="Combined GPA" color="purple" />
        <StatCard icon={Calendar} value="4" label="Classes Today" sub="Upcoming" color="orange" />
      </div>
    </div>
  );

  /* =====================
     ADMIN DASHBOARD
  ====================== */
  const renderAdminDashboard = () => (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-4 gap-6">
        <StatCard icon={Users} value="1,234" label="Total Users" sub="↑ 12%" />
        <StatCard icon={Video} value="2" label="Active Meetings" sub="Today" color="green" />
        <StatCard icon={TrendingUp} value="98.5%" label="System Uptime" sub="30 days" color="purple" />
        <StatCard icon={AlertCircle} value="3" label="Security Alerts" sub="Attention" color="orange" />
      </div>
    </div>
  );

  /* =====================
     RENDER
  ====================== */
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
            <p className="text-gray-600">Here’s what’s happening</p>
          </div>
          <button className="relative p-3 rounded-lg hover:bg-gray-100">
            <Bell />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </div>

        {getDashboardContent()}
      </div>
    </Layout>
  );
}

/* =====================
   SMALL REUSABLE UI
====================== */

function StatCard({ icon: Icon, value, label, sub, color = 'blue' }: any) {
  const colors: any = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="bg-white p-6 rounded-xl border">
      <div className="flex justify-between mb-3">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <h3 className="text-gray-600">{label}</h3>
      <p className="text-xs text-gray-500">{sub}</p>
    </div>
  );
}

function Header({ title, action }: any) {
  return (
    <div className="border-b px-6 py-4 flex justify-between">
      <h2 className="font-semibold">{title}</h2>
      <button onClick={action} className="text-blue-600 text-sm">View All →</button>
    </div>
  );
}

function ClassRow({ title, teacher, time, live, onJoin }: any) {
  return (
    <div className="flex justify-between p-4 border rounded-lg">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{teacher}</p>
        {time && <p className="text-xs text-gray-500">{time}</p>}
      </div>
      <button
        onClick={onJoin}
        className={`px-4 py-2 rounded-lg ${
          live ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
        }`}
      >
        {live ? 'Join Now' : 'Join'}
      </button>
    </div>
  );
}

function QuickActions({ actions }: any) {
  return (
    <div className="bg-white rounded-xl border">
      <div className="border-b px-6 py-4 font-semibold">Quick Actions</div>
      <div className="p-6 space-y-3">
        {actions.map((a: any, i: number) => (
          <button
            key={i}
            onClick={a.onClick}
            className={`w-full px-4 py-3 rounded-lg flex items-center justify-center gap-2 ${
              a.primary ? 'bg-blue-600 text-white' : 'border'
            }`}
          >
            <a.icon className="w-4 h-4" />
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}