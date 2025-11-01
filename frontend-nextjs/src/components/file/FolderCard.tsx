import { Folder } from "@/utils/data/files";

interface FolderCardProps {
  folder: Folder;
  onOpen: (folderId: string) => void;
}

export default function FolderCard({ folder, onOpen }: FolderCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700";
      case "purple":
        return "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700";
      case "green":
        return "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700";
      case "orange":
        return "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700";
      case "red":
        return "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700";
      default:
        return "from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      onClick={() => onOpen(folder.folder_id)}
      className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      {/* Folder Icon with Color */}
      <div className="mb-4 flex items-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${getColorClasses(
            folder.color
          )} shadow-lg transition-all group-hover:scale-105`}
        >
          <svg
            className="h-7 w-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
        </div>

        {/* File Count Badge */}
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-gray-900">{folder.file_count}</span>
          <span className="text-xs text-gray-500">files</span>
        </div>
      </div>

      {/* Folder Info */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
        {folder.name}
      </h3>
      {folder.description && (
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
          {folder.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="text-xs text-gray-500">
          Created {formatDate(folder.created_at)}
        </span>
        <svg
          className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}
