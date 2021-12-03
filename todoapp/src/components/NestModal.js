import { Button, ButtonGroup, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import React from "react";

const NestModal = ({ toggleNestModal, nestModal, category, setUnstart, setInProgress, setComplete, setOverdue, setUngroup }) => {


    return (
        <Modal toggle={toggleNestModal}
            isOpen={nestModal}>


            <ModalHeader>
                Category
            </ModalHeader>

            <ButtonGroup>
                <Button
                    color="primary"
                    onClick={setUnstart}
                >
                    Unstart
                </Button>
                <Button
                    color="primary"
                    onClick={setInProgress}
                >
                    In progress
                </Button>
                <Button
                    color="primary"
                    onClick={setComplete}
                >
                    Complete
                </Button>
                <Button
                    color="primary"
                    onClick={setOverdue}
                >
                    Overdue
                </Button>
                <Button
                    color="primary"
                    onClick={setUngroup}
                >
                    Un-grouped
                </Button>
            </ButtonGroup>
            <p>
                Selected:{category}
            </p>

            <ModalFooter>
                <Button
                    color="primary"
                    onClick={toggleNestModal}
                >
                    Done
                </Button>
                {' '}
                <Button onClick={toggleNestModal}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default NestModal;