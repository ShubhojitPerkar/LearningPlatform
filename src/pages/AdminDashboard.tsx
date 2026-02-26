import { useState } from 'react';
import Layout from '../components/Layout';
import { Shield, Users, Video, Activity, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'users' | 'meetings' | 'security'>('users');

  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'teacher', status: 'active' },
    { id: '3', name: 'Michael Chen', email: 'michael@example.com', role: 'teacher', status: 'active' },
    { id: '4', name: 'Emma Wilson', email: 'emma@example.com', role: 'parent', status: 'active' }
  ];

  const activeMeetings = [
    { id: '1', title: 'Mathematics - Calculus', teacher: 'Prof. Sarah Johnson', participants: 32, duration: '45 min' },
    { id: '2', title: 'Physics - Quantum Mechanics', teacher: 'Dr. Michael Chen', participants: 28, duration: '1 hr 15 min' }
  ];

  const securityLogs = [
    { id: '1', action: 'User Login', user: 'john@example.com', status: 'success', time: '2 min ago', ip: '192.168.1.1' },
    { id: '2', action: 'Meeting Created', user: 'sarah@example.com', status: 'success', time: '15 min ago', ip: '192.168.1.2' },
    { id: '3', action: 'Failed Login Attempt', user: 'unknown@example.com', status: 'failed', time: '1 hour ago', ip: '10.0.0.1' },
    { id: '4', action: 'Password Reset', user: 'michael@example.com', status: 'success', time: '3 hours ago', ip: '192.168.1.3' }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage platform users, meetings, and security.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">1,234</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Users</h3>
            <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">2</span>
            </div>
            <h3 className="text-gray-600 font-medium">Active Meetings</h3>
            <p className="text-xs text-blue-600 mt-1">156 total today</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">98.5%</span>
            </div>
            <h3 className="text-gray-600 font-medium">System Uptime</h3>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">3</span>
            </div>
            <h3 className="text-gray-600 font-medium">Security Alerts</h3>
            <p className="text-xs text-orange-600 mt-1">Requires attention</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 font-medium rounded-lg transition ${
                  activeTab === 'users'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                User Management
              </button>
              <button
                onClick={() => setActiveTab('meetings')}
                className={`px-4 py-2 font-medium rounded-lg transition ${
                  activeTab === 'meetings'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Active Meetings
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-4 py-2 font-medium rounded-lg transition ${
                  activeTab === 'security'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Security Logs
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">User</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-900">{user.name}</p>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{user.email}</td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium capitalize">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium capitalize">
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm mr-3">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                            Suspend
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'meetings' && (
              <div className="space-y-4">
                {activeMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Video className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                        <p className="text-sm text-gray-600">{meeting.teacher}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {meeting.participants} participants
                          </span>
                          <span className="text-xs text-gray-500">{meeting.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 px-3 py-1.5 bg-red-50 rounded-full">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-red-700 font-medium">Live</span>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
                        Monitor
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-3">
                {securityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        log.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {log.status === 'success' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{log.action}</p>
                        <p className="text-sm text-gray-600">{log.user}</p>
                        <p className="text-xs text-gray-500 mt-1">IP: {log.ip} • {log.time}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      log.status === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Platform Usage
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Daily Active Users', value: 856, max: 1000 },
                { label: 'Total Meetings Today', value: 156, max: 200 },
                { label: 'Storage Used', value: 72, max: 100 }
              ].map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-900">{metric.label}</span>
                    <span className="text-gray-600">{metric.value}/{metric.max}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${(metric.value / metric.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-600" />
              Security Status
            </h2>
            <div className="space-y-3">
              {[
                { label: 'SSL Certificate', status: 'Valid', color: 'green' },
                { label: 'Database Encryption', status: 'Active', color: 'green' },
                { label: 'Firewall Protection', status: 'Enabled', color: 'green' },
                { label: 'Backup Status', status: 'Up to date', color: 'green' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
