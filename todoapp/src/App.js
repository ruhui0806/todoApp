import React, { useEffect, useState } from "react";
import './App.css';
import TodoItem from './components/todoItem';
import Header from './components/header';
import TodoForm from "./components/todoForm";
import NestModal from "./components/NestModal"
import axios from "axios";
import todoService from "./services/todoService";


function App() {
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const [todoList, setTodoList] = useState([])
  const [newDescription, setDescription] = useState("")
  const [category, setCategory] = useState("Un-grouped")
  const [nestModal, setNestModal] = useState(false);
  const [urgent, setUrgent] = useState(false);

  const baseUrl = "/api/todoList"
  // const baseUrl = process.env.baseUrl


  //fetch data from server and store it as todoList:

  // useEffect(() => {
  //   axios
  //     .get(baseUrl)
  //     .then(response => response.data)
  //     .then(result => {
  //       console.log("promise fulfilled")
  //       console.log(process.env.NODE_ENV)
  //       setTodoList(result)
  //     })
  // }, [])

  useEffect(() => {
    todoService.getAll().then(res => setTodoList(res))
    console.log("promise fulfilled")
    console.log(process.env.NODE_ENV)
  }, [])



  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const onChangeTitle = (event) => {
    setNewTodoTitle(event.target.value)
  }

  const onChangeDescription = (event) => {
    setDescription(event.target.value)
  }

  const toggleNestModal = () => {
    setNestModal(!nestModal)
  }

  const setCategoryFunc = () => {
    setNestModal(!nestModal)
  }

  const addTodo = (event) => {
    event.preventDefault()
    console.log('A new todo is added!')
    const todoObj = {
      title: Capitalize(newTodoTitle),
      description: newDescription,
      urgent: false,
      category: category
    };
    axios
      .post(baseUrl, todoObj)
      .then((res) => {
        setTodoList(todoList.concat(res.data))
      })
    setNewTodoTitle("")
    setDescription("")
    setCategory("Un-grouped")
  }
  const handleDeleteFunc = (id) => {
    const deleteObj = todoList.filter(n => n.id === id)[0]
    window.confirm('Do you confirm to delete this todo item?') &&
      todoService.remove(deleteObj)
        .then(() => setTodoList(todoList.filter(n => n.id !== id)))
  }
  const handleUrgent = () => {
    setUrgent(!urgent)
  }

  const handleUrgentFunc = (id) => {
    const todo = todoList.find(n => n.id === id)
    const changedTodo = { ...todo, urgent: !todo.urgent }
    axios
      .put(`${baseUrl}/${id}`, changedTodo)
      .then((res) => { setTodoList(todoList.map(n => n.id === id ? res.data : n)) })
      .catch(err => console.log(err))
  }

  const onUpdateFunc = (id, updateTodo) => {
    axios
      .put(`${baseUrl}/${id}`, updateTodo)
      .then((res) => { setTodoList(todoList.map(n => n.id === id ? res.data : n)) })
      .catch(err => console.log(err))
  }

  const FiterTodoList = urgent ? todoList.filter(task => task.urgent === true) : todoList;

  const UnstartTasks = FiterTodoList.filter(task => task.category === "Unstart");
  const InProgressTasks = FiterTodoList.filter(task => task.category === "In progress");
  const CompleteTasks = FiterTodoList.filter(task => task.category === "Complete");
  const OverdueTasks = FiterTodoList.filter(task => task.category === "Overdue");
  const Ungrouped = FiterTodoList.filter(task => task.category === "Un-grouped");


  return (
    <div className="App">
      <Header className="header text-center" urgent={urgent} handleUrgent={handleUrgent} />
      <TodoForm className="text-center" newTodoTitle={newTodoTitle} onChangeTitle={onChangeTitle}
        addTodo={addTodo} newDescription={newDescription} onChangeDescription={onChangeDescription}
        category={category} setCategoryFunc={setCategoryFunc}
      />

      <div className="todo-wrapper container-fluid">
        <div className="row justify-content-evenly align-items-start gx-0">
          <div className="todo-column-1 col-sm-12 col-md-5 col-lg-2 order-lg-1">
            <h5 className="font-link text-center">Unstart </h5>
            {UnstartTasks.map(i => <TodoItem key={i.id} item={i} handleUrgency={() => handleUrgentFunc(i.id)} handleDelete={() => handleDeleteFunc(i.id)}
              onUpdate={onUpdateFunc} Topstyle={{ "backgroundColor": "#006d77" }} />)}
          </div>
          <div className="todo-column-2 col-sm-12 col-md-5 col-lg-2 order-lg-2">
            <h5 className="font-link text-center">In progress </h5>
            {InProgressTasks.map(i => <TodoItem key={i.id} item={i} handleUrgency={() => handleUrgentFunc(i.id)} handleDelete={() => handleDeleteFunc(i.id)}
              onUpdate={onUpdateFunc} Topstyle={{ "backgroundColor": "#2A9D8F" }} />)}
          </div>
          <div className="todo-column-3 col-sm-12 col-md-5 col-lg-2 order-lg-3">
            <h5 className="font-link text-center">Complete </h5>
            {CompleteTasks.map(i => <TodoItem key={i.id} item={i} handleUrgency={() => handleUrgentFunc(i.id)} handleDelete={() => handleDeleteFunc(i.id)}
              onUpdate={onUpdateFunc} Topstyle={{ "backgroundColor": "#ffb703" }} />)}
          </div>
          <div className="todo-column-4 col-sm-12 col-md-5 col-lg-2 order-lg-4">
            <h5 className="font-link text-center">Overdue </h5>
            {OverdueTasks.map(i => <TodoItem key={i.id} item={i} handleUrgency={() => handleUrgentFunc(i.id)} handleDelete={() => handleDeleteFunc(i.id)}
              onUpdate={onUpdateFunc} Topstyle={{ "backgroundColor": "#F4A261" }} />)}
          </div>
          <div className="todo-column-5 col-sm-12 col-md-5 col-lg-2 order-lg-5">
            <h5 className="font-link text-center">Un-grouped </h5>
            {Ungrouped.map(i => <TodoItem key={i.id} item={i} handleUrgency={() => handleUrgentFunc(i.id)} handleDelete={() => handleDeleteFunc(i.id)}
              onUpdate={onUpdateFunc} Topstyle={{ "backgroundColor": "#e76f51" }} />)}
          </div>
        </div>

        <NestModal toggleNestModal={toggleNestModal} nestModal={nestModal} category={category}
          setUnstart={() => setCategory("Unstart")} setInProgress={() => setCategory("In progress")}
          setComplete={() => setCategory("Complete")} setOverdue={() => setCategory("Overdue")} setUngroup={() => setCategory("Un-grouped")} />

      </div>
    </div>
  );
}

export default App;
