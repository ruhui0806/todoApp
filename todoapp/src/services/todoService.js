import axios from "axios"

const baseUrl = "http://localhost:8000/api/todoList"

const getAll = () => {
    axios
        .get(baseUrl)
        .then(res => res.data)
}
const post = (todoObj) => {
    axios
        .post(baseUrl, todoObj)
        .then(response => response.data)
}
const update = (id, changedTodo) => {
    axios
        .put(`${baseUrl}/${id}`, changedTodo)
        .then(response => response.data)
}
const remove = (deleteObj) => {
    axios
        .delete(`${baseUrl}/${deleteObj.id}`)
        .then(response => response.data)
}
const todoService = {
    getAll,
    post,
    update,
    remove
}

export default todoService