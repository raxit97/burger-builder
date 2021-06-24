import React, { Fragment } from 'react';
import Backdrop from '../backdrop/backdrop';
import './modal.css';

const Modal = (props) => {

    const classes = ['Modal', props.show ? 'show-modal' : 'hide-modal'];
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.join(' ')}>
                {props.children}
            </div>
        </Fragment>
    );
};

export default React.memo(Modal, (prevProps, nextProps) => {
    return (nextProps.show === prevProps.show && nextProps.children === prevProps.children);
});
