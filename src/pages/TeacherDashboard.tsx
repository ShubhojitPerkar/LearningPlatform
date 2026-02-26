import { useState } from 'react';
import Layout from '../components/Layout';
import { Plus, Video, Calendar, Users, FileText, BarChart3, Clock, Settings, Play } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export default function TeacherDashboard() {
  const { navigate } = useNavigation();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const classes = [
    {
      id: '1',
      title: 'Mathematics - Calculus',
      time: 'Today at 2:00 PM',
      students: 32,
      status: 'live' as const
    },
    {
      id: '2',
      title: 'Advanced Mathematics',
      time: 'Today at 4:00 PM',
      students: 28,
      status: 'scheduled' as const
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
            <p className="text-gray-600">Manage your classes and student engagement.</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Class</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">8</span>
            </div>
            <h3 className="text-gray-600 font-medium">Active Classes</h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">243</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Students</h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">15</span>
            </div>
            <h3 className="text-gray-600 font-medium">Classes This Week</h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">42</span>
            </div>
            <h3 className="text-gray-600 font-medium">Recordings</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
          </div>
          <div className="p-6 space-y-4">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    cls.status === 'live' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <Video className={`w-6 h-6 ${
                      cls.status === 'live' ? 'text-red-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{cls.title}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600">{cls.time}</span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {cls.students} students
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {cls.status === 'live' && (
                    <div className="flex items-center space-x-2 px-3 py-1.5 bg-red-50 rounded-full">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-red-700 font-medium">Live Now</span>
                    </div>
                  )}
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                    <Settings className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigate('live-classroom')}
                    className={`px-6 py-2 rounded-lg font-medium transition ${
                      cls.status === 'live'
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {cls.status === 'live' ? 'Enter Class' : 'Start Class'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { student: 'John Doe', action: 'Submitted assignment', time: '5 min ago' },
                { student: 'Jane Smith', action: 'Joined class', time: '12 min ago' },
                { student: 'Mike Johnson', action: 'Downloaded notes', time: '1 hour ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.student}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Class Materials</h2>
            <div className="space-y-3">
              {[
                { title: 'Calculus - Chapter 5 Notes', uploads: 32 },
                { title: 'Practice Problems Set 3', uploads: 28 },
                { title: 'Mid-term Study Guide', uploads: 45 }
              ].map((material, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{material.title}</p>
                      <p className="text-xs text-gray-500">{material.uploads} students accessed</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Class</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Mathematics - Calculus"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Brief description of the class"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="60"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="recording" className="w-4 h-4 text-blue-600" />
                <label htmlFor="recording" className="text-sm text-gray-700">Enable recording</label>
              </div>
            </div>
            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Create Class
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
