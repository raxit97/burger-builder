import React, { Component, Fragment } from "react";
import BuildControls from "../../components/burger/build-controls/build-controls";
import Burger from "../../components/burger/burger";
import Modal from "../../components/common/modal/modal";
import OrderSummaryModal from "../../components/modals/order-summary-modal/order-summary-modal";
import { INGREDIENT_PRICES } from "../../constants/ingredient-prices";
import BurgerIngredientContext from "../../context/burger-ingredient-context";
import Spinner from '../../components/common/spinner/spinner';
import axios from '../../http/axios-orders';
import errorHandler from "../../components/common/error-handler/error-handler";

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 30,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    async componentDidMount() {
        try {
            if (!this.state.ingredients) {
                const response = await axios.get('/ingredients.json');
                this.setState({ ingredients: response.data });
            } 
        } catch (error) {
            this.setState({
                error: true
            });
        }
    }

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

    continueOrder = async () => {
        const queryParams = [];
        for (let ingredient in this.state.ingredients) {
            queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = this.state.ingredients[key] <= 0;
        }
        let orderSummary = null;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        let burger = this.state.error ? <p>Ingredients can't be loaded. Something went wrong!!</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BurgerIngredientContext.Provider value={{
                        addIngredient: this.addIngredient,
                        removeIngredient: this.removeIngredient,
                        disabledInfo: disabledInfo
                    }}>
                        <BuildControls purchased={this.purchasingOrder} purchasable={this.state.purchasable}
                            price={this.state.totalPrice} />
                    </BurgerIngredientContext.Provider>
                </Fragment>
            );
            orderSummary = <OrderSummaryModal price={this.state.totalPrice} purchaseCanceled={this.cancelOrder}
                purchaseContinued={this.continueOrder} ingredients={this.state.ingredients} />;
        }
        return (
            <Fragment>
                <Modal modalClosed={this.cancelOrder} show={this.state.purchasing} >
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }

}

export default errorHandler(BurgerBuilder, axios);
