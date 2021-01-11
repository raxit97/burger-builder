import NavigationItem from './navigation-item/navigation-item';
import './navigation-items.css';

const NavigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
    );
}

export default NavigationItems;
