import db from './db';

export function getUpcomingBirthdays(userId: string, days: number = 30) {
  const today = new Date();
  const birthdays = db.prepare('SELECT * FROM birthdays WHERE user_id = ?').all(userId) as any[];
  
  return birthdays.filter(birthday => {
    const [month, day] = birthday.date.split('-').map(Number);
    const thisYear = today.getFullYear();
    const birthdayDate = new Date(thisYear, month - 1, day);
    
    if (birthdayDate < today) {
      birthdayDate.setFullYear(thisYear + 1);
    }
    
    const daysUntil = Math.ceil((birthdayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil >= 0 && daysUntil <= days;
  }).sort((a, b) => {
    const [aMonth, aDay] = a.date.split('-').map(Number);
    const [bMonth, bDay] = b.date.split('-').map(Number);
    return aMonth === bMonth ? aDay - bDay : aMonth - bMonth;
  });
}
