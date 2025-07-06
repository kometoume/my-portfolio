// src/app/calendar/page.tsx

import Calendar from '../../components/Calendar'; // Calendarコンポーネントをインポートします

export default function CalendarPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      {/* text-center クラスを追加 */}
      <h1 className="text-4xl font-extrabold text-gray-700 mb-3 text-center">筋トレカレンダーアプリ</h1>
      {/* ここでCalendarコンポーネントを呼び出しています */}
      <Calendar />
    </div>
  );
}