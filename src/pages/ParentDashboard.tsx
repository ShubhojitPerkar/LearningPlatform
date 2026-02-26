import Layout from '../components/Layout';
import { Calendar, TrendingUp, Clock, AlertCircle, CheckCircle, User } from 'lucide-react';

export default function ParentDashboard() {
  const children = [
    { id: '1', name: 'Emma Johnson', grade: '10th Grade', attendance: 95 },
    { id: '2', name: 'Lucas Johnson', grade: '8th Grade', attendance: 92 }
  ];

  const upcomingClasses = [
    { subject: 'Mathematics', time: 'Today at 2:00 PM', student: 'Emma' },
    { subject: 'Physics', time: 'Today at 4:00 PM', student: 'Emma' },
    { subject: 'English', time: 'Tomorrow at 10:00 AM', student: 'Lucas' }
  ];

  const recentActivity = [
    { student: 'Emma', activity: 'Attended Mathematics class', time: '2 hours ago', status: 'attended' },
    { student: 'Lucas', activity: 'Missed English class', time: '1 day ago', status: 'missed' },
    { student: 'Emma', activity: 'Submitted Physics assignment', time: '2 days ago', status: 'completed' }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Parent Dashboard</h1>
          <p className="text-gray-600">Monitor your children's academic progress and attendance.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {children.map((child) => (
            <div key={child.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{child.name}</h3>
                    <p className="text-sm text-gray-600">{child.grade}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{child.attendance}%</p>
                  <p className="text-xs text-gray-600">Attendance</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Classes</p>
                  <p className="text-lg font-semibold text-gray-900">12</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Attended</p>
                  <p className="text-lg font-semibold text-gray-900">48</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Avg Grade</p>
                  <p className="text-lg font-semibold text-gray-900">A-</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Upcoming Classes
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {upcomingClasses.map((cls, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{cls.subject}</p>
                    <p className="text-sm text-gray-600">{cls.student}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900 flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      {cls.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Recent Activity
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.status === 'attended' || activity.status === 'completed'
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}>
                    {activity.status === 'attended' || activity.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.student}</p>
                    <p className="text-sm text-gray-600">{activity.activity}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h2>
          <div className="space-y-4">
            {[
              { subject: 'Mathematics', emma: 92, lucas: 88 },
              { subject: 'Physics', emma: 95, lucas: 90 },
              { subject: 'English', emma: 89, lucas: 85 },
              { subject: 'History', emma: 91, lucas: 87 }
            ].map((subject, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-900">{subject.subject}</span>
                  <span className="text-gray-600">Emma: {subject.emma}% | Lucas: {subject.lucas}%</span>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${subject.emma}%` }}
                    />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-green-600 h-full rounded-full"
                      style={{ width: `${subject.lucas}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
