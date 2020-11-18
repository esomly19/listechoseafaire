import React, { useState } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { List } from '../models/List';
import { Todo } from '../models/TodoItem';
import Fire from '../Fire';

interface ListData {
    list: List;
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
            props.list.Name = inputValue
            firebase.updateList(props.list)
        });

    };

    const handleShow = () => { setShow(true); };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }
    return (
        <>
            <Dropdown.Item variant="primary" onClick={handleShow}>
                Update List Name
     </Dropdown.Item>
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Modification nom de liste</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Control
                        id="outlined-error-helper-text"
                        value={inputValue}
                        placeholder={props.list.Name}
                        onChange={handleChange}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}