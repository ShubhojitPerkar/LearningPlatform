import { Shield, Video, Lock, Users, Monitor, BookOpen } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export default function Landing() {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SecureLearn</span>
            </div>
            <button
              aria-label="Sign in to SecureLearn"
              onClick={() => navigate('login')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Secure Online Learning Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Enterprise-grade video conferencing for educational institutions with role-based access,
            end-to-end encryption, and comprehensive monitoring tools.
          </p>
          <button
            aria-label="Get started with SecureLearn"
            onClick={() => navigate('login')}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Feature
            icon={Lock}
            title="End-to-End Encryption"
            description="Military-grade encryption ensures all video calls and data remain secure and private."
          />
          <Feature
            icon={Users}
            title="Role-Based Access"
            description="Separate dashboards for Students, Teachers, Parents, and Administrators with granular permissions."
          />
          <Feature
            icon={Video}
            title="HD Video Classes"
            description="Crystal-clear video and audio quality for seamless online learning experiences."
          />
        </div>

        {/* Roles */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Designed for Every Role
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Role icon={BookOpen} title="Students" text="Join classes, view recordings, submit assignments" />
            <Role icon={Monitor} title="Teachers" text="Create classes, manage students, share materials" />
            <Role icon={Users} title="Parents" text="Monitor attendance, view progress, get updates" />
            <Role icon={Shield} title="Admins" text="Manage users, monitor security, control access" />
          </div>
        </div>

        {/* Trust */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Trusted by educational institutions worldwide</p>
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">SOC 2 Certified</span>
            <span className="text-gray-400">•</span>
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">GDPR Compliant</span>
            <span className="text-gray-400">•</span>
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">FERPA Compliant</span>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =====================
   SMALL UI COMPONENTS
====================== */

function Feature({ icon: Icon, title, description }: any) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Role({ icon: Icon, title, text }: any) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}