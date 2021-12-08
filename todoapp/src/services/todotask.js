import axios from "axios"

const baseUrl = "/api/todoList"

const getAll = () => {
    axios
        .get(baseUrl)
        .then(res => res.data)
}
const post = () => {

}