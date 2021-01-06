import { Fragment, useState } from 'react';
import SideDrawer from '../navigation/side-drawer/side-drawer';
import Toolbar from '../navigation/toolbar/toolbar';
import './layout.css';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const sideDrawerClosed = () => {
        setShowSideDrawer(false);
    };

    const sideDrawerToggle = () => {
        setShowSideDrawer(!showSideDrawer);
    };

    return (
        <Fragment>
            <Toolbar drawerToggleClicked={sideDrawerToggle} />
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosed} />
            <main className="content">
                {props.children}
            </main>
        </Fragment>
    )
};

export default Layout;
