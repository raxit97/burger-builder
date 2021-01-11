import { Component } from "react";
import Button from "../../../components/common/button/button";
import Spinner from "../../../components/common/spinner/spinner";
import axios from "../../../http/axios-orders";
import './contact-data.css'

class ContactData extends Component {

    state = {
        orderForm: {
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
        },
        formIsValid: false,
        loading: false
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    orderHandler = async (event) => {
        try {
            event.preventDefault();
            this.setState({ loading: true });
            const formData = {};
            for (let formIdentifier in this.state.orderForm) {
                formData[formIdentifier] = this.state.orderForm[formIdentifier];
            }
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.price,
                orderData: formData
            };
            await axios.post('/orders.json', order);
            this.setState({ loading: false });
            this.props.history.push('/');
        } catch (error) {
            this.setState({ loading: false });
        }
    };

    inputChange = (event) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[event.target.name] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[event.target.name] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    };

    render() {
        const orderForm = { ...this.state.orderForm };
        let form = (<form onSubmit={this.orderHandler}>
            <div className="input-container">
                <input className={!orderForm.name.valid && orderForm.name.touched ? 'error' : null} name="name" type="text" placeholder="Your name"
                    onChange={(event) => this.inputChange(event)} value={orderForm.name.value} />
            </div>
            <div className="input-container">
                <input className={!orderForm.street.valid && orderForm.street.touched ? 'error' : null} name="street" type="text" placeholder="Street"
                    onChange={(event) => this.inputChange(event)} value={orderForm.street.value} />
            </div>
            <div className="input-container">
                <input className={!orderForm.pinCode.valid && orderForm.pinCode.touched ? 'error' : null} name="pinCode" type="text" placeholder="Pin Code"
                    onChange={(event) => this.inputChange(event)} value={orderForm.pinCode.value} />
            </div>
            <div className="input-container">
                <input className={!orderForm.country.valid && orderForm.country.touched ? 'error' : null} name="country" type="text" placeholder="Country"
                    onChange={(event) => this.inputChange(event)} value={orderForm.country.value} />
            </div>
            <div className="input-container">
                <input className={!orderForm.emailAddress.valid && orderForm.emailAddress.touched ? 'error' : null} name="emailAddress" type="email" placeholder="Your email"
                    onChange={(event) => this.inputChange(event)} value={orderForm.emailAddress.value} />
            </div>
            <div className="input-container">
                <select name="deliveryMethod" value={orderForm.deliveryMethod.value} onChange={(event) => this.inputChange(event)}>
                    <option value='fastest'>Fastest</option>
                    <option value='cheapest'>Cheapest</option>
                </select>
            </div>
            <Button disabled={!this.state.formIsValid} buttonType="Success">ORDER</Button>
        </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className="contact-data">
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;