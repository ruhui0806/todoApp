
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useState } from "react";
import NestModal from "./NestModal";

const EditTask = (props) => {

    const id = props.TodoItem.id

    const urgent = props.TodoItem.urgent
    const [title, setTitle] = useState(props.TodoItem.title);
    const [description, setDescription] = useState(props.TodoItem.description)
    const [nestModal, setNestModal] = useState(false);
    const [category, setCategory] = useState(props.TodoItem.category)

    const updateTodo = { id, title, description, category, urgent }

    const toggleNestModal = () => {
        setNestModal(!nestModal)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        props.onUpdate(id, updateTodo)
        props.toggleModal()
    }
    // const Capitalize = (str) => {
    //     return str.charAt(0).toUpperCase() + str.slice(1);
    // }
    return (
        <div>
            <Modal
                // toggle={props.toggleModal}
                isOpen={props.modal}
            >
                <ModalHeader toggle={props.toggleModal} className="form-group" >Update Task</ModalHeader>
                <ModalBody className="form-group">
                    <div>Title: <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" /></div>
                    Description: <br />
                    <textarea row="6" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
                </ModalBody>

                <ModalFooter>

                    <Button
                        color="success"
                        onClick={toggleNestModal}
                    >
                        {category}, Click to Change
                    </Button>

                    <NestModal toggleNestModal={toggleNestModal} nestModal={nestModal} category={category}
                        setUnstart={() => setCategory("Unstart")} setInProgress={() => setCategory("In progress")}
                        setComplete={() => setCategory("Complete")} setOverdue={() => setCategory("Overdue")} setUngroup={() => setCategory("Un-grouped")} />

                    <Button
                        color="primary"
                        onClick={onSubmit}
                    >
                        Update
                    </Button>
                    {' '}
                    <Button onClick={props.toggleModal}>
                        Cancel
                    </Button>

                </ModalFooter>

            </Modal>
        </div>
    )
}
export default EditTask;