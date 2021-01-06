import NavigationItem from './navigation-item/navigation-item';
import './navigation-items.css';

const NavigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/" active>Burger Builder</NavigationItem>
            <NavigationItem link="/">Checkout</NavigationItem>
        </ul>
    );
}

export default NavigationItems;
