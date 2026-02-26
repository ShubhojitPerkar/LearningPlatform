import { useState } from 'react';
import {
  Shield,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Settings,
  CheckCircle,
  Lock
} from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export default function MeetingLobby() {
  const { navigate } = useNavigation();

  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [joining, setJoining] = useState(false);

  const handleJoinMeeting = () => {
    setJoining(true);

    // Demo approval delay
    setTimeout(() => {
      navigate('live-classroom');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT PANEL */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Join Class</h1>
              </div>
              <p className="text-gray-600">Mathematics – Calculus</p>
              <p className="text-sm text-gray-500">Prof. Sarah Johnson</p>
            </div>

            {/* VIDEO PREVIEW */}
            <div className="bg-gray-900 rounded-xl aspect-video mb-6 overflow-hidden">
              {videoEnabled ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video className="w-12 h-12" />
                    </div>
                    <p className="text-lg font-medium">Camera Preview</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="text-center text-white">
                    <VideoOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Camera is off</p>
                  </div>
                </div>
              )}
            </div>

            {/* CONTROLS */}
            <div className="flex justify-center space-x-4 mb-6">
              <button
                disabled={joining}
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition ${
                  audioEnabled
                    ? 'bg-gray-200 hover:bg-gray-300'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {audioEnabled ? <Mic /> : <MicOff />}
              </button>

              <button
                disabled={joining}
                onClick={() => setVideoEnabled(!videoEnabled)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition ${
                  videoEnabled
                    ? 'bg-gray-200 hover:bg-gray-300'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {videoEnabled ? <Video /> : <VideoOff />}
              </button>

              <button
                disabled={joining}
                className="w-14 h-14 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
              >
                <Settings />
              </button>
            </div>

            {/* JOIN BUTTON */}
            {!joining ? (
              <button
                onClick={handleJoinMeeting}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg"
              >
                Request to Join
              </button>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-6 py-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="text-green-600" />
                  <span className="font-medium text-green-900">
                    Approved! Joining class…
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6">

            {/* SECURITY */}
            <div className="bg-white rounded-2xl shadow-xl border p-8">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Lock className="mr-2 text-green-600" /> Security & Privacy
              </h2>

              {[
                'End-to-End Encryption',
                'Secure Authentication',
                'Waiting Room Enabled',
                'Session Recording'
              ].map(item => (
                <div key={item} className="flex items-start gap-3 mb-3">
                  <CheckCircle className="text-green-600 mt-1" />
                  <div>
                    <p className="font-medium">{item}</p>
                    <p className="text-sm text-gray-600">
                      Your session is protected
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CLASS INFO */}
            <div className="bg-white rounded-2xl shadow-xl border p-8">
              <h2 className="text-xl font-bold mb-4">Class Information</h2>
              {[
                ['Course', 'Mathematics – Calculus'],
                ['Instructor', 'Prof. Sarah Johnson'],
                ['Duration', '60 minutes'],
                ['Participants', '32 students']
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between mb-2">
                  <span className="text-gray-600">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>

            {/* TIPS */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex gap-3">
                <Shield className="text-blue-600 mt-1" />
                <ul className="text-sm text-blue-900 space-y-1">
                  <li>• Sit in a quiet environment</li>
                  <li>• Test camera and mic</li>
                  <li>• Follow classroom guidelines</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}