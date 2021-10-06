import React from 'react';
import { Button } from 'antd';
import './PomodoroClock.css'



export const SessionLength = ({title, changeTime, type, time, formatTime}) => {
    return (
        <div>
            <h3>
                {title}
            </h3>
            <div className="time-sets">
                <Button
                onClick={() => changeTime(-60, type)}
                >
                    -
                </Button>
                <h3>{formatTime(time)}</h3>
                <Button
                onClick={() => changeTime(60, type)}
                >
                    +
                </Button>
            </div>
        </div>
    )
}