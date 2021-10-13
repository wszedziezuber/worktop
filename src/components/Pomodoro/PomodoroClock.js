import React, { useEffect } from 'react';
import './PomodoroClock.css';
import { BreakLength } from './BreakLength';
import { SessionLength } from './SessionLength';
import { TimerButtons } from './TimerButtons';
import alarm from '../../assets/alarm.mp3';



export const formatTime = (time) => {
	let minutes = Math.floor(time / 60);
	let seconds = time % 60;
	return (
		(minutes < 10 ? '0' + minutes : minutes) +
		' : ' +
		(seconds < 10 ? '0' + seconds : seconds)
	);
};


export const PomodoroClock = ({ displayTime, setDisplayTime, breakTime, setBreakTime, timerOn, setTimerOn, onBreak, setOnBreak, sessionTime, setSessionTime}) => {


	const breakAudio = new Audio(alarm);

	useEffect(() => {
		if (displayTime <= 0) {
			setOnBreak(true);
			playBreakSound();
			console.log(onBreak);
		} else if (!timerOn && displayTime === breakTime) {
			setOnBreak(false);
			console.log(onBreak);
		}
	});

	//local storage:

	useEffect(() => {
		getPomodoroTime();
	}, []);

	useEffect(() => {
		savePomodoroTime();
	}, [displayTime]);

	const savePomodoroTime = () => {
		localStorage.setItem('displayTime', JSON.stringify(displayTime));
	};

	const getPomodoroTime = () => {
		localStorage.getItem('displayTime', JSON.stringify(displayTime));
	};

	const playBreakSound = () => {
		breakAudio.currentTime = 0;
		breakAudio.play();
	};

	

	const changeTime = (amount, type) => {
		if (type == 'break') {
			if ((breakTime <= 60 && amount < 0) || breakTime >= 60 * 60) {
				return;
			}
			setBreakTime((prev) => prev + amount);
		} else {
			if ((sessionTime <= 60 && amount < 0) || sessionTime >= 60 * 60) {
				return;
			}
			setSessionTime((prev) => prev + amount);
			if (!timerOn) {
				setDisplayTime(sessionTime + amount);
			}
		}
	};

	const controlTime = () => {
		let second = 1000;
		let date = new Date().getTime();
		let nextDate = new Date().getTime() + second;
		let onBreakVariable = onBreak;

		if (!timerOn) {
			let interval = setInterval(() => {
				date = new Date().getTime();
				if (date > nextDate) {
					setDisplayTime((prev) => {
						if (prev <= 0 && !onBreakVariable) {
							onBreakVariable = true;
							return breakTime;
						} else if (prev <= 0 && onBreakVariable) {
							onBreakVariable = false;
							setOnBreak(false);
							return sessionTime;
						}
						return prev - 1;
					});
					nextDate += second;
				}
			}, 30);
			localStorage.setItem('interval-id', interval);
		}
		if (timerOn) {
			clearInterval(localStorage.getItem('interval-id'));
		}
		setTimerOn(!timerOn);
	};

	const resetTime = () => {
		setDisplayTime(25 * 60);
		setSessionTime(25 * 60);
		setBreakTime(5 * 60);
		setOnBreak(false);
	};

	return (
		<div>
			<p>{onBreak ? 'Break' : 'Focus'}</p>
			<p className="displayTime">{formatTime(displayTime)}</p>
			<div className="length-container">
				<div>
					<p>Break</p>
					<BreakLength
						type={'break'}
						changeTime={changeTime}
						time={breakTime}
						formatTime={formatTime}
					/>
				</div>

				<div>
					<p>Pomodoro</p>
					<SessionLength
						changeTime={changeTime}
						type={'session'}
						time={sessionTime}
						formatTime={formatTime}
					/>
				</div>
			</div>

			<TimerButtons
				timerOn={timerOn}
				controlTime={controlTime}
				resetTime={resetTime}
			/>
		</div>

	);
};
