import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
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
            <Toolbar isAuthenticated={props.isAuthenticated} drawerToggleClicked={sideDrawerToggle} />
            <SideDrawer isAuthenticated={props.isAuthenticated} open={showSideDrawer} closed={sideDrawerClosed} />
            <main className="content">
                {props.children}
            </main>
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.idToken !== null
    };
}

export default connect(mapStateToProps)(Layout);
