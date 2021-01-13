import { Fragment } from "react";
import Logo from "../../logo/logo"
import NavigationItems from "../navigation-items/navigation-items"
import './side-drawer.css';
import Backdrop from '../../common/backdrop/backdrop';

const SideDrawer = (props) => {
    let attachedClasses = ['SideDrawer', 'Close'];
    if (props.open) {
        attachedClasses = ['SideDrawer', 'Open'];
    }
    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className="side-drawer-logo">
                    <Logo />
                </div>
                <nav onClick={props.closed}>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </Fragment>
    );
};

export default SideDrawer;
