interface ChatPanelProps {
  selectedGroup: {
    id: string;
    name: string;
    image: string | null;
    role: "admin" | "member";
    lastMessage?: string;
    unreadCount?: number;
  } | null;
}

export default function ChatPanel({ selectedGroup }: ChatPanelProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!selectedGroup) {
    return (
      <div className="flex flex-1 flex-col bg-gray-50">
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Select a Group</h3>
            <p className="text-sm text-gray-600">Choose a group from the left to start chatting</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm shadow-md">
            {selectedGroup.image ? (
              <img
                src={selectedGroup.image}
                alt={selectedGroup.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              getInitials(selectedGroup.name)
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedGroup.name}
            </h3>
            <p className="text-xs text-gray-500">
              You are {selectedGroup.role === "admin" ? "an admin" : "a member"}
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages Area - Empty for now */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">No messages yet</h3>
          <p className="text-sm text-gray-600">Start a conversation with your group members</p>
        </div>
      </div>

      {/* Message Input Area */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
          />
          <button className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 font-medium text-white shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105 active:scale-95">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
