import axios from "axios"

// const baseUrl = "http://localhost:8000/api/todoList"
const baseUrl = "api/todoList"

// const baseUrl = process.env.baseUrl

// const getAll = () => {
//     axios
//         .get(baseUrl)
//         .then(res => res.data)
// }

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const post = (todoObj) => {
    const request = axios.post(baseUrl, todoObj)
    return request.then(response => response.data)
}


const update = (id, changedTodo) => {
    const request = axios.put(`${baseUrl}/${id}`, changedTodo)
    return request.then(response => response.data)
}
const remove = (deleteObj) => {
    const request = axios.delete(`${baseUrl}/${deleteObj.id}`)
    return request.then(response => response.data)
}
const todoService = {
    getAll,
    post,
    update,
    remove
}

export default todoService