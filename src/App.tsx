import React, { useState, useEffect } from 'react';
import Fire from './Fire';
import './App.css';
import { List } from './models/List';
import TodoList from './components/TodoList';
import Navbar from 'react-bootstrap/esm/Navbar';
import { Button, Container, Row } from 'react-bootstrap';
import CreateList from './components/CreateList';

function App() {
  const [lists, setLists] = useState(Array<List>());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let firebase = new Fire((error: any) => {
      if (error) {
        return alert("Une erreur est survenue lors de la connexion à la base de données");
      }

      firebase.getLists((lists: List[]) => {
        setLists(lists);
        setLoading(false);
      });

      return function unsubscribe() {
        firebase.detach();
      }
    })
  }, []);

  return (
    <body>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          Todo APP
          <Navbar.Collapse className="justify-content-end">
            <CreateList></CreateList>
          </Navbar.Collapse>
        </Navbar.Brand>
      </Navbar>
      <div className="App">
        <Container>
          <Row>
            {
              lists.map((list, i) => {

                return (
                  <TodoList list={list} />
                );
              })}
          </Row>
        </Container>

      </div>
    </body >
  );
}

export default App;
