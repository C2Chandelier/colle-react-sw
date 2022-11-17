//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'



function App() {

  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const handleChange = event => {
    setMessage(event.target.value);
  };
  useEffect(() => {
    axios("https://swapi.dev/api/people/")
      .then((response) => {
        setContacts(response.data.results);
        setError(null);
      })
      .catch(setError);
  }, []);
  if (error) return <p>An error occurred</p>

  const listItem = contacts.map((contact) => <li key={contact.name}><h5 className="card-title">{contact.name}</h5></li>);

  let sendItem = [];
  console.log(message);
  if (!message) {
     sendItem = listItem;
  }
  else {
    sendItem = contacts.map(function (obj) {
      if (obj.name.indexOf(message) !== -1) {
        return <li key={obj.name}><h5 className="card-title">{obj.name}</h5></li>
      }
    });
  }

  return (

    <div className="App">
      <div>
        <input
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={message}
        />
      </div>
      <center><h1>People List</h1></center>
      <ul>{sendItem}</ul>
    </div>
  );
}

export default App;




