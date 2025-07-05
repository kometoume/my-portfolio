'use client';

import React, { useState, useCallback, useEffect } from 'react';
// 以下のCSSファイルのインポートは、このCanvas環境ではパス解決エラーとなるためコメントアウトしています。
// 実際のNext.jsプロジェクトなどでは、この行を有効にしてCSSファイルをインポートしてください。
import '../app/calendar/Calendar.css';

// トレーニング種別の定義
type TrainingType = 'squat' | 'benchpress' | 'latpulldown';

// 日付ごとのトレーニング記録の型
interface TrainingRecord {
  [date: string]: { // 'YYYY-MM-DD'形式の文字列をキーとする
    squat: boolean;
    benchpress: boolean;
    latpulldown: boolean;
  };
}

// カレンダーの日付セルが持つべき情報の型定義
interface DateInfo {
  date: number;
  isToday: boolean;
  isDisabled: boolean;
  fullDate: string; // 'YYYY-MM-DD'形式の文字列
  record: {
    squat: boolean;
    benchpress: boolean;
    latpulldown: boolean;
  };
}

const Calendar: React.FC = () => {
  // `currentDate`は、"Today"ボタンで今日に戻る時や、日付のハイライトに使われる日付オブジェクト
  // カレンダーの表示自体は`year`と`month`の状態に依存します。
  const [currentDate, setCurrentDate] = useState(new Date()); // 初期の今日の日付を保持
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  // トレーニング記録を保持する状態
  // キーは 'YYYY-MM-DD' 形式の文字列
  const [trainingRecords, setTrainingRecords] = useState<TrainingRecord>(() => {
    // 初回ロード時にlocalStorageからデータを読み込む
    if (typeof window !== 'undefined') { // ブラウザ環境でのみlocalStorageを使用
      const savedRecords = localStorage.getItem('trainingRecords');
      return savedRecords ? JSON.parse(savedRecords) : {};
    }
    return {};
  });

  // 選択された日付の状態 (モーダル表示用)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  
  // 日付が変更されたときにカレンダーを自動更新するためのuseEffect
  useEffect(() => {
    // 次の日の午前0時にカレンダーを更新するためのタイマーを設定する関数
    const setMidnightTimer = () => {
      const now = new Date();
      // 次の日の午前0時を計算します。
      const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const timeUntilNextDay = nextDay.getTime() - now.getTime();

      // タイマーを設定します。
      const timerId = setTimeout(() => {
        const today = new Date();
        // 年、月、日付を今日の情報に更新して再レンダリングをトリガーします。
        setYear(today.getFullYear());
        setMonth(today.getMonth());
        setCurrentDate(today);
        // さらに、翌日以降も自動更新されるように、再度タイマーを設定 (再帰的に呼び出すことで継続)
        setMidnightTimer();
      }, timeUntilNextDay);

      return timerId; // タイマーIDを返します。
    };

    // コンポーネントがマウントされたときに最初のタイマーを設定します。
    const initialTimerId = setMidnightTimer();

    // 初期表示時に `currentDate` を今日の正確な日付に設定し、カレンダーの年と月もそれに合わせます。
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    setCurrentDate(today);

    // コンポーネントがアンマウントされるときにタイマーをクリアします。
    return () => clearTimeout(initialTimerId);
  }, []); // ここを空の依存配列に変更することで、マウント時に一度だけ実行されるようになります。

  // trainingRecords が変更されるたびに localStorage に保存
  useEffect(() => {
    if (typeof window !== 'undefined') { // ブラウザ環境でのみlocalStorageを使用
      localStorage.setItem('trainingRecords', JSON.stringify(trainingRecords));
    }
  }, [trainingRecords]);

  // 月のタイトルをフォーマット (例: 2025/07)
  const renderTitle = useCallback(() => {
    return `${year}/${String(month + 1).padStart(2, '0')}`;
  }, [year, month]);

  // カレンダーの前の月の部分の日付データを生成
  const getCalendarHead = useCallback((): DateInfo[] => { // DateInfo[] を返すことを明示
    const dates: DateInfo[] = []; // DateInfo[] で初期化
    const d = new Date(year, month, 0).getDate(); // 前の月の最終日
    const n = new Date(year, month, 1).getDay(); // 今月の1日の曜日 (0:日, 6:土)

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true, // 前の月の日付は無効化
        fullDate: '', // 無効な日付にはfullDateを持たせない
        record: { squat: false, benchpress: false, latpulldown: false }, // 無効な日付でもrecordプロパティを持たせる
      });
    }
    return dates;
  }, [year, month]);

  // カレンダーの今月の部分の日付データを生成
  const getCalendarBody = useCallback((): DateInfo[] => { // DateInfo[] を返すことを明示
    const dates: DateInfo[] = []; // DateInfo[] で初期化
    const lastDate = new Date(year, month + 1, 0).getDate(); // 今月の最終日

    for (let i = 1; i <= lastDate; i++) {
      const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
        fullDate: fullDate, // 'YYYY-MM-DD'形式の文字列を追加
        record: trainingRecords[fullDate] || { squat: false, benchpress: false, latpulldown: false },
      });
    }

    // 今日の日付をハイライト
    if (year === currentDate.getFullYear() && month === currentDate.getMonth()) {
      const todayDateInfo = dates[currentDate.getDate() - 1];
      if (todayDateInfo) { // undefinedチェック (TypeScriptの厳密なチェックに対応)
        todayDateInfo.isToday = true;
      }
    }
    return dates;
  }, [year, month, currentDate, trainingRecords]); // currentDate, trainingRecords を依存配列に追加

  // カレンダーの次の月の部分の日付データを生成
  const getCalendarTail = useCallback((): DateInfo[] => { // DateInfo[] を返すことを明示
    const dates: DateInfo[] = []; // DateInfo[] で初期化
    const lastDay = new Date(year, month + 1, 0).getDay(); // 今月の最終日の曜日

    // `7 - lastDay` が0以下であれば、forループは実行されないので条件は不要
    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true, // 次の月の日付は無効化
        fullDate: '',
        record: { squat: false, benchpress: false, latpulldown: false }, // 無効な日付でもrecordプロパティを持たせる
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
    setSelectedDate(null); // 月が変わったら選択を解除
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
    setSelectedDate(null); // 月が変わったら選択を解除
  }, []);

  // 今日の日付に戻る関数
  const goToToday = useCallback(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    // `currentDate` を更新することで、`getCalendarBody` が再実行され、今日のセルが正しくハイライトされる
    setCurrentDate(today);
    setSelectedDate(null); // 今日ボタンで選択を解除
  }, []);

  // 日付クリック時のハンドラー
  const handleDateClick = useCallback((dateInfo: DateInfo) => { // DateInfo型を明示
    if (!dateInfo.isDisabled) {
      setSelectedDate(dateInfo.fullDate);
    }
  }, []);

  // トレーニングチェックボックス変更時のハンドラー
  const handleTrainingToggle = useCallback((type: TrainingType) => {
    if (selectedDate) {
      setTrainingRecords(prevRecords => {
        const currentDayRecords = prevRecords[selectedDate] || { squat: false, benchpress: false, latpulldown: false };
        return {
          ...prevRecords,
          [selectedDate]: {
            ...currentDayRecords,
            [type]: !currentDayRecords[type], // チェックボックスの状態を反転
          },
        };
      });
    }
  }, [selectedDate]);

  // カレンダーデータ全体 (前の月、今月、次の月の日付を結合)
  const dates: DateInfo[] = [...getCalendarHead(), ...getCalendarBody(), ...getCalendarTail()]; // DateInfo[] 型を明示
  const weeks: DateInfo[][] = []; // DateInfo[][] 型を明示
  const weeksCount = Math.ceil(dates.length / 7); // 週の数を正確に計算 (端数切り上げ)

  // 日付データを週ごとに分割
  for (let i = 0; i < weeksCount; i++) {
    weeks.push(dates.slice(i * 7, (i + 1) * 7));
  }

  // 選択された日付のトレーニング記録を取得
  const currentSelectedDayRecord = selectedDate ? trainingRecords[selectedDate] || { squat: false, benchpress: false, latpulldown: false } : null;

  return (
    <div className="calendar-container"> {/* CSSでスタイルを適用するためのラッパー要素 */}
      <table>
        <thead>
          <tr>
            <th id="prev" onClick={goToPrevMonth}>&laquo;</th><th id="title" colSpan={5}>{renderTitle()}</th><th id="next" onClick={goToNextMonth}>&raquo;</th>
          </tr>
          <tr>
            <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>{/* 各週の行 */}
              {week.map((dateInfo, dateIndex) => (
                <td
                  key={dateIndex}
                  // 今日の日付や無効な日付、選択された日付にCSSクラスを適用
                  className={`${dateInfo.isToday ? 'today' : ''} ${dateInfo.isDisabled ? 'disabled' : ''} ${selectedDate === dateInfo.fullDate ? 'selected-date' : ''}`}
                  onClick={() => handleDateClick(dateInfo)} // 日付クリックハンドラー
                >
                  <span className="date-number">{dateInfo.date}</span> {/* 日付の数字を表示 */}
                  {/* 無効な日付でなく、かつrecordプロパティが存在する場合のみドットを表示 */}
                  {!dateInfo.isDisabled && dateInfo.record && (
                    <div className="training-dots-container">
                      {dateInfo.record.squat && <span className="training-dot squat-dot"></span>}
                      {dateInfo.record.benchpress && <span className="training-dot benchpress-dot"></span>}
                      {dateInfo.record.latpulldown && <span className="training-dot latpulldown-dot"></span>}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td id="today" colSpan={7} onClick={goToToday}>Today</td>
          </tr>
        </tfoot>
      </table>

      {/* 選択された日付がある場合にのみモーダルを表示 */}
      {selectedDate && (
        <div className="training-modal">
          <h3>{selectedDate} の記録</h3>
          <label>
            <input
              type="checkbox"
              checked={currentSelectedDayRecord?.squat || false} // nullish coalescing operatorを使用
              onChange={() => handleTrainingToggle('squat')}
            />
            スクワット
          </label>
          <label>
            <input
              type="checkbox"
              checked={currentSelectedDayRecord?.benchpress || false}
              onChange={() => handleTrainingToggle('benchpress')}
            />
            ベンチプレス
          </label>
          <label>
            <input
              type="checkbox"
              checked={currentSelectedDayRecord?.latpulldown || false}
              onChange={() => handleTrainingToggle('latpulldown')}
            />
            ラットプルダウン
          </label>
          <button onClick={() => setSelectedDate(null)}>閉じる</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;