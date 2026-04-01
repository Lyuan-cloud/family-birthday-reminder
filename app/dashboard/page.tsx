'use client';

import { useEffect, useState } from 'react';

interface Birthday {
  id: string;
  name: string;
  date: string;
  relationship: string;
}

interface Quote {
  id: string;
  content: string;
  author: string;
  likes: number;
}

export default function Dashboard() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [newQuote, setNewQuote] = useState({ content: '', author: '' });

  useEffect(() => {
    fetchBirthdays();
    fetchQuotes();
  }, []);

  const fetchBirthdays = async () => {
    const res = await fetch('/api/birthdays?userId=demo-user');
    const data = await res.json();
    setBirthdays(data);
  };

  const fetchQuotes = async () => {
    const res = await fetch('/api/quotes');
    const data = await res.json();
    setQuotes(data);
  };

  const handleAddQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newQuote, userId: 'demo-user' })
    });
    setNewQuote({ content: '', author: '' });
    fetchQuotes();
  };

  const handleLike = async (id: string) => {
    await fetch(`/api/quotes/${id}/like`, { method: 'POST' });
    fetchQuotes();
  };

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
              {birthdays.length === 0 ? (
                <p className="text-gray-500">No upcoming birthdays</p>
              ) : (
                birthdays.map(b => (
                  <div key={b.id} className="p-4 border rounded-lg">
                    <p className="font-semibold">{b.name}</p>
                    <p className="text-gray-600">{b.date} - {b.relationship}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Quote Wall</h2>
            <form onSubmit={handleAddQuote} className="mb-4 space-y-2">
              <input
                type="text"
                placeholder="Quote"
                value={newQuote.content}
                onChange={(e) => setNewQuote({...newQuote, content: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={newQuote.author}
                onChange={(e) => setNewQuote({...newQuote, author: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Add Quote
              </button>
            </form>
            <div className="space-y-4">
              {quotes.map(q => (
                <div key={q.id} className="p-4 border rounded-lg">
                  <p className="italic">"{q.content}"</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-600">- {q.author}</p>
                    <button onClick={() => handleLike(q.id)} className="text-blue-600">
                      ❤️ {q.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
