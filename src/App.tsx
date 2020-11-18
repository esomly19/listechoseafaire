import React, { useState, useEffect } from 'react';
import Fire from './Fire';
import './App.css';
import { List } from './models/List';
import TodoList from './components/TodoList';
import Navbar from 'react-bootstrap/esm/Navbar';
import { Button, Container, Row, Spinner } from 'react-bootstrap';
import CreateList from './components/CreateList';
import { StyleSheet, css } from 'aphrodite';
function App() {
  const [lists, setLists] = useState(Array<List>());
  const [loading, setLoading] = useState(true);
  const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',

    },
    body: {
      width: '100%'

    },
    nv: {
      float: 'right',

    },

  });
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
    <body className={css(styles.body)}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand >
          Todo APP
        </Navbar.Brand>
        <div className={css(styles.nv)}> <CreateList ></CreateList></div>
      </Navbar>

      <Container className={css(styles.wrapper)}>
        {
          loading ? <Spinner animation="grow" /> :
            lists.map((list, i) => {

              return (
                <TodoList list={list} />
              );
            })}
      </Container>

    </body >
  );
}

export default App;
