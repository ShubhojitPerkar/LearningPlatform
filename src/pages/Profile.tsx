import { useState } from 'react';
import Layout from '../components/Layout';
import { User, Mail, Phone, Lock, Bell, Shield, LogOut, Save } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export default function Profile() {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<'personal' | 'security' | 'notifications'>('personal');
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'student@securelearn.com',
    phone: '+1 (555) 123-4567',
    role: 'student',
    joinDate: 'March 10, 2024'
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      navigate('landing');
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security settings</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{formData.fullName}</h3>
                <p className="text-sm text-gray-600 capitalize">{formData.role}</p>
                <p className="text-xs text-gray-500 mt-2">{formData.email}</p>
              </div>

              <div className="space-y-2 border-t border-gray-200 pt-4">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${
                    activeTab === 'personal'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-4 h-4 inline mr-2" />
                  Personal Info
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${
                    activeTab === 'security'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Shield className="w-4 h-4 inline mr-2" />
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${
                    activeTab === 'notifications'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Bell className="w-4 h-4 inline mr-2" />
                  Notifications
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="w-full mt-6 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium flex items-center justify-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-2">Primary email address for your account</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <input
                      type="text"
                      value={formData.role}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed capitalize"
                    />
                    <p className="text-xs text-gray-500 mt-2">Contact admin to change your role</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                    <input
                      type="text"
                      value={formData.joinDate}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-blue-900">Security Status</h3>
                        <p className="text-sm text-blue-700 mt-1">Your account is protected with two-factor authentication enabled</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
                      </div>
                      <div
                        className={`w-12 h-7 rounded-full transition relative cursor-pointer ${
                          twoFactorEnabled ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                        onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition absolute top-1 ${
                            twoFactorEnabled ? 'right-1' : 'left-1'
                          }`}
                        ></div>
                      </div>
                    </div>
                    {twoFactorEnabled && (
                      <p className="text-sm text-green-600">2FA is currently enabled. You will receive codes via email.</p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
                    {showPasswordChange ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => setShowPasswordChange(false)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              alert('Password updated successfully!');
                              setShowPasswordChange(false);
                            }}
                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                          >
                            Update Password
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowPasswordChange(true)}
                        className="px-6 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition font-medium flex items-center space-x-2"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Change Password</span>
                      </button>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Chrome on Windows</p>
                          <p className="text-sm text-gray-600">Last active: Just now</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Current</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    {[
                      { label: 'Class Reminders', description: 'Get notified before your classes start' },
                      { label: 'Assignment Submissions', description: 'Be informed when assignments are due' },
                      { label: 'Attendance Updates', description: 'Notifications about attendance records' },
                      { label: 'Teacher Messages', description: 'Messages from instructors' },
                      { label: 'Platform Updates', description: 'News and updates about the platform' }
                    ].map((notif, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{notif.label}</p>
                          <p className="text-sm text-gray-600">{notif.description}</p>
                        </div>
                        <div className="w-12 h-7 rounded-full bg-green-600 transition relative cursor-pointer">
                          <div className="w-5 h-5 bg-white rounded-full transition absolute top-1 right-1"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                    Save Notification Preferences
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
