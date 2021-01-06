import './navigation-item.css';

const NavigationItem = (props) => {
    return (
        <li className='NavigationItem'>
            <a className={props.active ? 'active' : null} href={props.link}>{props.children}</a>
        </li>
    );
}

export default NavigationItem;
