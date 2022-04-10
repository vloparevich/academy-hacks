import React from 'react';
import './MySchedule.css';

export default function MyScedule(props) {
  return (
    <React.Fragment>
      {props.mySchedule?.map((el, i) => (
        <>
          {el.bookedTime.length > 0 && (
            <div>
              <div className='myLessonCard' key={i}>
                {el.bookedTime.length > 0 && (
                  <>
                    <p>{el.date}</p>
                    <ul>
                      {el.bookedTime.map((time, i) => (
                        <li key={i}>
                          {time}:00 - {time + 1}:00
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      ))}
    </React.Fragment>
  );
}
