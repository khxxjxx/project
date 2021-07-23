import React from 'react';

const Week = props => {
  const { days, idx, now, today, onDaysChange } = props;

  const dayChangeHandler = e => {
    e.preventDefault();
    onDaysChange(idx);
  };

  return (
    <div
      className={`day ${idx === 3 ? '' : 'choice'}`}
      onClick={dayChangeHandler}>
      <div>
        {
          days.find(
            day =>
              day.id ==
              now.clone().subtract(3, 'day').add(idx, 'day').format('e')
          ).day
        }
      </div>
      <div
        className={
          now.clone().subtract(3, 'day').add(idx, 'day').format('YYYY-M-D') ===
          `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
            ? 'today'
            : ''
        }>
        {now.clone().subtract(3, 'day').add(idx, 'day').format('DD', 'date')}
      </div>
    </div>
  );
};

export default Week;
