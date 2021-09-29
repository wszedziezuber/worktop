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

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  //App State - ToDo List
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [notes, setNotes] = useState([]);

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
  }

  //get Local todos once app starts

  useEffect(() => {
    getLocalTodos();
  }, []);

  //useEffect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

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

  //Save to local storage
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <Router>
        <PageHeader
          className="pageHeader"
          ghost={false}
          onBack={() => window.history.back()}
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
            <PomodoroClock />
          </Route>

          <Route exact path="/notes">
            <h2 className="componentheader">Notes</h2>
            <NotesList 
            notes={notes} 
            handleAddNote={addNote} 
            handleDeleteNote={deleteNote}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
