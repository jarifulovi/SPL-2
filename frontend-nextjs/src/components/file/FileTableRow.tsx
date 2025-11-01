import { File } from "@/utils/data/files";

interface FileTableRowProps {
  file: File;
}

export default function FileTableRow({ file }: FileTableRowProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) {
      return (
        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else if (mimeType === "application/pdf") {
      return (
        <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    } else if (
      mimeType.includes("presentation") ||
      mimeType.includes("powerpoint")
    ) {
      return (
        <svg className="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    } else if (
      mimeType.includes("word") ||
      mimeType.includes("document")
    ) {
      return (
        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else if (mimeType.startsWith("video/")) {
      return (
        <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    } else if (mimeType.includes("zip") || mimeType.includes("compressed")) {
      return (
        <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
        </svg>
      );
    } else {
      return (
        <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
  };

  const getFileTypeLabel = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return "Image";
    if (mimeType === "application/pdf") return "PDF";
    if (mimeType.includes("presentation")) return "Presentation";
    if (mimeType.includes("word")) return "Document";
    if (mimeType.startsWith("video/")) return "Video";
    if (mimeType.includes("zip")) return "Archive";
    if (mimeType.includes("html")) return "HTML";
    if (mimeType.includes("sql")) return "SQL";
    if (mimeType.includes("ipynb")) return "Notebook";
    return "File";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <tr className="group border-b border-gray-100 transition-colors hover:bg-blue-50/30">
      {/* File Name & Icon */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">{getFileIcon(file.mime_type)}</div>
          <div className="min-w-0 flex-1">
            <button
              onClick={() => window.open(file.url, "_blank")}
              className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors text-left truncate block max-w-xs"
            >
              {file.name}
            </button>
          </div>
        </div>
      </td>

      {/* Type */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
          {getFileTypeLabel(file.mime_type)}
        </span>
      </td>

      {/* Size */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {formatFileSize(file.size)}
      </td>

      {/* Uploaded By */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-semibold text-white">
            {file.uploaded_by.image ? (
              <img
                src={file.uploaded_by.image}
                alt={file.uploaded_by.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              getInitials(file.uploaded_by.name)
            )}
          </div>
          <span className="text-sm text-gray-700">{file.uploaded_by.name}</span>
        </div>
      </td>

      {/* Uploaded Date */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {getTimeAgo(file.uploaded_at)}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <button
          onClick={() => window.open(file.url, "_blank")}
          className="text-gray-400 hover:text-blue-600 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </td>
    </tr>
  );
}
