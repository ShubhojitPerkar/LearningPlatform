import Layout from '../components/Layout';
import {
  Calendar,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  User
} from 'lucide-react';

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
    {
      student: 'Emma',
      activity: 'Attended Mathematics class',
      time: '2 hours ago',
      status: 'attended'
    },
    {
      student: 'Lucas',
      activity: 'Missed English class',
      time: '1 day ago',
      status: 'missed'
    },
    {
      student: 'Emma',
      activity: 'Submitted Physics assignment',
      time: '2 days ago',
      status: 'completed'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Parent Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor your children's academic progress and attendance.
          </p>
        </div>

        {/* CHILDREN OVERVIEW */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {children.map(child => (
            <div
              key={child.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {child.name}
                    </h3>
                    <p className="text-sm text-gray-600">{child.grade}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {child.attendance}%
                  </p>
                  <p className="text-xs text-gray-600">Attendance</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <StatBox label="Classes" value="12" bg="blue" />
                <StatBox label="Attended" value="48" bg="green" />
                <StatBox label="Avg Grade" value="A-" bg="orange" />
              </div>
            </div>
          ))}
        </div>

        {/* UPCOMING + ACTIVITY */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          {/* UPCOMING CLASSES */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <SectionHeader icon={Calendar} title="Upcoming Classes" />
            <div className="p-6 space-y-4">
              {upcomingClasses.map((cls, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {cls.subject}
                    </p>
                    <p className="text-sm text-gray-600">
                      {cls.student}
                    </p>
                  </div>
                  <p className="text-sm text-gray-900 flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    {cls.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <SectionHeader icon={TrendingUp} title="Recent Activity" />
            <div className="p-6 space-y-4">
              {recentActivity.map((item, idx) => {
                const success =
                  item.status === 'attended' ||
                  item.status === 'completed';

                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        success ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      {success ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.student}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.activity}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PERFORMANCE OVERVIEW */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Overview
          </h2>

          {[
            { subject: 'Mathematics', emma: 92, lucas: 88 },
            { subject: 'Physics', emma: 95, lucas: 90 },
            { subject: 'English', emma: 89, lucas: 85 },
            { subject: 'History', emma: 91, lucas: 87 }
          ].map((item, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">{item.subject}</span>
                <span className="text-gray-600">
                  Emma: {item.emma}% | Lucas: {item.lucas}%
                </span>
              </div>

              <div className="flex gap-2">
                <ProgressBar value={item.emma} color="blue" />
                <ProgressBar value={item.lucas} color="green" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}

/* ---------- Helper Components ---------- */

function SectionHeader({
  icon: Icon,
  title
}: {
  icon: any;
  title: string;
}) {
  return (
    <div className="border-b border-gray-200 px-6 py-4">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center">
        <Icon className="w-5 h-5 mr-2 text-blue-600" />
        {title}
      </h2>
    </div>
  );
}

function StatBox({
  label,
  value,
  bg
}: {
  label: string;
  value: string;
  bg: 'blue' | 'green' | 'orange';
}) {
  const colors: any = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    orange: 'bg-orange-50'
  };

  return (
    <div className={`${colors[bg]} rounded-lg p-3`}>
      <p className="text-xs text-gray-600 mb-1">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function ProgressBar({
  value,
  color
}: {
  value: number;
  color: 'blue' | 'green';
}) {
  const colors: any = {
    blue: 'bg-blue-600',
    green: 'bg-green-600'
  };

  return (
    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className={`${colors[color]} h-full rounded-full`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}