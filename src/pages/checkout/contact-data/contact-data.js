import { useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/common/button/button";
import Spinner from "../../../components/common/spinner/spinner";
import './contact-data.css'
import * as orderActions from '../../../store/actions/index';
import { updateObject } from "../../../utilities/app-utility";
import { checkValidity } from "../../../utilities/validation-utility";
import { withRouter } from "react-router";

const ContactData = (props) => {

    const [orderForm, setOrderForm] = useState({
        name: {
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        pinCode: {
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 6
            },
            valid: false,
            touched: false
        },
        country: {
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        emailAddress: {
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            value: 'fastest',
            validation: {},
            valid: true
        }
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = async (event) => {
        event.preventDefault();
        const formData = {};
        for (let formIdentifier in orderForm) {
            formData[formIdentifier] = orderForm[formIdentifier].value;
        }
        const order = {
            userId: props.userId,
            ingredients: props.ingredients,
            price: props.totalPrice,
            customerData: formData
        };
        props.purchaseBurger(order, props.idToken);
    };

    const inputChange = (event) => {
        const updatedFormElement = updateObject(orderForm[event.target.name], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[event.target.name].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(orderForm, {
            [event.target.name]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid)
    };

    let form = (
        <form onSubmit={orderHandler}>
            <div className="input-container">
                <input className={!orderForm.name.valid && orderForm.name.touched ? 'error' : null} name="name" type="text" placeholder="Your name"
                    onChange={(event) => inputChange(event)} value={orderForm.name.value} />
            </div>
            <div className="input-container">
                <input className={!orderForm.street.valid && orderForm.street.touched ? 'error' : null} name="street" type="text" placeholder="Street"
                    onChange={(event) => inputChange(event)} value={orderForm.street.value} />
            </div>
            <div className="input-container">
                <input className={!orderForm.pinCode.valid && orderForm.pinCode.touched ? 'error' : null} name="pinCode" type="text" placeholder="Pin Code"
                    onChange={(event) => inputChange(event)} value={orderForm.pinCode.value} />
            </div>
            <div className="input-container">
                <input className={!orderForm.country.valid && orderForm.country.touched ? 'error' : null} name="country" type="text" placeholder="Country"
                    onChange={(event) => inputChange(event)} value={orderForm.country.value} />
            </div>
            <div className="input-container">
                <input className={!orderForm.emailAddress.valid && orderForm.emailAddress.touched ? 'error' : null} name="emailAddress" type="email" placeholder="Your email"
                    onChange={(event) => inputChange(event)} value={orderForm.emailAddress.value} />
            </div>
            <div className="input-container">
                <select name="deliveryMethod" value={orderForm.deliveryMethod.value} onChange={(event) => inputChange(event)}>
                    <option value='fastest'>Fastest</option>
                    <option value='cheapest'>Cheapest</option>
                </select>
            </div>
            <Button disabled={!formIsValid} buttonType="Success">ORDER</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />;
    }
    return (
        <div className="contact-data">
            <h4>Enter your contact data</h4>
            {form}
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId,
        idToken: state.auth.idToken
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        purchaseBurger: (orderData, idToken) => dispatch(orderActions.purchaseBurger(orderData, idToken))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));
