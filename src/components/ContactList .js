import PropTypes from 'prop-types'
import s from './Styles.module.scss';

function ContactList ({contacts, deleteContact}) {
  return (
    <ul className={s.contactList}>
      {contacts.map(({id, name, number}) => 
        <li key={id} className={s.listItem}>
          <p>{name}: {number}</p>
          <button 
            onClick={() => deleteContact(id)}
            className={s.btn}
            title="Удалить контакт"
            >Delete</button>
        </li>
        )}
    </ul>   
  )
}

ContactList.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func,
}
      
export default ContactList