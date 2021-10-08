import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './Styles.module.scss';

class ContactForm extends Component {
    state = {
        name: '',
        number: ''
    }

    contactId = uuidv4()
    phoneId = uuidv4()

    handleChange = e => {
        const {name, value} = e.currentTarget;
        this.setState({[name]: value})
    }

    handleSubmit = e => {
        e.preventDefault();
        const {name, number} = this.state
        const obj = {name, number}        
        this.props.newContact(obj)
        this.reset()
    }

    reset = () => {
        this.setState({
            name: '',
            number: ''})
    }

    render () {
        const {name, number} = this.state
        const {handleSubmit, handleChange, contactId, phoneId} = this
        return (
            <form onSubmit={handleSubmit}>
                <div className={s.form}> 
                    <label htmlFor={contactId} className={s.formLabel}>
                    Name
                    <input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                        required
                        className={s.inputWindow}
                        value={name}
                        onChange={handleChange}
                        id={contactId}
                    />
                    </label>
                    <label htmlFor={phoneId} className={s.formLabel}>
                    Phone
                    <input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                        required
                        className={s.inputWindow}
                        value={number}
                        onChange={handleChange}
                        id={phoneId}
                    />
                    </label>
                <button type='submit' title="Добавить контакт" className={s.btn}>Add contact</button>
          </div>
    </form>
        )
    }
}

export default ContactForm