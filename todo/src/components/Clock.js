import { useEffect, useState } from 'react';

const Clock = props => {
  let [today, setToday] = useState(new Date());
  const compare =
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}` ===
    props.now.clone().format('YYYY-M-D');

  useEffect(() => {
    if (compare) {
      setTimeout(() => {
        setToday(new Date());
      }, 1000);

      return () => {
        clearTimeout();
      };
    }
  }, [today, props.now]);

  return (
    <div>
      <div className="date">
        {props.now.clone().format('M')}월 {props.now.clone().format('DD')}일
      </div>
      {compare ? (
        <div className="clock">
          {today.getHours()}:
          {`${
            today.getMinutes() < 10
              ? `0${today.getMinutes()}`
              : `${today.getMinutes()}`
          }`}
          :
          {`${
            today.getSeconds() < 10
              ? `0${today.getSeconds()}`
              : `${today.getSeconds()}`
          }`}
        </div>
      ) : (
        <div className="none-clock"></div>
      )}
    </div>
  );
};

export default Clock;
