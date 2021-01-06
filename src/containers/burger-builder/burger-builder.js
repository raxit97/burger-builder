import React, { Component, Fragment } from "react";
import BuildControls from "../../components/burger/build-controls/build-controls";
import Burger from "../../components/burger/burger";
import Modal from "../../components/common/modal/modal";
import OrderSummaryModal from "../../components/modals/order-summary-modal/order-summary-modal";
import { INGREDIENT_PRICES } from "../../constants/ingredient-prices";
import BurgerIngredientContext from "../../context/burger-ingredient-context";

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            alooPatty: 0,
            sauce: 0
        },
        totalPrice: 30,
        purchasable: false,
        purchasing: false
    };

    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    purchasingOrder = () => {
        this.setState({
            purchasing: true
        });
    }

    cancelOrder = () => {
        this.setState({
            purchasing: false
        });
    }

    continueOrder = () => {
        alert('You continued!!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = this.state.ingredients[key] <= 0;
        }
        return (
            <Fragment>
                <Modal modalClosed={this.cancelOrder} show={this.state.purchasing} >
                    <OrderSummaryModal
                        price={this.state.totalPrice}
                        purchaseCanceled={this.cancelOrder}
                        purchaseContinued={this.continueOrder}
                        ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerIngredientContext.Provider value={{
                    addIngredient: this.addIngredient,
                    removeIngredient: this.removeIngredient,
                    disabledInfo: disabledInfo
                }}>
                    <BuildControls
                        purchased={this.purchasingOrder}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice} />
                </BurgerIngredientContext.Provider>
            </Fragment>
        );
    }

}

export default BurgerBuilder;
