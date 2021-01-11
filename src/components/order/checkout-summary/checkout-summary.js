import Burger from "../../burger/burger"
import Button from "../../common/button/button";
import './checkout-summary.css';

const CheckoutSummary = (props) => {
    return (
        <div className="checkout-summary">
            <h1>We hope it tastes well!!</h1>
            <div className="burger-container">
                <Burger ingredients={props.ingredients} />
            </div>
            <Button clicked={props.checkoutCancelled} buttonType="Danger">CANCEL</Button>
            <Button clicked={props.checkoutContinued} buttonType="Success">CONTINUE</Button>
        </div>
    );
};

export default CheckoutSummary;
