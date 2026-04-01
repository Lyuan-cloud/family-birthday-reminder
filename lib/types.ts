export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Birthday {
  id: string;
  userId: string;
  name: string;
  date: string; // MM-DD format
  year?: number;
  relationship: string;
  reminderDays: number;
  createdAt: Date;
}

export interface Quote {
  id: string;
  userId: string;
  content: string;
  author: string;
  likes: number;
  createdAt: Date;
}
