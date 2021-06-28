import React, { useState } from 'react';
import { Button } from 'antd';


export const TimerButtons = ({timerOn, controlTime, resetTime }) => {

    return(
        <div>
        <div className="buttons-container">
        <Button 
            onClick={controlTime}
            className="timer-button">

            {timerOn ? "pause" : "play"}

        </Button>

        <Button 
        onClick={resetTime}
        className="timer-button">

        reset

        </Button>
        </div>
        </div>
    )

}
