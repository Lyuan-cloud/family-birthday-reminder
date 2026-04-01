export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-600">🎂 Birthday Reminder</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Upcoming Birthdays</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <p className="font-semibold">Mom</p>
                <p className="text-gray-600">March 15 (in 5 days)</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Quote Wall</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <p className="italic">"Age is just a number"</p>
                <p className="text-sm text-gray-600 mt-2">- Anonymous</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
