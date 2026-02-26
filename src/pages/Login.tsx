import { useState } from 'react';
import { Shield, Lock, Mail, AlertCircle } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

interface DemoUser {
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  name: string;
}

const DEMO_USERS: DemoUser[] = [
  { email: 'student@securelearn.com', password: 'password123', role: 'student', name: 'John Doe' },
  { email: 'teacher@securelearn.com', password: 'password123', role: 'teacher', name: 'Sarah Johnson' },
  { email: 'parent@securelearn.com', password: 'password123', role: 'parent', name: 'Emma Wilson' },
  { email: 'admin@securelearn.com', password: 'password123', role: 'admin', name: 'Admin User' }
];

export default function Login() {
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpDemo, setShowOtpDemo] = useState(false);
  const [userRole, setUserRole] = useState<DemoUser['role'] | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const user = DEMO_USERS.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      setError('Invalid credentials. Try student@securelearn.com / password123');
      setLoading(false);
      return;
    }

    setUserRole(user.role);
    setShowOtpDemo(true);
    setLoading(false);
  };

  const handleOtpComplete = () => {
    if (!userRole) return;

    switch (userRole) {
      case 'student':
        navigate('student-dashboard');
        break;
      case 'teacher':
        navigate('teacher-dashboard');
        break;
      case 'parent':
        navigate('parent-dashboard');
        break;
      case 'admin':
        navigate('admin-dashboard');
        break;
      default:
        navigate('dashboard');
    }
  };

  const quickLogin = (user: DemoUser) => {
    setEmail(user.email);
    setPassword(user.password);
    setUserRole(user.role);
    setShowOtpDemo(true);
  };

  /* ================= OTP SCREEN ================= */

  if (showOtpDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border">
          <div className="flex justify-center mb-6">
            <Lock className="w-10 h-10 text-blue-600" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">
            Two-Factor Authentication
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Demo OTP – enter any 6 digits
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                maxLength={1}
                className="w-12 h-14 border text-center text-xl rounded-lg"
              />
            ))}
          </div>

          <button
            onClick={handleOtpComplete}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Verify & Continue
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            This is a demo OTP flow for presentation purposes
          </div>
        </div>
      </div>
    );
  }

  /* ================= LOGIN SCREEN ================= */

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Shield className="w-14 h-14 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Welcome to SecureLearn</h1>
          <p className="text-gray-600">Secure role-based login</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-11 py-3 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-11 py-3 border rounded-lg"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 p-3 rounded-lg flex gap-2 text-sm text-red-700">
                <AlertCircle className="w-5 h-5" /> {error}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 space-y-2">
            <p className="text-sm text-center font-medium">Quick Demo Login</p>
            {DEMO_USERS.map(user => (
              <button
                key={user.email}
                onClick={() => quickLogin(user)}
                className="w-full border rounded-lg py-2 text-sm hover:bg-blue-50"
              >
                {user.role.toUpperCase()} – {user.email}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('landing')}
            className="text-blue-600 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}