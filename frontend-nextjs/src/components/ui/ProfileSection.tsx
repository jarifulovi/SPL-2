


export default function ProfileSection({  user, }: {  user: { name: string; email: string; avatar: string | null; }; }) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  
  return (
    <div className="flex items-center gap-3">
      {/* Profile Avatar */}
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 ring-2 ring-blue-100">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
        ) : (
          getInitials(user.name)
        )}
      </div>
      {/* Profile Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 truncate">{user.name}</h3>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>
    </div>
  );
}