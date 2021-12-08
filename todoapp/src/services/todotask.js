import axios from "axios"

const baseUrl = "https://my-todo-task-app.herokuapp.com/api/todoList"

const getAll = () => {
    axios
        .get(baseUrl)
        .then(res => res.data)
}
const post = () => {

}