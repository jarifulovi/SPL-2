import Link from "next/link";
import { groups } from "@/utils/data/groups";
import GroupCard from "@/components/groups/GroupCard";
import NoGroupsSection from "@/components/groups/NoGroupsSection";

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20 lg:pt-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section with Create Button */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900">My Groups</h1>
            <p className="mt-2 text-gray-600">
              Manage and interact with your study groups
            </p>
          </div>
          
          {/* Create Group Button */}
          <Link
            href="/groups/create"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-medium text-white shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Group
          </Link>
        </div>

        {groups.length === 0 ? (
          <NoGroupsSection />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <Link key={group.id} href={`/groups/${group.id}/chat`}>
                <GroupCard {...group} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}