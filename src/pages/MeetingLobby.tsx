import { useState } from 'react';
import { Shield, Video, Mic, MicOff, VideoOff, Settings, CheckCircle, Lock } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export default function MeetingLobby() {
  const { navigate } = useNavigation();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [waitingForApproval, setWaitingForApproval] = useState(true);

  const handleJoinMeeting = () => {
    setWaitingForApproval(false);
    setTimeout(() => {
      navigate('live-classroom');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Join Class</h1>
              </div>
              <p className="text-gray-600">Mathematics - Calculus</p>
              <p className="text-sm text-gray-500">Prof. Sarah Johnson</p>
            </div>

            <div className="bg-gray-900 rounded-xl aspect-video mb-6 relative overflow-hidden">
              {videoEnabled ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
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

            <div className="flex items-center justify-center space-x-4 mb-6">
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition ${
                  audioEnabled
                    ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {audioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>

              <button
                onClick={() => setVideoEnabled(!videoEnabled)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition ${
                  videoEnabled
                    ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {videoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </button>

              <button className="w-14 h-14 rounded-full bg-gray-200 text-gray-900 hover:bg-gray-300 flex items-center justify-center transition">
                <Settings className="w-6 h-6" />
              </button>
            </div>

            {waitingForApproval ? (
              <button
                onClick={handleJoinMeeting}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
              >
                Request to Join
              </button>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 px-6 py-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-green-900 font-medium">Approved! Joining class...</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-green-600" />
                Security & Privacy
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">End-to-End Encryption</p>
                    <p className="text-sm text-gray-600">Your video and audio are fully encrypted</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Secure Authentication</p>
                    <p className="text-sm text-gray-600">Two-factor authentication enabled</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Waiting Room Active</p>
                    <p className="text-sm text-gray-600">Teacher approval required to join</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Session Recording</p>
                    <p className="text-sm text-gray-600">Class will be recorded for review</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Class Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Course</span>
                  <span className="font-medium text-gray-900">Mathematics - Calculus</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Instructor</span>
                  <span className="font-medium text-gray-900">Prof. Sarah Johnson</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-gray-900">60 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Participants</span>
                  <span className="font-medium text-gray-900">32 students</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900 mb-1">Before You Join</p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Ensure you're in a quiet environment</li>
                    <li>• Check your camera and microphone</li>
                    <li>• Keep your student ID ready if asked</li>
                    <li>• Follow class guidelines and policies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
