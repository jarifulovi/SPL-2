"use client";

import { useState } from "react";
import { groupsBar } from "@/utils/data/groups";
import GroupsBar from "@/components/chat/GroupsBar";
import ChatPanel from "@/components/chat/ChatPanel";

export default function GroupsPage() {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(
    groupsBar[0]?.id || null
  );

  const selectedGroup = groupsBar.find((g) => g.id === selectedGroupId);

  return (
    <div className="fixed inset-0 flex">
      {/* Left Section - Groups Bar */}
      <GroupsBar
        groups={groupsBar}
        selectedGroupId={selectedGroupId}
        onSelectGroup={setSelectedGroupId}
      />

      {/* Right Section - Chat Panel */}
      <ChatPanel selectedGroup={selectedGroup || null} />
    </div>
  );
}