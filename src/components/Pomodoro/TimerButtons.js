import React from 'react';
import { Button } from 'antd';


export const TimerButtons = ({timerOn, controlTime, resetTime }) => {


    return(
        <div>
        <div className="buttons-container">
        <Button 
            style={{ background: "none", color: "#fff", border: "none" }}
            onClick={controlTime}
            className="timer-button">

            {timerOn ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}

        </Button>

        <Button
        style={{ background: "none", color: "#fff", border: "none" }}
        onClick={resetTime}
        className="timer-button">

        <i className="fas fa-redo-alt"></i>

        </Button>
        
        </div>
        </div>
    )

}
