import { Fragment } from "react";
import Button from "../../common/button/button";

const OrderSummaryModal = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map((ingredient) => {
        return (
            <li key={ingredient}>
                <span className="ingredient-label">{ingredient}</span>: {props.ingredients[ingredient]}
            </li>
        );
    });
    return (
        <Fragment>
            <h3>Your Order: </h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Total Price: <strong>{props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.purchaseCanceled} buttonType='Danger'>
                CANCEL
            </Button>
            <Button clicked={props.purchaseContinued} buttonType='Success'>
                CONTINUE
            </Button>
        </Fragment>
    )
};

export default OrderSummaryModal;
