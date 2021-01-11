import { NavLink } from 'react-router-dom';
import './navigation-item.css';

const NavigationItem = (props) => {
    return (
        <li className='NavigationItem'>
            <NavLink exact to={props.link}>{props.children}</NavLink>
        </li>
    );
}

export default NavigationItem;
