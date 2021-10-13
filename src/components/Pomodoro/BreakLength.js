import React from 'react';
import { Button } from 'antd';
import './PomodoroClock.css'



export const BreakLength = ({title, changeTime, type, time, formatTime}) => {
    return (
        <div>
            <h3>
                {title}
            </h3>
            <div className="time-sets">
                <Button
                onClick={() => changeTime(-60, type)}
                style={{ background: "none", color: "#fff", border: "none" }}
                >
                    <i className="fas fa-minus"></i>
                    
                </Button>
                <h3 className="lengthDisplay">{formatTime(time)}</h3>
                <Button
                style={{ background: "none", color: "#fff", border: "none" }}

                onClick={() => changeTime(60, type)}
                >
                    <i className="fas fa-plus"></i>
                    
                </Button>
            </div>
        </div>
    )
}