import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import CheckoutSummary from "../../components/order/checkout-summary/checkout-summary";
const ContactData = React.lazy(() => import('./contact-data/contact-data'));

const Checkout = (props) => {

    const continueCheckout = () => {
        props.history.replace('/checkout/contact-data');
    };

    const cancelCheckout = () => {
        props.history.goBack();
    };

    let summary = <Redirect to="/" />;
    if (props.ingredients) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
        summary = (
            <div className="checkout">
                {purchasedRedirect}
                <CheckoutSummary checkoutCancelled={cancelCheckout}
                    checkoutContinued={continueCheckout}
                    ingredients={props.ingredients} />
                <Route path={props.match.url + '/contact-data'}
                    render={() => (
                        <Suspense fallback={<div>Loading...</div>}><ContactData {...props} /></Suspense>
                    )} />
            </div>
        )
    }
    return summary;

}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(withRouter(Checkout));
