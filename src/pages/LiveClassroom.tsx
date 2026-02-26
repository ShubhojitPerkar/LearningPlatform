import { useState } from 'react';
import {
  Mic, MicOff, Video, VideoOff, Monitor, MonitorOff,
  MessageSquare, Users, Hand, MoreVertical, Settings,
  PhoneOff, Shield, Maximize2
} from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export default function LiveClassroom() {
  const { navigate } = useNavigation();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [handRaised, setHandRaised] = useState(false);

  const participants = [
    { id: '1', name: 'Prof. Sarah Johnson', role: 'teacher', speaking: true },
    { id: '2', name: 'John Doe', role: 'student', speaking: false },
    { id: '3', name: 'Jane Smith', role: 'student', speaking: false },
    { id: '4', name: 'Mike Wilson', role: 'student', speaking: false },
    { id: '5', name: 'Emma Davis', role: 'student', speaking: false },
    { id: '6', name: 'Alex Chen', role: 'student', speaking: false }
  ];

  const messages = [
    { id: '1', user: 'Prof. Sarah Johnson', message: 'Welcome everyone!', time: '2:00 PM' },
    { id: '2', user: 'John Doe', message: 'Thank you professor', time: '2:01 PM' },
    { id: '3', user: 'Jane Smith', message: 'Can you share the slides?', time: '2:02 PM' }
  ];

  const handleLeaveClass = () => {
    if (confirm('Are you sure you want to leave the class?')) {
      navigate('student-dashboard');
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="w-6 h-6 text-blue-400" />
            <div>
              <h1 className="text-white font-semibold">Mathematics - Calculus</h1>
              <div className="flex items-center space-x-3 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400">Encrypted Session</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">32 participants</span>
                <span className="text-gray-400">•</span>
                <span className="text-red-400 flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                  Recording
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition text-sm font-medium">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
              <div className="col-span-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl aspect-video relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-12 h-12" />
                    </div>
                    <p className="text-xl font-semibold">Prof. Sarah Johnson</p>
                    <p className="text-sm opacity-80">Teacher</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-red-500 bg-opacity-90 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-xs font-medium">Speaking</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Prof. Sarah Johnson</span>
                    <div className="flex items-center space-x-2">
                      <Mic className="w-5 h-5 text-white" />
                      <Video className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {participants.slice(1, 7).map((participant, index) => (
                <div
                  key={participant.id}
                  className="bg-gray-800 rounded-xl aspect-video relative"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-bold">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{participant.name}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs font-medium truncate">
                        {participant.name}
                      </span>
                      <MicOff className="w-4 h-4 text-red-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                  audioEnabled
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
                title={audioEnabled ? 'Mute' : 'Unmute'}
              >
                {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setVideoEnabled(!videoEnabled)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                  videoEnabled
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
                title={videoEnabled ? 'Stop Video' : 'Start Video'}
              >
                {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setScreenSharing(!screenSharing)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                  screenSharing
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                title={screenSharing ? 'Stop Sharing' : 'Share Screen'}
              >
                {screenSharing ? <MonitorOff className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setHandRaised(!handRaised)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                  handRaised
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                title={handRaised ? 'Lower Hand' : 'Raise Hand'}
              >
                <Hand className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className="w-12 h-12 rounded-full bg-gray-700 text-white hover:bg-gray-600 flex items-center justify-center transition"
                title="Toggle Chat"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowParticipants(!showParticipants)}
                className="w-12 h-12 rounded-full bg-gray-700 text-white hover:bg-gray-600 flex items-center justify-center transition"
                title="Participants"
              >
                <Users className="w-5 h-5" />
              </button>

              <button
                className="w-12 h-12 rounded-full bg-gray-700 text-white hover:bg-gray-600 flex items-center justify-center transition"
                title="More Options"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              <div className="w-px h-8 bg-gray-700 mx-2"></div>

              <button
                onClick={handleLeaveClass}
                className="px-6 h-12 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center space-x-2 transition font-medium"
              >
                <PhoneOff className="w-5 h-5" />
                <span>Leave</span>
              </button>
            </div>
          </div>
        </div>

        {showChat && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="px-4 py-3 border-b border-gray-700">
              <h2 className="text-white font-semibold">Class Chat</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div className="flex items-baseline space-x-2 mb-1">
                    <span className="text-sm font-medium text-blue-400">{msg.user}</span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-300">{msg.message}</p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function User({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}
