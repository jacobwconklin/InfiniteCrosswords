import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';


const SpeedTimer = (props) => {

    // Might need to fix speed timer to screen in absolute position
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 75); // set timer for 75 seconds
    
    // when start signal is received restart(time)
    /*
    useEffect(() => {
        if (props.start) {
            restart(expiryTimestamp);
        }
    }, [props.start]); */

    // Timer from: https://www.npmjs.com/package/react-timer-hook
    const {
        seconds,
        minutes,
        restart
      } = useTimer({ expiryTimestamp, onExpire: () => {
        console.warn('onExpire called');
        props.timeEnded();
      }});
    
      return (
        <div style={{textAlign: 'center'}}>
        { props.start && 
        <div>
          <div style={{fontSize: '100px'}}>
            <span>{minutes}</span>:<span>{seconds}</span>
          </div>
        </div>
        }
        </div>
      )
}

export default SpeedTimer;