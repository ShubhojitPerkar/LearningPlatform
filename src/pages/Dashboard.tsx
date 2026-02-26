import { useState } from 'react';
import Layout from '../components/Layout';
import {
  Calendar, Video, Users, BookOpen, BarChart3, Bell, Settings,
  Plus, Play, Clock, CheckCircle, AlertCircle, TrendingUp, Award
} from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

interface DashboardProps {
  role: 'student' | 'teacher' | 'parent' | 'admin';
  userName: string;
}

export default function Dashboard({ role, userName }: DashboardProps) {
  const { navigate } = useNavigation();
  const [notifications] = useState(3);

  const getDashboardContent = () => {
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

  const renderStudentDashboard = () => (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">3</span>
          </div>
          <h3 className="text-gray-600 font-medium">Classes This Week</h3>
          <p className="text-xs text-gray-500 mt-1">Next: Today at 2:00 PM</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">94%</span>
          </div>
          <h3 className="text-gray-600 font-medium">Attendance</h3>
          <p className="text-xs text-gray-500 mt-1">Excellent standing</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">8</span>
          </div>
          <h3 className="text-gray-600 font-medium">New Materials</h3>
          <p className="text-xs text-gray-500 mt-1">Unread resources</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">A-</span>
          </div>
          <h3 className="text-gray-600 font-medium">Grade Average</h3>
          <p className="text-xs text-gray-500 mt-1">Consistent performance</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Today's Classes</h2>
            <button
              onClick={() => navigate('student-dashboard')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </button>
          </div>
          <div className="p-6 space-y-4">
            {[
              { title: 'Mathematics - Calculus', time: '2:00 PM', teacher: 'Prof. Sarah Johnson', status: 'live' },
              { title: 'Physics - Quantum Mechanics', time: '4:00 PM', teacher: 'Dr. Michael Chen', status: 'upcoming' }
            ].map((cls, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    cls.status === 'live' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <Video className={`w-6 h-6 ${cls.status === 'live' ? 'text-red-600' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{cls.title}</h3>
                    <p className="text-sm text-gray-600">{cls.teacher}</p>
                    <p className="text-xs text-gray-500 mt-1">{cls.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('meeting-lobby')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    cls.status === 'live'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {cls.status === 'live' ? 'Join Now' : 'Join'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            <button
              onClick={() => navigate('meeting-lobby')}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Join Class</span>
            </button>
            <button
              onClick={() => navigate('student-dashboard')}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>View Schedule</span>
            </button>
            <button
              onClick={() => navigate('profile')}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">3</span>
          </div>
          <h3 className="text-gray-600 font-medium">Classes This Week</h3>
          <p className="text-xs text-gray-500 mt-1">95 total students</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">87%</span>
          </div>
          <h3 className="text-gray-600 font-medium">Avg Attendance</h3>
          <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">12</span>
          </div>
          <h3 className="text-gray-600 font-medium">Materials Shared</h3>
          <p className="text-xs text-gray-500 mt-1">This semester</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">1</span>
          </div>
          <h3 className="text-gray-600 font-medium">Live Now</h3>
          <p className="text-xs text-gray-500 mt-1">Mathematics class</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">My Classes</h2>
            <button
              onClick={() => navigate('teacher-dashboard')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </button>
          </div>
          <div className="p-6 space-y-4">
            {[
              { title: 'Mathematics - Calculus', students: 32, time: 'Now', status: 'live' },
              { title: 'Physics - Quantum Mechanics', students: 28, time: 'Today 4:00 PM', status: 'upcoming' },
              { title: 'Computer Science - Algorithms', students: 35, time: 'Tomorrow 10:00 AM', status: 'scheduled' }
            ].map((cls, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    cls.status === 'live' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <Video className={`w-6 h-6 ${cls.status === 'live' ? 'text-red-600' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{cls.title}</h3>
                    <p className="text-sm text-gray-600">{cls.students} students • {cls.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('live-classroom')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    cls.status === 'live'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {cls.status === 'live' ? 'Continue' : 'Start'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            <button
              onClick={() => navigate('teacher-dashboard')}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Class</span>
            </button>
            <button
              onClick={() => navigate('live-classroom')}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Start Teaching</span>
            </button>
            <button
              onClick={() => navigate('profile')}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderParentDashboard = () => (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">2</span>
          </div>
          <h3 className="text-gray-600 font-medium">Children</h3>
          <p className="text-xs text-gray-500 mt-1">Active students</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">93%</span>
          </div>
          <h3 className="text-gray-600 font-medium">Avg Attendance</h3>
          <p className="text-xs text-gray-500 mt-1">Both children</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">A</span>
          </div>
          <h3 className="text-gray-600 font-medium">Avg Grade</h3>
          <p className="text-xs text-gray-500 mt-1">Combined GPA</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">4</span>
          </div>
          <h3 className="text-gray-600 font-medium">Classes Today</h3>
          <p className="text-xs text-gray-500 mt-1">Upcoming schedule</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Children's Classes</h2>
            <button
              onClick={() => navigate('parent-dashboard')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </button>
          </div>
          <div className="p-6 space-y-4">
            {[
              { child: 'Emma Johnson', class: 'Mathematics', time: 'Today 2:00 PM', attendance: '95%' },
              { child: 'Lucas Johnson', class: 'Physics', time: 'Today 4:00 PM', attendance: '92%' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.child}</h3>
                  <p className="text-sm text-gray-600">{item.class} • {item.time}</p>
                  <p className="text-xs text-gray-500 mt-1">Attendance: {item.attendance}</p>
                </div>
                <div className="text-right">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">{item.attendance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            <button
              onClick={() => navigate('parent-dashboard')}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>View Progress</span>
            </button>
            <button
              onClick={() => navigate('parent-dashboard')}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Class Schedule</span>
            </button>
            <button
              onClick={() => navigate('profile')}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">1,234</span>
          </div>
          <h3 className="text-gray-600 font-medium">Total Users</h3>
          <p className="text-xs text-gray-500 mt-1">↑ 12% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">2</span>
          </div>
          <h3 className="text-gray-600 font-medium">Active Meetings</h3>
          <p className="text-xs text-gray-500 mt-1">156 total today</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">98.5%</span>
          </div>
          <h3 className="text-gray-600 font-medium">System Uptime</h3>
          <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">3</span>
          </div>
          <h3 className="text-gray-600 font-medium">Security Alerts</h3>
          <p className="text-xs text-gray-500 mt-1">Requires attention</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Active Meetings</h2>
            <button
              onClick={() => navigate('admin-dashboard')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </button>
          </div>
          <div className="p-6 space-y-4">
            {[
              { title: 'Mathematics - Calculus', teacher: 'Prof. Sarah Johnson', participants: 32 },
              { title: 'Physics - Quantum Mechanics', teacher: 'Dr. Michael Chen', participants: 28 }
            ].map((mtg, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{mtg.title}</h3>
                    <p className="text-sm text-gray-600">{mtg.teacher} • {mtg.participants} participants</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-red-50 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-red-700 font-medium">Live</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            <button
              onClick={() => navigate('admin-dashboard')}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Manage Users</span>
            </button>
            <button
              onClick={() => navigate('admin-dashboard')}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>View Analytics</span>
            </button>
            <button
              onClick={() => navigate('profile')}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userName}!</h1>
            <p className="text-gray-600">Here's what's happening with your account</p>
          </div>
          <button className="relative p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            <Bell className="w-6 h-6" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-semibold">
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
