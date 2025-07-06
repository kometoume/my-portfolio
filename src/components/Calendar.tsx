'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import '../app/calendar/Calendar.css';

type TrainingType = 'squat' | 'benchpress' | 'latpulldown';

interface TrainingRecord {
  [date: string]: {
    squat: boolean;
    benchpress: boolean;
    latpulldown: boolean;
  };
}

interface DateInfo {
  date: number;
  isToday: boolean;
  isDisabled: boolean;
  fullDate: string;
  record: {
    squat: boolean;
    benchpress: boolean;
    latpulldown: boolean;
  };
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [trainingRecords, setTrainingRecords] = useState<TrainingRecord>(() => {
    if (typeof window !== 'undefined') {
      const savedRecords = localStorage.getItem('trainingRecords');
      return savedRecords ? JSON.parse(savedRecords) : {};
    }
    return {};
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number; transform: string } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const dateCellRefs = useRef<Record<string, HTMLTableCellElement | null>>({});

  useEffect(() => {
    const setMidnightTimer = () => {
      const now = new Date();
      const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const timeUntilNextDay = nextDay.getTime() - now.getTime();

      const timerId = setTimeout(() => {
        const today = new Date();
        setYear(today.getFullYear());
        setMonth(today.getMonth());
        setCurrentDate(today);
        setMidnightTimer();
      }, timeUntilNextDay);

      return timerId;
    };

    const initialTimerId = setMidnightTimer();

    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    setCurrentDate(today);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initialTimerId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('trainingRecords', JSON.stringify(trainingRecords));
    }
  }, [trainingRecords]);

  const renderTitle = useCallback(() => {
    return `${year}/${String(month + 1).padStart(2, '0')}`;
  }, [year, month]);

  const getCalendarHead = useCallback((): DateInfo[] => {
    const dates: DateInfo[] = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
        fullDate: '',
        record: { squat: false, benchpress: false, latpulldown: false },
      });
    }
    return dates;
  }, [year, month]);

  const getCalendarBody = useCallback((): DateInfo[] => {
    const dates: DateInfo[] = [];
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
        fullDate: fullDate,
        record: trainingRecords[fullDate] || { squat: false, benchpress: false, latpulldown: false },
      });
    }

    if (year === currentDate.getFullYear() && month === currentDate.getMonth()) {
      const todayDateInfo = dates[currentDate.getDate() - 1];
      if (todayDateInfo) {
        todayDateInfo.isToday = true;
      }
    }
    return dates;
  }, [year, month, currentDate, trainingRecords]);

  const getCalendarTail = useCallback((): DateInfo[] => {
    const dates: DateInfo[] = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
        fullDate: '',
        record: { squat: false, benchpress: false, latpulldown: false },
      });
    }
    return dates;
  }, [year, month]);

  const goToPrevMonth = useCallback(() => {
    setMonth(prevMonth => {
      if (prevMonth === 0) {
        setYear(prevYear => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
    setSelectedDate(null);
    setModalPosition(null);
  }, []);

  const goToNextMonth = useCallback(() => {
    setMonth(prevMonth => {
      if (prevMonth === 11) {
        setYear(prevYear => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
    setSelectedDate(null);
    setModalPosition(null);
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    setCurrentDate(today);
    setSelectedDate(null);
    setModalPosition(null);
  }, []);

  const handleDateClick = useCallback((dateInfo: DateInfo, event: React.MouseEvent<HTMLTableCellElement>) => {
    if (dateInfo.isDisabled) {
      setSelectedDate(null);
      setModalPosition(null);
      return;
    }

    if (selectedDate === dateInfo.fullDate) {
      setSelectedDate(null);
      setModalPosition(null);
      return;
    }

    setSelectedDate(dateInfo.fullDate);

    const cell = event.currentTarget;
    const cellRect = cell.getBoundingClientRect();
    const calendarContainer = cell.closest('.calendar-container');
    const containerRect = calendarContainer?.getBoundingClientRect();

    if (containerRect) {
      let top: number;
      let left: number;
      let transform: string;

      if (isMobile) {
        // モバイルの場合：選択されたセルの段の下、左右は画面中央
        // top は calendar-container に対する相対位置で計算
        top = cellRect.bottom - containerRect.top + 10; // セルの下端から calendar-container の上端までの距離 + オフセット
        // left は画面全体の中央を基準に計算
        left = window.innerWidth / 2; // 画面の幅の半分
        transform = 'translateX(-50%)'; // モーダル自身の幅の半分だけ左に移動して中央揃え

      } else {
        // デスクトップの場合：選択された日の下、左右中央 (画面内におさめる制約なし)
        top = cellRect.bottom - containerRect.top + 10;
        left = cellRect.left - containerRect.left + cellRect.width / 2;
        transform = 'translateX(-50%)';
      }
      setModalPosition({ top, left, transform });
    } else {
      // コンテナが見つからない場合のフォールバック (モバイルと同じ画面中央表示)
      setModalPosition({
        top: window.innerHeight / 2,
        left: window.innerWidth / 2,
        transform: 'translate(-50%, -50%)',
      });
    }
  }, [selectedDate, isMobile]);

  const handleTrainingToggle = useCallback((type: TrainingType) => {
    if (selectedDate) {
      setTrainingRecords(prevRecords => {
        const currentDayRecords = prevRecords[selectedDate] || { squat: false, benchpress: false, latpulldown: false };
        return {
          ...prevRecords,
          [selectedDate]: {
            ...currentDayRecords,
            [type]: !currentDayRecords[type],
          },
        };
      });
    }
  }, [selectedDate]);

  const closeModal = useCallback(() => {
    setSelectedDate(null);
    setModalPosition(null);
  }, []);

  const dates: DateInfo[] = [...getCalendarHead(), ...getCalendarBody(), ...getCalendarTail()];
  const weeks: DateInfo[][] = [];
  const weeksCount = Math.ceil(dates.length / 7);

  for (let i = 0; i < weeksCount; i++) {
    weeks.push(dates.slice(i * 7, (i + 1) * 7));
  }

  const currentSelectedDayRecord = selectedDate ? trainingRecords[selectedDate] || { squat: false, benchpress: false, latpulldown: false } : null;

  return (
    <div className="calendar-container">
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
            <tr key={weekIndex}>
              {week.map((dateInfo, dateIndex) => (
                <td
                  key={dateIndex}
                  ref={el => {
                    if (dateInfo.fullDate) {
                      dateCellRefs.current[dateInfo.fullDate] = el;
                    }
                  }}
                  className={`${dateInfo.isToday ? 'today' : ''} ${dateInfo.isDisabled ? 'disabled' : ''} ${selectedDate === dateInfo.fullDate ? 'selected-date' : ''}`}
                  onClick={(e) => handleDateClick(dateInfo, e)}
                >
                  <span className="date-number">{dateInfo.date}</span>
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

      {selectedDate && modalPosition && (
        <div
          className={`training-modal ${isMobile ? 'mobile-modal' : 'desktop-modal'}`}
          style={{ top: modalPosition.top, left: modalPosition.left, transform: modalPosition.transform }}
        >
          <h3>{selectedDate} の記録</h3>
          <label>
            <input
              type="checkbox"
              checked={currentSelectedDayRecord?.squat || false}
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
          <button onClick={closeModal}>閉じる</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;