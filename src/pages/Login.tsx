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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpDemo, setShowOtpDemo] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'parent' | 'admin' | null>(null);
  const { navigate } = useNavigation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const user = DEMO_USERS.find(u => u.email === email && u.password === password);

    if (user) {
      setUserRole(user.role);
      setShowOtpDemo(true);
    } else {
      setError('Invalid email or password. Try: student@securelearn.com / password123');
    }

    setLoading(false);
  };

  const handleOtpComplete = () => {
    navigate('dashboard');
  };

  const quickLogin = (user: DemoUser) => {
    setEmail(user.email);
    setPassword(user.password);
    setUserRole(user.role);
    setShowOtpDemo(true);
  };

  if (showOtpDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Two-Factor Authentication
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Enter the 6-digit code sent to {email}
            </p>

            <div className="flex justify-center space-x-3 mb-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="0"
                />
              ))}
            </div>

            <button
              onClick={handleOtpComplete}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold mb-4"
            >
              Verify & Continue
            </button>

            <button className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium">
              Resend Code
            </button>

            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-2">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900">Secure Login</p>
                  <p className="text-xs text-green-700 mt-1">
                    This additional security step protects your account from unauthorized access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to SecureLearn</h1>
          <p className="text-gray-600">Sign in to access your secure learning environment</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200 flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium text-gray-700 text-center mb-3">Quick Login Options</p>
            {DEMO_USERS.map((user) => (
              <button
                key={user.email}
                onClick={() => quickLogin(user)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left text-sm font-medium text-gray-900"
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}: {user.email}
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Demo Credentials</p>
                <p className="text-xs text-blue-700 mt-1">
                  All demo accounts use password: <strong>password123</strong><br />
                  Click buttons above for quick login
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('landing')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
