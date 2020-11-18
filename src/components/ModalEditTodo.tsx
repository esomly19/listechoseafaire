import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { List } from '../models/List';
import { Todo } from '../models/TodoItem';
import Fire from '../Fire';
import { FaPen } from 'react-icons/fa';
interface ListData {
    list: List;
    iid: number
}
export default function ModalEditList(props: ListData) {
    const [inputValue, setInputValue] = React.useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleSave = () => {
        setShow(false);
        let firebase = new Fire((error: any) => {
            if (error) {
                return alert("Une erreur est survenue lors de la connexion à la base de données");
            }
            props.list.Todos[props.iid].Name = inputValue
            firebase.updateList(props.list)
        });

    };

    const handleShow = () => { setShow(true); };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }
    return (
        <>
            <FaPen className="flex-right" onClick={handleShow}></FaPen>

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Modification nom du todo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Control
                        id="outlined-error-helper-text"
                        value={inputValue}
                        placeholder={props.list.Todos[props.iid].Name}
                        onChange={handleChange}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}