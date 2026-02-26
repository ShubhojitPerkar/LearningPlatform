import { useState } from 'react';
import Layout from '../components/Layout';
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Shield,
  LogOut,
  Save
} from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

type Tab = 'personal' | 'security' | 'notifications';

export default function Profile() {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<Tab>('personal');

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
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('landing');
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your account preferences and security settings
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">

              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{formData.fullName}</h3>
                <p className="text-sm text-gray-600 capitalize">{formData.role}</p>
                <p className="text-xs text-gray-500 mt-2">{formData.email}</p>
              </div>

              <div className="space-y-2 border-t pt-4">
                <SidebarButton
                  active={activeTab === 'personal'}
                  onClick={() => setActiveTab('personal')}
                  icon={<User className="w-4 h-4 mr-2" />}
                  label="Personal Info"
                />
                <SidebarButton
                  active={activeTab === 'security'}
                  onClick={() => setActiveTab('security')}
                  icon={<Shield className="w-4 h-4 mr-2" />}
                  label="Security"
                />
                <SidebarButton
                  active={activeTab === 'notifications'}
                  onClick={() => setActiveTab('notifications')}
                  icon={<Bell className="w-4 h-4 mr-2" />}
                  label="Notifications"
                />
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

          {/* CONTENT */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

              {/* PERSONAL */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    icon={<Mail className="w-4 h-4 mr-2" />}
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    icon={<Phone className="w-4 h-4 mr-2" />}
                  />
                  <DisabledInput label="Role" value={formData.role} />
                  <DisabledInput label="Member Since" value={formData.joinDate} />

                  <button
                    onClick={handleSave}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}

              {/* SECURITY */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
                    <Shield className="text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-blue-900">
                        Security Status
                      </p>
                      <p className="text-sm text-blue-700">
                        Two-factor authentication is enabled
                      </p>
                    </div>
                  </div>

                  <Toggle
                    label="Two-Factor Authentication"
                    enabled={twoFactorEnabled}
                    onToggle={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  />

                  <div>
                    <h3 className="font-semibold mb-3">Change Password</h3>
                    {!showPasswordChange ? (
                      <button
                        onClick={() => setShowPasswordChange(true)}
                        className="px-6 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 flex items-center space-x-2"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Change Password</span>
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <input className="input" type="password" placeholder="Current password" />
                        <input className="input" type="password" placeholder="New password" />
                        <input className="input" type="password" placeholder="Confirm password" />
                        <div className="flex gap-3">
                          <button
                            onClick={() => setShowPasswordChange(false)}
                            className="flex-1 border py-3 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              alert('Password updated successfully!');
                              setShowPasswordChange(false);
                            }}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS */}
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  {[
                    'Class Reminders',
                    'Assignment Submissions',
                    'Attendance Updates',
                    'Teacher Messages',
                    'Platform Updates'
                  ].map(item => (
                    <Toggle key={item} label={item} enabled />
                  ))}
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
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

/* ---------- Helper Components ---------- */

function SidebarButton({
  active,
  onClick,
  icon,
  label
}: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${
        active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Input({ label, icon, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {icon} {label}
      </label>
      <input {...props} className="input" />
    </div>
  );
}

function DisabledInput({ label, value }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        value={value}
        disabled
        className="w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-600"
      />
    </div>
  );
}

function Toggle({ label, enabled = true, onToggle }: any) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <span className="font-medium">{label}</span>
      <div
        onClick={onToggle}
        className={`w-12 h-7 rounded-full cursor-pointer relative ${
          enabled ? 'bg-green-600' : 'bg-gray-300'
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full absolute top-1 transition ${
            enabled ? 'right-1' : 'left-1'
          }`}
        />
      </div>
    </div>
  );
}