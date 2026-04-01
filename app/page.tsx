import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">🎂 Birthday Reminder</h1>
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Login
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Never Miss a Birthday Again
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Keep track of family birthdays and share heartfelt wishes
          </p>
          <Link href="/signup" className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700">
            Get Started Free
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">Smart Reminders</h3>
            <p className="text-gray-600">Get notified before birthdays so you never forget</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">Quote Wall</h3>
            <p className="text-gray-600">Share and discover birthday wishes</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
            <p className="text-gray-600">Simple interface for the whole family</p>
          </div>
        </div>
      </main>
    </div>
  );
}
