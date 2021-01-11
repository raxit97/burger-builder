import { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/order/checkout-summary/checkout-summary";
import ContactData from "./contact-data/contact-data";

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.ingredients) {
            const query = new URLSearchParams(props.location.search);
            const ingredients = {};
            let price = 0;
            for (let param of query.entries()) {
                if (param[0] === 'price') {
                    price = Number(param[1]);
                } else {
                    ingredients[param[0]] = Number(param[1]);
                }
            }
            return {
                ingredients: ingredients,
                totalPrice: price
            };
        } else {
            return state;
        }
    }

    continueCheckout = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    cancelCheckout = () => {
        this.props.history.goBack();
    };

    render() {
        return (
            <div className="checkout">
                <CheckoutSummary checkoutCancelled={this.cancelCheckout}
                    checkoutContinued={this.continueCheckout}
                    ingredients={this.state.ingredients} />
                <Route path={this.props.match.url + '/contact-data'}
                    render={(props) => (<ContactData {...props} price={this.state.totalPrice} ingredients={this.state.ingredients} />)} />
            </div>
        );
    }

}

export default Checkout;
