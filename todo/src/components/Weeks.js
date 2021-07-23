import React, { useState } from 'react';
import Week from './Week';

const Weeks = props => {
  const today = new Date();
  const { now, setNow } = props;

  const [days, SetDays] = useState([
    {
      id: 0,
      day: 'Sun',
    },
    {
      id: 1,
      day: 'Mon',
    },
    {
      id: 2,
      day: 'Tue',
    },
    {
      id: 3,
      day: 'Wed',
    },
    {
      id: 4,
      day: 'Thu',
    },
    {
      id: 5,
      day: 'Fri',
    },
    {
      id: 6,
      day: 'Sat',
    },
  ]);

  const daysChangeHandlerRight = e => {
    e.preventDefault();
    const newDays = [...days];
    newDays.push(newDays.shift());
    SetDays(newDays);
    const newNow = now.clone().add(1, 'day');
    setNow(newNow);
  };

  const daysChangeHandlerLeft = e => {
    e.preventDefault();
    const newDays = [...days];
    newDays.unshift(newDays.pop());
    SetDays(newDays);
    const newNow = now.clone().subtract(1, 'day');
    setNow(newNow);
  };

  const daysChangeHandler = idx => {
    if (idx > 3) {
      idx = idx - 3;
      const newNow = now.clone().add(idx, 'day');
      setNow(newNow);
      const newDays = [...days];
      for (idx; idx > 0; idx--) {
        newDays.push(newDays.shift());
      }
      SetDays(newDays);
    } else if (idx < 3) {
      idx = 3 - idx;
      const newNow = now.clone().subtract(idx, 'day');
      setNow(newNow);
      const newDays = [...days];
      for (idx; idx > 0; idx--) {
        newDays.unshift(newDays.pop());
      }
      SetDays(newDays);
    }
  };

  return (
    <div className="week">
      <button onClick={daysChangeHandlerLeft}>←</button>
      {days.map((day, idx) => (
        <Week
          key={idx}
          days={days}
          idx={idx}
          now={now}
          today={today}
          onDaysChange={daysChangeHandler}
        />
      ))}
      <button onClick={daysChangeHandlerRight}>→</button>
    </div>
  );
};

export default Weeks;
