import { useState } from 'react';
import Layout from '../components/Layout';
import { Calendar, Video, BookOpen, FileText, Clock, Users, Play } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export default function StudentDashboard() {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'recordings'>('upcoming');

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

  const handleJoinClass = (link: string) => {
    navigate('meeting-lobby');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here are your upcoming classes and materials.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">12</span>
            </div>
            <h3 className="text-gray-600 font-medium">Classes This Week</h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">94%</span>
            </div>
            <h3 className="text-gray-600 font-medium">Attendance Rate</h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">8</span>
            </div>
            <h3 className="text-gray-600 font-medium">New Materials</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 font-medium rounded-lg transition ${
                  activeTab === 'upcoming'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Upcoming Classes
              </button>
              <button
                onClick={() => setActiveTab('recordings')}
                className={`px-4 py-2 font-medium rounded-lg transition ${
                  activeTab === 'recordings'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Recorded Sessions
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'upcoming' && (
              <div className="space-y-4">
                {upcomingClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition"
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
                        <p className="text-sm text-gray-600">{cls.teacher}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {cls.time}
                          </span>
                          <span className="text-xs text-gray-500">{cls.duration}</span>
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
                      <button
                        onClick={() => handleJoinClass(cls.link)}
                        className={`px-6 py-2 rounded-lg font-medium transition ${
                          cls.status === 'live'
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
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
                {recordings.map((recording) => (
                  <div
                    key={recording.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{recording.title}</h3>
                        <p className="text-sm text-gray-600">{recording.teacher}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">{recording.date}</span>
                          <span className="text-xs text-gray-500">{recording.duration}</span>
                          <span className="text-xs text-gray-500">{recording.views} views</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                      Watch
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Class Notes</h2>
          <div className="space-y-3">
            {[
              { title: 'Calculus - Chapter 5 Notes', date: 'March 15, 2024', size: '2.4 MB' },
              { title: 'Physics Lab Report Template', date: 'March 14, 2024', size: '1.8 MB' },
              { title: 'Algorithm Design Patterns', date: 'March 13, 2024', size: '3.1 MB' }
            ].map((note, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{note.title}</p>
                    <p className="text-xs text-gray-500">{note.date} • {note.size}</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
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
