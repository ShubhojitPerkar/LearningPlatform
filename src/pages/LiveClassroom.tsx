import { useState } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  MessageSquare,
  Users,
  Hand,
  MoreVertical,
  Settings,
  PhoneOff,
  Shield
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
    { id: '2', name: 'John Doe', role: 'student' },
    { id: '3', name: 'Jane Smith', role: 'student' },
    { id: '4', name: 'Mike Wilson', role: 'student' },
    { id: '5', name: 'Emma Davis', role: 'student' },
    { id: '6', name: 'Alex Chen', role: 'student' }
  ];

  const messages = [
    { id: '1', user: 'Prof. Sarah Johnson', message: 'Welcome everyone!', time: '2:00 PM' },
    { id: '2', user: 'John Doe', message: 'Thank you professor', time: '2:01 PM' },
    { id: '3', user: 'Jane Smith', message: 'Can you share the slides?', time: '2:02 PM' }
  ];

  const handleLeaveClass = () => {
    navigate('student-dashboard');
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Shield className="w-6 h-6 text-blue-400" />
            <div>
              <h1 className="text-white font-semibold">Mathematics - Calculus</h1>
              <p className="text-sm text-gray-400">
                Encrypted • 32 participants • Recording
              </p>
            </div>
          </div>

          <button
            aria-label="Class settings"
            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            <Settings className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
            {/* Teacher */}
            <div className="col-span-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl aspect-video relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <UserAvatar className="w-12 h-12 mb-2" />
                <p className="font-semibold">Prof. Sarah Johnson</p>
                <span className="text-sm opacity-80">Teacher</span>
              </div>
            </div>

            {/* Students */}
            {participants.slice(1).map((p) => (
              <div key={p.id} className="bg-gray-800 rounded-xl aspect-video flex flex-col items-center justify-center text-white">
                <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                  {p.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </div>
                <span className="text-sm">{p.name}</span>
                <MicOff className="w-4 h-4 text-red-400 mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        {showChat && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700 text-white font-semibold">
              Class Chat
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map(msg => (
                <div key={msg.id}>
                  <p className="text-sm text-blue-400">{msg.user}</p>
                  <p className="text-sm text-gray-300">{msg.message}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-700 flex gap-2">
              <input
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-gray-700 rounded-lg text-white outline-none"
              />
              <button className="px-4 bg-blue-600 rounded-lg text-white">
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4 flex justify-center gap-3">
        <ControlButton
          active={audioEnabled}
          onClick={() => setAudioEnabled(!audioEnabled)}
          iconOn={<Mic />}
          iconOff={<MicOff />}
        />
        <ControlButton
          active={videoEnabled}
          onClick={() => setVideoEnabled(!videoEnabled)}
          iconOn={<Video />}
          iconOff={<VideoOff />}
        />
        <ControlButton
          active={screenSharing}
          onClick={() => setScreenSharing(!screenSharing)}
          iconOn={<Monitor />}
          iconOff={<MonitorOff />}
        />
        <ControlButton
          active={handRaised}
          onClick={() => setHandRaised(!handRaised)}
          iconOn={<Hand />}
        />
        <button
          onClick={() => setShowChat(!showChat)}
          className="w-12 h-12 rounded-full bg-gray-700 text-white"
        >
          <MessageSquare />
        </button>
        <button
          onClick={handleLeaveClass}
          className="px-6 h-12 rounded-full bg-red-600 text-white flex items-center gap-2"
        >
          <PhoneOff /> Leave
        </button>
      </div>
    </div>
  );
}

/* =====================
   SMALL COMPONENTS
====================== */

function ControlButton({ active, onClick, iconOn, iconOff }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 rounded-full flex items-center justify-center ${
        active ? 'bg-gray-700' : 'bg-red-600'
      } text-white`}
    >
      {active ? iconOn : iconOff ?? iconOn}
    </button>
  );
}

function UserAvatar({ className }: { className?: string }) {
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