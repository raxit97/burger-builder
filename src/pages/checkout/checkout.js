import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import CheckoutSummary from "../../components/order/checkout-summary/checkout-summary";
// import ContactData from "./contact-data/contact-data";
const ContactData = React.lazy(() => import('./contact-data/contact-data'));

class Checkout extends Component {

    continueCheckout = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    cancelCheckout = () => {
        this.props.history.goBack();
    };

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div className="checkout">
                    {purchasedRedirect}
                    <CheckoutSummary checkoutCancelled={this.cancelCheckout}
                        checkoutContinued={this.continueCheckout}
                        ingredients={this.props.ingredients} />
                    <Route path={this.props.match.url + '/contact-data'}
                        render={() =>(
                            <Suspense fallback={<div>Loading...</div>}><ContactData {...this.props} /></Suspense>
                        )} />
                </div>
            )
        }
        return summary;
    }

}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(withRouter(Checkout));
