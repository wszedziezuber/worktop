import React, { useState, useEffect } from "react";
import "./App.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../node_modules/antd/dist/antd.css";
import { PageHeader, Button } from "antd";
import { nanoid } from "nanoid";

import { Form } from "./components/Form/Form";
import { TodoList } from "./components/Todo/TodoList";
import { PomodoroClock } from "./components/Pomodoro/PomodoroClock";
import { NotesList } from "./components/Notes/NotesList";
import { SearchBar } from "./components/Notes/Search";
import { formatTime } from "./components/Pomodoro/PomodoroClock"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  //App State - ToDo List
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //App State - Notes
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  //App State - Pomodoro
  const [displayTime, setDisplayTime] = useState(25 * 60);
	const [breakTime, setBreakTime] = useState(5 * 60);
	const [sessionTime, setSessionTime] = useState(25 * 60);
	const [timerOn, setTimerOn] = useState(false);
	const [onBreak, setOnBreak] = useState(false);


  //get Local todos once app starts

  useEffect(() => {
    getLocalTodosAndNotes();
  }, []);

  //useEffect
  useEffect(() => {
    filterHandler();
    saveTodosAndNotes();
  }, [todos, notes, status]);

  //Functions
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  //Save to local storage
  const saveTodosAndNotes = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const getLocalTodosAndNotes = () => {
    if (
      localStorage.getItem("todos") === null &&
      localStorage.getItem("notes") === null
    ) {
      localStorage.setItem("todos", JSON.stringify([]));
      localStorage.setItem("notes", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      let notesLocal = JSON.parse(localStorage.getItem("notes"));
      setTodos(todoLocal);
      setNotes(notesLocal);
    }
  };


//APP

  return (
    <div className="App">
      <Router>
        <PageHeader
          className="pageHeader"
          ghost={false}
          title="WorkTop"
          subTitle=""
          extra={[
            <a className="navLink">
              <Link to="/notes">
                <Button type="text" key="1">
                  Notes
                </Button>
              </Link>
            </a>,
            <a className="navLink">
              <Link to="/todo">
                <Button type="text" key="2">
                  To Do
                </Button>
              </Link>
            </a>,
            <a className="navLink">
              <Link to="/pomodoro">
                <Button type="text" key="3">
                  Pomodoro
                </Button>
              </Link>
            </a>,
            <a className="navLink timer">
            <Link to="/pomodoro">
              <Button type="text" key="4">
              {formatTime(displayTime)}
              </Button>
            </Link>
          </a>,
          ]}
        ></PageHeader>




        <Switch>
          <Route path="/todo">
            <h2 className="componentheader">To Do List</h2>
            <Form
              todos={todos}
              setTodos={setTodos}
              setInputText={setInputText}
              inputText={inputText}
              setStatus={setStatus}
            />
            <TodoList
              setTodos={setTodos}
              todos={todos}
              filteredTodos={filteredTodos}
            />
          </Route>

          <Route path="/pomodoro">
            <h2 className="componentheader">Pomodoro Clock</h2>
            <PomodoroClock
            displayTime={displayTime}
            setDisplayTime={setDisplayTime}
            breakTime={breakTime}
            setBreakTime={setBreakTime}
            timerOn={timerOn}
            setTimerOn={setTimerOn}
            onBreak={onBreak}
            setOnBreak={setOnBreak}
            sessionTime={sessionTime}
            setSessionTime={setSessionTime}
            
            />
          </Route>

          <Route exact path="/notes">
            <h2 className="componentheader">Notes</h2>
            <SearchBar handleSearchNote={setSearchText} />
            <NotesList
              notes={notes.filter((note) =>
                note.text.toLowerCase().includes(searchText)
              )}
              handleAddNote={addNote}
              handleDeleteNote={deleteNote}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
