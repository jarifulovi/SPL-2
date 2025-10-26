"use client";

import { useState } from "react";
import { groups } from "@/utils/data/groups";
import GroupCard from "@/components/groups/GroupCard";
import NoGroupsSection from "@/components/groups/NoGroupsSection";
import SearchBar from "@/components/search/SearchBar";

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // TODO: Replace with actual data from API
  // const [groupList, setGroupList] = useState(groups);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search logic
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Discover Study Groups</h1>
        <p className="text-muted-foreground">Find and join groups that match your interests</p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
        </button>
      </div>

      {/* Filter Panel (Optional - can be expanded later) */}
      {showFilters && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex flex-wrap gap-4">
            <button className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-all hover:bg-blue-100">
              All Groups
            </button>
            <button className="rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100">
              Public Only
            </button>
            <button className="rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100">
              Private Only
            </button>
          </div>
        </div>
      )}

      {/* Groups Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {groups && groups.map((group) => (
          <GroupCard key={group.id} {...group} />
        ))}
      </div>

      {groups.length === 0 && (
        <NoGroupsSection />
      )}
    </div>
  );
}