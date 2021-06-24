import React, { Fragment, useCallback, useEffect, useState } from "react";
import BuildControls from "../../components/burger/build-controls/build-controls";
import Burger from "../../components/burger/burger";
import Modal from "../../components/common/modal/modal";
import OrderSummaryModal from "../../components/modals/order-summary-modal/order-summary-modal";
import BurgerIngredientContext from "../../context/burger-ingredient-context";
import Spinner from '../../components/common/spinner/spinner';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions/index';

export const BurgerBuilder = (props) => {

    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();
    const initIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const addIngredient = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
    const removeIngredient = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
    const purchaseInit = () => dispatch(actions.purchaseInit());
    const setAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    const burgerBuilder = useSelector(state => state.burgerBuilder);
    const isAuthenticated = useSelector(state => state.auth.idToken !== null);

    useEffect(() => {
        initIngredients();
    }, [initIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    const purchasingOrder = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            setAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const cancelOrder = () => {
        setPurchasing(false);
    }

    const continueOrder = async () => {
        purchaseInit();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...burgerBuilder.ingredients
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = burgerBuilder.ingredients[key] <= 0;
    }
    let orderSummary = null;
    let burger = burgerBuilder.error ? <p>Ingredients can't be loaded. Something went wrong!!</p> : <Spinner />;
    if (burgerBuilder.ingredients) {
        burger = (
            <Fragment>
                <Burger ingredients={burgerBuilder.ingredients} />
                <BurgerIngredientContext.Provider value={{
                    addIngredient: (type) => addIngredient(type),
                    removeIngredient: (type) => removeIngredient(type),
                    disabledInfo: disabledInfo
                }}>
                    <BuildControls
                        isAuthenticated={isAuthenticated}
                        purchased={purchasingOrder}
                        purchasable={updatePurchaseState(burgerBuilder.ingredients)}
                        price={burgerBuilder.totalPrice} />
                </BurgerIngredientContext.Provider>
            </Fragment>
        );
        orderSummary = <OrderSummaryModal price={burgerBuilder.totalPrice} purchaseCanceled={cancelOrder}
            purchaseContinued={continueOrder} ingredients={burgerBuilder.ingredients} />;
    }
    return (
        <Fragment>
            <Modal modalClosed={cancelOrder} show={purchasing} >
                {orderSummary}
            </Modal>
            {burger}
        </Fragment>
    );

}

export default BurgerBuilder;
