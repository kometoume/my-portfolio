// src/components/Calendar.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react'; // useEffect を再度インポートします
import '../app/calendar/Calendar.css'; // カレンダー専用のCSSファイルを読み込みます

const Calendar: React.FC = () => {
  // `currentDate`は、"Today"ボタンで今日に戻る時のみ使われる日付オブジェクト
  // カレンダーの表示自体は`year`と`month`の状態に依存
  const [currentDate, setCurrentDate] = useState(new Date()); // 初期の今日の日付を保持
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());

  // --- ここから追加・変更する部分 ---

  // カレンダーが最初にレンダリングされたとき、または年/月が変更されたときに
  // `currentDate`を最新の状態に保つためのuseEffect
  useEffect(() => {
    // ページロード時や月移動時に、表示しているカレンダーの「今日」を正しく設定するため
    // ここで`currentDate`を更新すると、`getCalendarBody`の再計算がトリガーされます。
    setCurrentDate(new Date());

    // 次の日の午前0時までのミリ秒を計算し、タイマーを設定
    const now = new Date();
    const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilNextDay = nextDay.getTime() - now.getTime();

    // 次の日の午前0時にカレンダーを更新するためのタイマーを設定
    const timerId = setTimeout(() => {
      // 日付が変わったら、年と月を今日の情報にリセットし、currentDateも更新して再レンダリングをトリガー
      const today = new Date();
      setYear(today.getFullYear());
      setMonth(today.getMonth());
      setCurrentDate(today);
      // さらに、翌日以降も自動更新されるように、再度タイマーを設定 (再帰的に呼び出すことで継続)
      // これをしないと、一度更新したら終わりになってしまう
      // この useEffect が再実行されることで新しい setTimeout が設定されます
    }, timeUntilNextDay);

    // コンポーネントがアンマウントされるときにタイマーをクリア
    return () => clearTimeout(timerId);
  }, [year, month]); // year, month が変わったときにもタイマーを再設定

  // --- ここまで追加・変更する部分 ---


  // 月のタイトルをフォーマット (例: 2025/07)
  const renderTitle = useCallback(() => {
    return `${year}/${String(month + 1).padStart(2, '0')}`;
  }, [year, month]);

  // カレンダーの前の月の部分の日付データを生成
  const getCalendarHead = useCallback(() => {
    const dates = [];
    const d = new Date(year, month, 0).getDate(); // 前の月の最終日
    const n = new Date(year, month, 1).getDay(); // 今月の1日の曜日 (0:日, 6:土)

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true, // 前の月の日付は無効化
      });
    }
    return dates;
  }, [year, month]);

  // カレンダーの今月の部分の日付データを生成
  const getCalendarBody = useCallback(() => {
    const dates = [];
    const lastDate = new Date(year, month + 1, 0).getDate(); // 今月の最終日

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    // 今日の日付をハイライト
    // `currentDate` を依存配列に入れることで、`goToToday` で `currentDate` が更新された際に再評価される
    if (year === currentDate.getFullYear() && month === currentDate.getMonth()) {
      dates[currentDate.getDate() - 1].isToday = true;
    }
    return dates;
  }, [year, month, currentDate]); // currentDate を依存配列に追加

  // カレンダーの次の月の部分の日付データを生成
  const getCalendarTail = useCallback(() => {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay(); // 今月の最終日の曜日

    // `7 - lastDay` が0以下であれば、forループは実行されないので条件は不要
    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true, // 次の月の日付は無効化
      });
    }
    return dates;
  }, [year, month]);

  // 前の月に移動する関数
  const goToPrevMonth = useCallback(() => {
    setMonth(prevMonth => {
      if (prevMonth === 0) { // 1月 (0) から前へ行く場合
        setYear(prevYear => prevYear - 1); // 年を減らす
        return 11; // 12月 (11) に戻る
      }
      return prevMonth - 1; // それ以外は月を減らす
    });
  }, []);

  // 次の月に移動する関数
  const goToNextMonth = useCallback(() => {
    setMonth(prevMonth => {
      if (prevMonth === 11) { // 12月 (11) から次へ行く場合
        setYear(prevYear => prevYear + 1); // 年を増やす
        return 0; // 1月 (0) に進む
      }
      return prevMonth + 1; // それ以外は月を増やす
    });
  }, []);

  // 今日の日付に戻る関数
  const goToToday = useCallback(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    // `currentDate` を更新することで、`getCalendarBody` が再実行され、今日のセルが正しくハイライトされる
    setCurrentDate(today);
  }, []);

  // カレンダーデータ全体 (前の月、今月、次の月の日付を結合)
  const dates = [...getCalendarHead(), ...getCalendarBody(), ...getCalendarTail()];
  const weeks = [];
  const weeksCount = dates.length / 7; // 週の数

  // 日付データを週ごとに分割
  for (let i = 0; i < weeksCount; i++) {
    weeks.push(dates.slice(i * 7, (i + 1) * 7));
  }

  return (
    <div className="calendar-container"> {/* CSSでスタイルを適用するためのラッパー要素 */}
      <table>
        <thead>
          <tr>
            <th id="prev" onClick={goToPrevMonth}>&laquo;</th> {/* 前の月へ */}
            <th id="title" colSpan={5}>{renderTitle()}</th> {/* 現在の年月を表示 */}
            <th id="next" onClick={goToNextMonth}>&raquo;</th> {/* 次の月へ */}
          </tr>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}> {/* 各週の行 */}
              {week.map((dateInfo, dateIndex) => (
                <td
                  key={dateIndex}
                  // 今日の日付や無効な日付にCSSクラスを適用
                  className={`${dateInfo.isToday ? 'today' : ''} ${dateInfo.isDisabled ? 'disabled' : ''}`}
                >
                  {dateInfo.date} {/* 日付の数字を表示 */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td id="today" colSpan={7} onClick={goToToday}>Today</td> {/* 今日へ戻るボタン */}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Calendar;