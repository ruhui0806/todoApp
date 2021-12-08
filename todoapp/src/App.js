import React, { useEffect, useState } from "react";
import './App.css';
import TodoItem from './components/todoItem';
import Header from './components/header';
import TodoForm from "./components/todoForm";
import NestModal from "./components/NestModal"
import axios from "axios";
// import { Button, ButtonGroup, Modal, ModalHeader, ModalFooter } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const [todoList, setTodoList] = useState([])
  const [newDescription, setDescription] = useState("")
  const [category, setCategory] = useState("Un-grouped")
  const [nestModal, setNestModal] = useState(false);
  const [urgent, setUrgent] = useState(false);

  //fetch data from backend server and store it as todoList:
  useEffect(() => {
    axios
      .get("https://my-todo-task-app.herokuapp.com/api/todoList")
      .then(res => res.data)
      .then(res => {
        console.log("promise fulfilled")
        setTodoList(res)
      })
  }, []) // the code is executed whenever the [] content is changed, namely when the page is refreshed

  // const handleComplete = (id) => {
  //   const todo = todoList.find(n => n.id === id)
  //   const changedTodo = { ...todo, complete: !todo.complete }
  // }
  const handleDeleteFunc = (id) => {
    const deleteObj = todoList.filter(n => n.id === id)[0]
    window.confirm('Do you confirm to delete this todo item?') ?
      axios
        .delete(`https://my-todo-task-app.herokuapp.com/api/todoList/${deleteObj.id}`)
        .then(() => setTodoList(todoList.filter(n => n.id !== id)))
      :
      alert("this item will not be deleted!")
  }
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const onChangeTitle = (event) => {
    // console.log(event.target.value)
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
      .post("https://my-todo-task-app.herokuapp.com/api/todoList", todoObj)
      .then((res) => {
        setTodoList(todoList.concat(res.data))
      })
    setNewTodoTitle("")
    setDescription("")
    setCategory("Un-grouped")
  }
  const handleUrgent = () => {
    setUrgent(!urgent)
  }
  const handleUrgentFunc = (id) => {
    const todo = todoList.find(n => n.id === id)
    const changedTodo = { ...todo, urgent: !todo.urgent }
    axios
      .put(`https://my-todo-task-app.herokuapp.com/api/todoList/${id}`, changedTodo)
      .then((res) => { setTodoList(todoList.map(n => n.id === id ? res.data : n)) })
      .catch(err => console.log(err))
  }

  const onUpdateFunc = (id, updateTodo) => {
    axios
      .put(`https://my-todo-task-app.herokuapp.com/api/todoList/${id}`, updateTodo)
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
          <div className="todo-column-1 col-sm-12 col-md-5 col-lg-2 order-sm-1 order-md-1">
            <h5 className="font-link text-center">Unstart </h5>
            {UnstartTasks.map(i => <TodoItem key={i.id} item={i} handleUrgency={() => handleUrgentFunc(i.id)} handleDelete={() => handleDeleteFunc(i.id)}
              onUpdate={onUpdateFunc} Topstyle={{ "background-color": "#006d77" }} />)}
          </div>
          <div className="todo-column-2 col-sm-12 col-md-5 col-lg-2 order-sm-2 order-md-2">
            <h5 className="font-link text-center">In progress </h5>
            {InProgressTasks.map(i => <TodoItem key={i.id} item={i} handleUrgency={() => handleUrgentFunc(i.id)} handleDelete={() => handleDeleteFunc(i.id)}
              onUpdate={onUpdateFunc} Topstyle={{ "background-color": "#2A9D8F" }} />)}
          </div>
          <div className="todo-column-3 col-sm-12 col-md-5 col-lg-2 order-sm-3 order-md-1">
            <h5 className="font-link text-center">Complete </h5>
            {CompleteTasks.map(i => <TodoItem key={i.id} item={i} handleUrgency={() => handleUrgentFunc(i.id)} handleDelete={() => handleDeleteFunc(i.id)}
              onUpdate={onUpdateFunc} Topstyle={{ "background-color": "#ffb703" }} />)}
          </div>
          <div className="todo-column-4 col-sm-12 col-md-5 col-lg-2 order-sm-4 order-md-2">
            <h5 className="font-link text-center">Overdue </h5>
            {OverdueTasks.map(i => <TodoItem key={i.id} item={i} handleUrgency={() => handleUrgentFunc(i.id)} handleDelete={() => handleDeleteFunc(i.id)}
              onUpdate={onUpdateFunc} Topstyle={{ "background-color": "#F4A261" }} />)}
          </div>
          <div className="todo-column-5 col-sm-12 col-md-5 col-lg-2 order-sm-5 order-md-1">
            <h5 className="font-link text-center">Un-grouped </h5>
            {Ungrouped.map(i => <TodoItem key={i.id} item={i} handleUrgency={() => handleUrgentFunc(i.id)} handleDelete={() => handleDeleteFunc(i.id)}
              onUpdate={onUpdateFunc} Topstyle={{ "background-color": "#e76f51" }} />)}
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
