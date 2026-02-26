import { Shield, Video, Lock, Users, Monitor, BookOpen } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export default function Landing() {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SecureLearn</span>
            </div>
            <button
              onClick={() => navigate('login')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Secure Online Learning Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Enterprise-grade video conferencing for educational institutions with role-based access,
            end-to-end encryption, and comprehensive monitoring tools.
          </p>
          <button
            onClick={() => navigate('login')}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">End-to-End Encryption</h3>
            <p className="text-gray-600">
              Military-grade encryption ensures all video calls and data remain secure and private.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Role-Based Access</h3>
            <p className="text-gray-600">
              Separate dashboards for Students, Teachers, Parents, and Administrators with granular permissions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">HD Video Classes</h3>
            <p className="text-gray-600">
              Crystal-clear video and audio quality for seamless online learning experiences.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Designed for Every Role
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Students</h3>
              <p className="text-sm text-gray-600">
                Join classes, view recordings, submit assignments
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Teachers</h3>
              <p className="text-sm text-gray-600">
                Create classes, manage students, share materials
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Parents</h3>
              <p className="text-sm text-gray-600">
                Monitor attendance, view progress, get updates
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Admins</h3>
              <p className="text-sm text-gray-600">
                Manage users, monitor security, control access
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Trusted by educational institutions worldwide</p>
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-700 font-medium">SOC 2 Certified</span>
            <span className="text-gray-400">•</span>
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-700 font-medium">GDPR Compliant</span>
            <span className="text-gray-400">•</span>
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-700 font-medium">FERPA Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}
