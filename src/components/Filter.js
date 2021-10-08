import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid';
import s from './Styles.module.scss';

const filterId = uuidv4()

function Filter ({value, changeFilter}) {
    return (
    <div className={s.filterBox}>
        <label htmlFor={filterId} className={s.filterLabel}>
        
        <input 
            type='text'
            className={s.filterInput}
            id={filterId}
            placeholder="Find contacts by name"
            value={value}
            onChange={changeFilter}
        >
        </input>
        </label>
    </div>
    )
    
}

Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}
  
export default Filter