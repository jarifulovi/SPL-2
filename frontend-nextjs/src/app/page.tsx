import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              SS
            </div>
            <span className="text-xl font-bold text-foreground">Study Sync</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="px-5 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:text-blue-600"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="rounded-lg bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold leading-tight text-foreground md:text-6xl">
            Collaborate, Learn, and{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Succeed Together
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            The ultimate study platform for students. Share resources, chat in real-time,
            and organize group study sessions all in one place.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/auth/register"
              className="relative overflow-hidden rounded-lg bg-blue-600 px-8 py-3 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-blue-600 hover:shadow-blue-600 hover:before:border-[25px]"
            >
              <span className="relative z-10">Start Your Journey</span>
            </Link>
            <Link
              href="#features"
              className="relative overflow-hidden rounded-lg border border-blue-600 bg-blue-600 px-8 py-3 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-blue-600 hover:shadow-blue-600 hover:before:border-[25px]"
            >
              <span className="relative z-10">Explore Features</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Everything You Need to Excel
          </h2>
          <p className="mt-3 text-muted-foreground">
            Powerful tools designed for modern student collaboration
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-white/20 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground transition-colors group-hover:text-white">Group Collaboration</h3>
              <p className="text-sm text-muted-foreground transition-colors group-hover:text-blue-50">
                Create study groups, invite classmates, and collaborate on projects seamlessly.
                Manage members and permissions with ease.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-white/20 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground transition-colors group-hover:text-white">Real-Time Chat</h3>
              <p className="text-sm text-muted-foreground transition-colors group-hover:text-blue-50">
                Instant messaging powered by WebSocket technology. Stay connected with your study
                group with lightning-fast communication.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-white/20 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground transition-colors group-hover:text-white">Cloud File Storage</h3>
              <p className="text-sm text-muted-foreground transition-colors group-hover:text-blue-50">
                Upload and share study materials securely with AWS cloud storage. Access your files
                anytime, anywhere.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-white/20 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground transition-colors group-hover:text-white">Smart Search</h3>
              <p className="text-sm text-muted-foreground transition-colors group-hover:text-blue-50">
                Find groups, files, and discussions instantly. Advanced search helps you discover
                the resources you need quickly.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-white/20 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground transition-colors group-hover:text-white">Smart Notifications</h3>
              <p className="text-sm text-muted-foreground transition-colors group-hover:text-blue-50">
                Never miss important updates. Get notified about new messages, file uploads,
                and group activities in real-time.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-white/20 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground transition-colors group-hover:text-white">Personal Profiles</h3>
              <p className="text-sm text-muted-foreground transition-colors group-hover:text-blue-50">
                Customize your profile, showcase your academic interests, and connect with
                like-minded students in your field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-12 text-center shadow-xl shadow-blue-500/10">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Ready to Transform Your Study Experience?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of students already collaborating on Study Sync
            </p>
            <Link
              href="/auth/registration"
              className="mt-8 inline-block rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3 font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/80">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                SS
              </div>
              <span className="font-semibold text-foreground">Study Sync</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Study Sync. Built for students, by students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
