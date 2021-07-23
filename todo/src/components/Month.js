import React, { useState } from 'react';
import Day from './Day';
import moment from 'moment';

const Month = props => {
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek =
    today.clone().endOf('month').week() === 1
      ? 53
      : today.clone().endOf('month').week();

  const onClickHandler = day => {
    props.setNow(day);
    props.history.push('/todo/today');
  };

  const calendarArr = () => {
    let result = [];
    let week = firstWeek;

    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let days = today
                .clone()
                .startOf('year')
                .week(week)
                .startOf('week')
                .add(index, 'day');

              return (
                <td
                  key={index}
                  className={`month__day ${
                    moment().format('YYYYMMDD') === days.format('YYYYMMDD')
                      ? 'month__today'
                      : getMoment.format('MM') !== days.format('MM')
                      ? 'month__days'
                      : ''
                  }`}>
                  <Day days={days} onClick={onClickHandler}>
                    {days.format('D')}
                  </Day>
                  <div
                    className={`get-item ${
                      localStorage.getItem(days.format('YYYY-MM-DD')) ===
                        '[]' ||
                      localStorage.getItem(days.format('YYYY-MM-DD')) === null
                        ? 'none'
                        : JSON.parse(
                            localStorage.getItem(
                              days.clone().format('YYYY-MM-DD')
                            )
                          ).find(data => data.clicked === false) === undefined
                        ? 'all-clear'
                        : ''
                    }`}></div>
                </td>
              );
            })}
        </tr>
      );
    }
    return result;
  };

  return (
    <div className="calendar">
      <div className="month">
        <div className="control">
          <button
            onClick={() => {
              setMoment(getMoment.clone().subtract(1, 'month'));
            }}>
            ←
          </button>
          <span>{today.format('YYYY 년 MM 월')}</span>
          <button
            onClick={() => {
              setMoment(getMoment.clone().add(1, 'month'));
            }}>
            →
          </button>
        </div>
        <div
          className={`days ${lastWeek - firstWeek === 5 ? 'more-days' : ''}`}>
          <table>
            <tbody>{calendarArr()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Month;
