import { useState } from 'react';
import Layout from '../components/Layout';
import {
  Plus,
  Video,
  Calendar,
  Users,
  BookOpen,
  Play,
  Settings
} from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

type ClassStatus = 'live' | 'scheduled';

interface ClassItem {
  id: string;
  title: string;
  time: string;
  students: number;
  status: ClassStatus;
}

export default function TeacherDashboard() {
  const { navigate } = useNavigation();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const classes: ClassItem[] = [
    {
      id: '1',
      title: 'Mathematics - Calculus',
      time: 'Today at 2:00 PM',
      students: 32,
      status: 'live'
    },
    {
      id: '2',
      title: 'Advanced Mathematics',
      time: 'Today at 4:00 PM',
      students: 28,
      status: 'scheduled'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Teacher Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your classes and student engagement.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Class</span>
          </button>
        </div>

        {/* STATS */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Video />} value="8" label="Active Classes" color="blue" />
          <StatCard icon={<Users />} value="243" label="Total Students" color="green" />
          <StatCard icon={<Calendar />} value="15" label="Classes This Week" color="purple" />
          <StatCard icon={<Play />} value="42" label="Recordings" color="orange" />
        </div>

        {/* TODAY'S SCHEDULE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Today's Schedule
            </h2>
          </div>

          <div className="p-6 space-y-4">
            {classes.map(cls => (
              <div
                key={cls.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      cls.status === 'live' ? 'bg-red-100' : 'bg-blue-100'
                    }`}
                  >
                    <Video
                      className={`w-6 h-6 ${
                        cls.status === 'live'
                          ? 'text-red-600'
                          : 'text-blue-600'
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {cls.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm">
                      <span className="text-gray-600">{cls.time}</span>
                      <span className="text-gray-500 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {cls.students} students
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {cls.status === 'live' && (
                    <div className="flex items-center space-x-2 px-3 py-1.5 bg-red-50 rounded-full">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span className="text-sm text-red-700 font-medium">
                        Live Now
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Settings className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('live-classroom')}
                    className={`px-6 py-2 rounded-lg font-medium text-white transition ${
                      cls.status === 'live'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {cls.status === 'live' ? 'Enter Class' : 'Start Class'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LOWER PANELS */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* RECENT ACTIVITY */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { student: 'John Doe', action: 'Submitted assignment', time: '5 min ago' },
                { student: 'Jane Smith', action: 'Joined class', time: '12 min ago' },
                { student: 'Mike Johnson', action: 'Downloaded notes', time: '1 hour ago' }
              ].map((a, i) => (
                <div key={i} className="flex justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{a.student}</p>
                    <p className="text-sm text-gray-600">{a.action}</p>
                  </div>
                  <span className="text-xs text-gray-500">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MATERIALS */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-semibold mb-4">Class Materials</h2>
            <div className="space-y-3">
              {[
                { title: 'Calculus - Chapter 5 Notes', uploads: 32 },
                { title: 'Practice Problems Set 3', uploads: 28 },
                { title: 'Mid-term Study Guide', uploads: 45 }
              ].map((m, i) => (
                <div key={i} className="flex justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{m.title}</p>
                      <p className="text-xs text-gray-500">
                        {m.uploads} students accessed
                      </p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CREATE CLASS MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold mb-6">Create New Class</h2>

            <div className="space-y-4">
              <input className="input" placeholder="Class Title" />
              <textarea className="input" rows={3} placeholder="Description" />
              <div className="grid grid-cols-2 gap-4">
                <input type="datetime-local" className="input" />
                <input type="number" className="input" placeholder="Duration (min)" />
              </div>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="w-4 h-4" />
                <span>Enable recording</span>
              </label>
            </div>

            <div className="flex space-x-3 mt-8">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 border rounded-lg py-3 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700"
              >
                Create Class
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

/* ---------- Small Helper ---------- */

function StatCard({ icon, value, label, color }: any) {
  const colors: any = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors[color]}`}>
          {icon}
        </div>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <h3 className="text-gray-600 font-medium">{label}</h3>
    </div>
  );
}