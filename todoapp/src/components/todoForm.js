import React, { useState } from "react";
import CreateNew from "./CreateNew";

const TodoForm = (props) => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }
    const style = {
        backgroundColor: "rgb(252, 198, 3)",
        shadow: "#a5a5a5"
    }
    return (
        // <form style={style} className="text-center" onSubmit={props.addTodo}>
        //     <div style={{ paddingBottom: 10 }}>todo: <input value={props.newTodo} onChange={props.handletoDo} /></div>
        //     {/* <div>Deadline: <input value={props.deadline} onChange={props.handleDeadline} /></div> */}
        //     <div style={{ paddingBottom: 20 }} className="add" ><button className="btn btn-primary" type="submit" onClick={() => setModal(true)}>Add New todo <i class="bi bi-pen-fill"></i></button></div>
        //     <CreateNew modal={modal} toggleModal={toggleModal} onSubmit={props.addTodo} />
        // </form>
        <div style={style} className="todoForm justify-content-center">
            <div style={{ paddingBottom: 10, paddingLeft: 5, paddingRight: 5 }} className="add" ><button className="btn btn-dark font-link" type="submit" onClick={() => setModal(true)}>Create Task <i class="bi bi-plus-lg"></i></button></div>
            <CreateNew modal={modal} toggleModal={toggleModal} addTodo={props.addTodo}
                newTitle={props.newTodoTitle} onChangeTitle={props.onChangeTitle}
                newDescription={props.newDescription} onChangeDescription={props.onChangeDescription}
                category={props.category} setCategoryFunc={props.setCategoryFunc} />
        </div>
    )
}

export default TodoForm