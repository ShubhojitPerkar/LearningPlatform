import Layout from '../components/Layout';
import { Search, MessageCircle, Book, Video, Shield, HelpCircle } from 'lucide-react';

export default function Help() {
  const faqs = [
    {
      category: 'Getting Started',
      icon: Book,
      questions: [
        {
          q: 'How do I join my first class?',
          a: 'Click on the meeting link provided by your teacher or navigate to your dashboard and click "Join" on any scheduled class.'
        },
        {
          q: 'What are the system requirements?',
          a: 'A modern web browser (Chrome, Firefox, Safari, or Edge), stable internet connection, and a webcam/microphone for video classes.'
        }
      ]
    },
    {
      category: 'Video & Audio',
      icon: Video,
      questions: [
        {
          q: 'How do I test my camera and microphone?',
          a: 'Before joining a class, you can test your devices in the lobby. You can also access settings from the control panel.'
        },
        {
          q: 'What if my video is not working?',
          a: 'Check your browser permissions, ensure no other app is using your camera, and try refreshing the page.'
        }
      ]
    },
    {
      category: 'Security & Privacy',
      icon: Shield,
      questions: [
        {
          q: 'Is my class session encrypted?',
          a: 'Yes, all sessions use end-to-end encryption to ensure your privacy and security.'
        },
        {
          q: 'Who can access my recorded classes?',
          a: 'Only enrolled students and the teacher can access recorded sessions. Recordings are stored securely.'
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How can we help you?
          </h1>
          <p className="text-gray-600 mb-8">
            Search our knowledge base or browse categories below
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                aria-label="Search help articles"
                placeholder="Search for help..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <HelpCard
            icon={Book}
            title="User Guides"
            description="Step-by-step tutorials for getting started"
            action="Browse Guides →"
          />
          <HelpCard
            icon={Video}
            title="Video Tutorials"
            description="Watch detailed walkthrough videos"
            action="Watch Videos →"
          />
          <HelpCard
            icon={MessageCircle}
            title="Contact Support"
            description="Get help from our support team"
            action="Start Chat →"
          />
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="border-b px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="p-6">
            {faqs.map((category, index) => (
              <div key={index} className="mb-8 last:mb-0">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {category.category}
                  </h3>
                </div>

                <div className="space-y-4 ml-12">
                  {category.questions.map((item, qIndex) => (
                    <details key={qIndex} className="group">
                      <summary className="flex justify-between cursor-pointer p-4 border rounded-lg hover:bg-gray-50">
                        <span className="font-medium text-gray-900 flex">
                          <HelpCircle className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
                          {item.q}
                        </span>
                        <svg
                          className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                        <p className="text-gray-700">{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="mb-6 text-blue-100">
            Our support team is available 24/7 to assist you.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold">
              Contact Support
            </button>
            <button className="px-6 py-3 bg-blue-700 rounded-lg font-semibold border border-blue-500">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* =====================
   SMALL UI COMPONENT
====================== */

function HelpCard({ icon: Icon, title, description, action }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="text-blue-600 font-medium text-sm">
        {action}
      </button>
    </div>
  );
}