"use client";

import { useState } from "react";
import { folders, files } from "@/utils/data/files";
import FolderCard from "@/components/file/FolderCard";
import FileTableRow from "@/components/file/FileTableRow";

export default function FilesPage() {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [mimeTypeFilter, setMimeTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedFolder = folders.find((f) => f.folder_id === selectedFolderId);
  const folderFiles = files.filter((f) => f.folder_id === selectedFolderId);

  // Get unique mime type categories
  const getMimeTypeCategories = () => {
    const categories = new Set<string>();
    folderFiles.forEach((file) => {
      if (file.mime_type.startsWith("image/")) categories.add("image");
      else if (file.mime_type === "application/pdf") categories.add("pdf");
      else if (file.mime_type.includes("presentation")) categories.add("presentation");
      else if (file.mime_type.includes("word")) categories.add("document");
      else if (file.mime_type.startsWith("video/")) categories.add("video");
      else categories.add("other");
    });
    return Array.from(categories);
  };

  // Filter files based on selected mime type and search
  const filteredFiles = folderFiles.filter((file) => {
    // Search filter
    if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Mime type filter
    if (mimeTypeFilter === "all") return true;
    if (mimeTypeFilter === "image") return file.mime_type.startsWith("image/");
    if (mimeTypeFilter === "pdf") return file.mime_type === "application/pdf";
    if (mimeTypeFilter === "presentation") return file.mime_type.includes("presentation");
    if (mimeTypeFilter === "document") return file.mime_type.includes("word");
    if (mimeTypeFilter === "video") return file.mime_type.startsWith("video/");
    if (mimeTypeFilter === "other") {
      return (
        !file.mime_type.startsWith("image/") &&
        file.mime_type !== "application/pdf" &&
        !file.mime_type.includes("presentation") &&
        !file.mime_type.includes("word") &&
        !file.mime_type.startsWith("video/")
      );
    }
    return true;
  });

  // Folders View
  if (!selectedFolderId) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">File Repository</h1>
              <p className="text-sm text-gray-600">
                Organize and access your study materials
              </p>
            </div>

            {/* Create Folder Button */}
            <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-600/40 active:scale-95">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Folder
            </button>
          </div>

          {/* Folders Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {folders.map((folder) => (
              <FolderCard
                key={folder.folder_id}
                folder={folder}
                onOpen={setSelectedFolderId}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Files View (inside a folder)
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header with Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedFolderId(null)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedFolder?.name}</h1>
              <p className="text-sm text-gray-600">{folderFiles.length} files</p>
            </div>
          </div>

          {/* Upload Button */}
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-600/40 active:scale-95">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload File
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMimeTypeFilter("all")}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                mimeTypeFilter === "all"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {getMimeTypeCategories().map((category) => (
              <button
                key={category}
                onClick={() => setMimeTypeFilter(category)}
                className={`rounded-lg px-3 py-2 text-sm font-medium capitalize transition-all ${
                  mimeTypeFilter === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Files Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {filteredFiles.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">No files found</h3>
              <p className="text-sm text-gray-600">
                {searchQuery
                  ? "Try adjusting your search or filters"
                  : "Upload your first file to get started"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Uploaded By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((file) => (
                    <FileTableRow key={file.file_id} file={file} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
