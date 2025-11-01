"use client";

import { useState } from "react";
import { notifications as initialNotifications } from "@/utils/data/notifications";
import NotificationBar from "@/components/notification/NotificationBar";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const markAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map((n) =>
        n.notification_id === notificationId ? { ...n, is_read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, is_read: true })));
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.is_read)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-600">Stay updated with your group activities</p>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                filter === "unread"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">No notifications</h3>
              <p className="text-sm text-gray-600">You're all caught up!</p>
            </div>
          ) : (
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
              {filteredNotifications.map((notification) => (
                <NotificationBar
                  key={notification.notification_id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
