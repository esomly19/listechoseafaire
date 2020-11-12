import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import { List } from '../models/List';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import ToggleButton from 'react-bootstrap/esm/ToggleButton';
import Fire from '../Fire';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { Todo } from '../models/TodoItem';
import classNames from 'classnames';


interface ListData {
    list: List;
    /*AddTodo: () => void;
    DeleteList: () => void;
    EditListName: () => void;*/
}


export default function CardList(props: ListData) {
    const [checked, setChecked] = React.useState(true);
    const [inputValue, setInputValue] = React.useState('');

    const handleDeleteList = () => {
        let firebase = new Fire((error: any) => {
            if (error) {
                return alert("Une erreur est survenue lors de la connexion à la base de données");
            }
            firebase.deleteList(props.list)
            return function unsubscribe() {
                firebase.detach();
            }
        })

    }
    const handleDeleteTodo = (todo: Todo) => {
        if (window.confirm("Voulez vous vraiment supprimer " + todo.Name + " ?")) {
            let e = props.list.Todos.indexOf(todo);
            props.list.Todos.splice(e, 1);
            let firebase = new Fire((error: any) => {
                if (error) {
                    return alert("Une erreur est survenue lors de la connexion à la base de données");
                }
                firebase.updateList(props.list)
                return function unsubscribe() {
                    firebase.detach();
                }
            })
        } else { return; }
    }
    const handleAddTodo = () => {
        props.list.Todos.push({ Name: inputValue, Completion: false })
        let firebase = new Fire((error: any) => {
            if (error) {
                return alert("Une erreur est survenue lors de la connexion à la base de données");
            }

            firebase.updateList(props.list)
            return function unsubscribe() {
                firebase.detach();
            }
        })
        setInputValue("");
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }
    const handleChangeChk = (todo: Todo, i: number) => {
        props.list.Todos[i].Completion = !props.list.Todos[i].Completion;
        let firebase = new Fire((error: any) => {
            if (error) {
                return alert("Une erreur est survenue lors de la connexion à la base de données");
            }
            firebase.updateList(props.list)
            return function unsubscribe() {
                firebase.detach();
            }
        })

    }

    return (
        <Card className="text-center" style={{ width: '30rem' }} >
            <Card.Header><DropdownButton className=" btn btn-light  float-right" title="" id="bg-vertical-dropdown-2">
                <Dropdown.Item eventKey="1" onClick={() => handleDeleteList()}>Delete List</Dropdown.Item>
                <Dropdown.Item eventKey="1" onClick={() => handleDeleteList()}>Update List Name</Dropdown.Item>
            </DropdownButton></Card.Header>
            <Card.Title>{props.list.Name} </Card.Title>
            <ListGroup variant="flush">
                {props.list.Todos.map((todo, i) => (
                    <> <ListGroup.Item>  {todo.Name}      <input className="float-left" type="checkbox" defaultChecked={todo.Completion} onChange={() => handleChangeChk(todo, i)} />

                        <Button className=" btn btn-light  float-right" onClick={() => handleDeleteTodo(todo)}>x</Button></ListGroup.Item></>

                ))}
                <ListGroup.Item>
                    <div className="input-group"><Form.Control
                        id="outlined-error-helper-text"
                        value={inputValue}
                        onChange={handleChange}
                    /><Button onClick={handleAddTodo}>+</Button> </div></ListGroup.Item>
            </ListGroup>
            <Card.Footer className="text-muted">{
                "Tâches complétées : " +
                props.list.Todos.filter(function (todo) {
                    return todo.Completion;
                }).length + " / " + props.list.Todos.length
            }</Card.Footer>
        </Card >
    );
}
