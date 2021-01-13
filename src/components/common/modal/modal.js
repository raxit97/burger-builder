import React, { Component, Fragment } from 'react';
import Backdrop from '../backdrop/backdrop';
import './modal.css';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children);
    }

    render() {
        const classes = ['Modal', this.props.show ? 'show-modal' : 'hide-modal'];
        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.join(' ')}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
};

export default Modal;
