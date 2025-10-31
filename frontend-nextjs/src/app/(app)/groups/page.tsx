import Link from "next/link";
import { groups } from "@/utils/data/groups";
import GroupCard from "@/components/groups/GroupCard";
import NoGroupsSection from "@/components/groups/NoGroupsSection";

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Groups</h1>
          <p className="mt-2 text-gray-600">
            Manage and interact with your study groups
          </p>
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