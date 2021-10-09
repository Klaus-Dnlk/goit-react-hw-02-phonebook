import React, { Component } from 'react';
import s from './App.module.scss';
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import ContactList from './components/ContactList '

class App extends Component {

  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  }

  addNewContact = (obj) => {
    const {name} = obj
    const uniqueName = this.state.contacts
      .map((e) => e.name.toLowerCase())
      .includes(name.toLowerCase())
    
      if(uniqueName) {
          alert(`${name} is already in contacts`)
      } else {
          this.setState({contact: obj});
          this.setState((prevState) => {
            return {
              contacts: [...prevState.contacts, obj]
            }})
      }
    
  }

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value })
  }

  getVisibleContacts = () => {
    const { filter, contacts} = this.state
    const normalizeFilter = filter.toLowerCase()

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter))
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(e => e.id !== contactId)
    }))
  }

  render () {
    const {getVisibleContacts, addNewContact, deleteContact, changeFilter} = this
    const {filter} = this.state
    const visibleContacts = getVisibleContacts()

    return (
      <div className={s.section}>
        <h2 className={s.title}>Phonebook</h2>
          <ContactForm newContact={addNewContact}/>
        <h2 className={s.title}>Contacts</h2>
          <Filter value={filter} changeFilter={changeFilter}/>
          <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
      </div>
    );
  }
  
}   

export default App;
