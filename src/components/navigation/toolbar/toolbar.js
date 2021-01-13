import Logo from '../../logo/logo';
import NavigationItems from '../navigation-items/navigation-items';
import './toolbar.css';

const Toolbar = (props) => {
    return (
        <header className="Toolbar">
            <div className="hamburger-menu" onClick={props.drawerToggleClicked}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="toolbar-logo">
                <Logo />
            </div>
            <nav className="DesktopOnly">
                <NavigationItems isAuthenticated={props.isAuthenticated} />
            </nav>
        </header>
    );
};

export default Toolbar;
