import { useState } from 'react';
import Layout from '../components/Layout';
import {
  Calendar,
  Video,
  BookOpen,
  FileText,
  Clock,
  Users,
  Play
} from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

type Tab = 'upcoming' | 'recordings';

export default function StudentDashboard() {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');

  const upcomingClasses = [
    {
      id: '1',
      title: 'Mathematics - Calculus',
      teacher: 'Prof. Sarah Johnson',
      time: 'Today at 2:00 PM',
      duration: '60 min',
      status: 'live' as const,
      link: 'MTH-101-2024'
    },
    {
      id: '2',
      title: 'Physics - Quantum Mechanics',
      teacher: 'Dr. Michael Chen',
      time: 'Today at 4:00 PM',
      duration: '90 min',
      status: 'scheduled' as const,
      link: 'PHY-301-2024'
    },
    {
      id: '3',
      title: 'Computer Science - Algorithms',
      teacher: 'Prof. Emily Davis',
      time: 'Tomorrow at 10:00 AM',
      duration: '60 min',
      status: 'scheduled' as const,
      link: 'CS-201-2024'
    }
  ];

  const recordings = [
    {
      id: '1',
      title: 'Introduction to Linear Algebra',
      teacher: 'Prof. Sarah Johnson',
      date: 'March 15, 2024',
      duration: '58:42',
      views: 124
    },
    {
      id: '2',
      title: 'Thermodynamics Fundamentals',
      teacher: 'Dr. Michael Chen',
      date: 'March 14, 2024',
      duration: '1:25:18',
      views: 98
    }
  ];

  const handleJoinClass = () => {
    navigate('meeting-lobby');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Student Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here are your upcoming classes and materials.
          </p>
        </div>

        {/* STATS */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<Calendar />} value="12" label="Classes This Week" color="blue" />
          <StatCard icon={<Users />} value="94%" label="Attendance Rate" color="green" />
          <StatCard icon={<FileText />} value="8" label="New Materials" color="purple" />
        </div>

        {/* TABS */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b px-6 py-4 flex space-x-4">
            <TabButton
              active={activeTab === 'upcoming'}
              onClick={() => setActiveTab('upcoming')}
              label="Upcoming Classes"
            />
            <TabButton
              active={activeTab === 'recordings'}
              onClick={() => setActiveTab('recordings')}
              label="Recorded Sessions"
            />
          </div>

          <div className="p-6">
            {activeTab === 'upcoming' && (
              <div className="space-y-4">
                {upcomingClasses.map(cls => (
                  <div
                    key={cls.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-300 transition"
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
                        <h3 className="font-semibold">{cls.title}</h3>
                        <p className="text-sm text-gray-600">{cls.teacher}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {cls.time}
                          </span>
                          <span>{cls.duration}</span>
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
                        onClick={handleJoinClass}
                        className={`px-6 py-2 rounded-lg font-medium text-white ${
                          cls.status === 'live'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {cls.status === 'live' ? 'Join Now' : 'Join'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'recordings' && (
              <div className="space-y-4">
                {recordings.map(rec => (
                  <div
                    key={rec.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-300 transition"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{rec.title}</h3>
                        <p className="text-sm text-gray-600">{rec.teacher}</p>
                        <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                          <span>{rec.date}</span>
                          <span>{rec.duration}</span>
                          <span>{rec.views} views</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      Watch
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* NOTES */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Class Notes</h2>
          <div className="space-y-3">
            {[
              { title: 'Calculus - Chapter 5 Notes', date: 'March 15, 2024', size: '2.4 MB' },
              { title: 'Physics Lab Report Template', date: 'March 14, 2024', size: '1.8 MB' },
              { title: 'Algorithm Design Patterns', date: 'March 13, 2024', size: '3.1 MB' }
            ].map((note, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{note.title}</p>
                    <p className="text-xs text-gray-500">
                      {note.date} • {note.size}
                    </p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}

/* ---------- Small Helpers ---------- */

function StatCard({ icon, value, label, color }: any) {
  const colors: any = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600'
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

function TabButton({ active, onClick, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition ${
        active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
}