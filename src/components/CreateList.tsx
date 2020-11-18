import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { List } from '../models/List';
import { Todo } from '../models/TodoItem';
import Fire from '../Fire';
import { StyleSheet, css } from 'aphrodite';



export default function CreateListModal() {
    const [inputValue, setInputValue] = React.useState('');
    const [show, setShow] = useState(false);


    const state = {
        background: '#fff',
    };

    const handleChangeComplete = (color: any) => {
        state.background = color.hex
    };

    const handleClose = () => {
        setShow(false);

    };
    const handleSave = () => {
        if (inputValue === '') { alert("veuillez entrez un nom") } else {
            setShow(false);
            let newlist: List;
            newlist = {
                Name: (inputValue),
                Todos: new Array<Todo>(),
            }
            let firebase = new Fire((error: any) => {
                if (error) {
                    return alert("Une erreur est survenue lors de la connexion à la base de données");
                }

                firebase.addList(newlist)
                return function unsubscribe() {
                    firebase.detach();
                }
            })
            setInputValue("");
        }
    };
    const handleShow = () => { setShow(true); };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow} >
                Create New List
      </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Création nouvelle liste</Modal.Title>
                </Modal.Header>
                <Modal.Body><Form.Control
                    id="outlined-error-helper-text"
                    value={inputValue}
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