import NavigationItem from './navigation-item/navigation-item';
import './navigation-items.css';

const NavigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {
                props.isAuthenticated
                    ? <NavigationItem link="/orders">Orders</NavigationItem>
                    : null
            }
            {
                props.isAuthenticated
                    ? <NavigationItem link="/logout">Log Out</NavigationItem>
                    : <NavigationItem link="/auth">Authenticate</NavigationItem>
            }

        </ul>
    );
}

export default NavigationItems;
