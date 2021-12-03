import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import NestModal from './NestModal';

const CreateNew = ({ modal, toggleModal, addTodo, newTitle, newDescription, urgent, category, setCategoryFunc, onChangeTitle, onChangeDescription, }) => {

  // const [nestModal, setNestModal] = useState(false);

  // const toggleNestModal = () => {
  //   setNestModal(!nestModal)
  // }

  return (
    <div>
      <Modal
        // toggle={toggleModal}
        isOpen={modal}
        urgent={urgent}
      >
        <ModalHeader toggle={toggleModal} className="form-group" >Create Task</ModalHeader>
        <ModalBody className="form-group">
          <div>Title: <input value={newTitle} onChange={onChangeTitle} className="form-control" /></div>
          Description: <br />
          <textarea row="6" value={newDescription} onChange={onChangeDescription} className="form-control" />
        </ModalBody>

        <ModalFooter>

          <Button
            color="success"
            onClick={setCategoryFunc}
          >
            {category}
          </Button>


          <Button
            color="primary"
            onClick={addTodo}
          >
            Create
          </Button>
          {' '}
          <Button onClick={toggleModal}>
            Cancel
          </Button>

        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateNew;