"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getInitials } from "@/utils/formatter";

interface GroupsBarProps {
  groups: Array<{
    id: string;
    name: string;
    image: string | null;
    role: "admin" | "member";
    lastMessage?: string;
    unreadCount?: number;
  }>;
  currentGroupId: string;
}

export default function GroupsBar({
  groups,
  currentGroupId,
}: GroupsBarProps) {
  const pathname = usePathname();

  return (
    <div className="flex w-80 flex-col border-r border-gray-200 bg-white">
      {/* Header - positioned to avoid sidebar toggle button */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 mt-[72px]">
        <h2 className="text-xl font-bold text-white">My Groups</h2>
        <p className="text-sm text-blue-100">Select a group to chat</p>
      </div>

      {/* Group List - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {groups.map((group) => (
          <Link
            key={group.id}
            href={`/groups/${group.id}/chat`}
            className={`group relative flex w-full items-center gap-3 border-b border-gray-100 px-6 py-4 text-left transition-all duration-200 hover:bg-blue-50 ${
              currentGroupId === group.id
                ? "bg-blue-50 border-l-4 border-l-blue-600"
                : "border-l-4 border-l-transparent"
            }`}
          >
            {/* Group Image/Avatar */}
            <div className="relative flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm shadow-md">
                {group.image ? (
                  <img
                    src={group.image}
                    alt={group.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(group.name)
                )}
              </div>
              {/* Unread Badge */}
              {group.unreadCount && group.unreadCount > 0 && (
                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md">
                  {group.unreadCount}
                </div>
              )}
            </div>

            {/* Group Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {group.name}
                </h3>
                {/* Role Badge */}
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                    group.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {group.role}
                </span>
              </div>
              {group.lastMessage && (
                <p className="text-xs text-gray-500 truncate">{group.lastMessage}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
