import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import s from './App.module.scss';
// import ContactForm from './components/ContactForm'

class App extends Component {

  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
    name: '',
    number: ''
  }

  contactId = uuidv4()
  phoneId = uuidv4()
  filterId = uuidv4()

  handleChange = e => {
    const {name, value} = e.currentTarget;

    this.setState({[name]: value})
  }

  handleSubmit = e => {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      number: this.state.number
    }
    if([...this.prevState.contacts.includes(e.name)]) {
      alert(`${obj.name} is already in contacts`)
    } else {
      this.setState({contact: obj});
    }

    this.setState((prevState) => {
      return {
        contacts: [...prevState.contacts, obj]
      }
    })
    this.reset()
  }

  reset = () => {
    this.setState({name: '', number: '', filter: ''})
  }

  addContact = name => {
    const contact ={
      id: this.contactId,
      name,
      comleted: false,
    }

    this.setState(prevState => ({
      name: [contact, ...prevState.contacts]
    }))
  }

  changeFilter = e => {
    this.setState({filter: e.currentTarget.value})
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

    const visibleContacts = this.getVisibleContacts()

    return (
      <div className={s.section}>
        <h2 className={s.title}>Phonebook</h2>
        <form onSubmit={this.handleSubmit}>
          <div className={s.form}> 
            <label htmlFor={this.contactId} className={s.formLabel}>
              Name
              <input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                required
                className={s.inputWindow}
                value={this.state.name}
                onChange={this.handleChange}
                id={this.contactId}
              />
            </label>
            <label htmlFor={this.phoneId} className={s.formLabel}>
              Phone
              <input
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                required
                className={s.inputWindow}
                value={this.state.number}
                onChange={this.handleChange}
                id={this.phoneId}
              />
            </label>
          <button type='submit' title="Добавить контакт" className={s.btn}>Add contact</button>
          </div>
        </form>


        <h2 className={s.title}>Contacts</h2>
        <label htmlFor={this.filterId} className={s.formLabel}>
          Find contacts by name
          <input 
            type='text'
            className={s.inputWindow}
            id={this.filterId}
            value={this.state.filter}
            onChange={this.changeFilter}
          >
          </input>
        </label>

        <ul className={s.contactList}>
          {visibleContacts.map(({id, name, number}) => 
            <li key={id}>
              <p>{name}: {number}</p>
              <button 
                onClick={() => this.deleteContact(id)}>Delete</button>
            </li>
            
            )}
        </ul>
        
        

      </div>
    );
  }
  
}

export default App;
