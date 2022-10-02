import React, { useState } from "react";
import { Button, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import EditTask from "./EditTask";

const TodoItem = (props) => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }

    // const colors = [
    //     {
    //         primaryColor: "#0E52E6",
    //         secondaryColor: "#ECF3FC"
    //     },
    //     {
    //         primaryColor: "#F5AD05",
    //         secondaryColor: "#FEFAF1"
    //     },
    //     {
    //         primaryColor: "#5DC250",
    //         secondaryColor: "#F2FAF1"
    //     },
    //     {
    //         primaryColor: "#F48687",
    //         secondaryColor: "#FDF1F1"
    //     },
    //     {
    //         primaryColor: "#B964F7",
    //         secondaryColor: "#F3F0FD"
    //     }
    // ]
    // style={{ "background-color": colors[props.item.id % 5].primaryColor }}

    return (
        <Card className="todoItem" style={props.Topstyle}>
            {/* <div className="card-top" style={{ "background-color": "black" }}></div> */}
            <CardBody>
                <CardTitle tag="h4" className="font-link-2" autoCapitalize="true">
                    {/* <input type="checkbox" onClick={props.handleChange} checked={props.item.complete} /> <br /> */}
                    {props.item.title}
                </CardTitle>
                <CardText className="font-link-3">
                    {props.item.description}
                </CardText>
                {/* style={{ "position": "absolute", "left": "60%", "top": "80%" }} */}
                <Button color="" className="position-absolute bottom-0 end-0" >
                    <i className="bi bi-pencil-square" onClick={() => setModal(true)} ></i>
                    <i onClick={props.handleUrgency} className={props.item.urgent ? "bi bi-flag-fill" : "bi bi-flag"}></i>
                    <i onClick={props.handleDelete} className="bi bi-trash-fill"></i>
                </Button>
            </CardBody>
            <EditTask modal={modal} toggleModal={toggleModal} TodoItem={props.item}
                onUpdate={props.onUpdate}
            // title={TodoItem.title} description={TodoItem.description}

            />
        </Card>
    )
}

export default TodoItem
