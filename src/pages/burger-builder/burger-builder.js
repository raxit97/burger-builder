import React, { Component, Fragment } from "react";
import BuildControls from "../../components/burger/build-controls/build-controls";
import Burger from "../../components/burger/burger";
import Modal from "../../components/common/modal/modal";
import OrderSummaryModal from "../../components/modals/order-summary-modal/order-summary-modal";
import BurgerIngredientContext from "../../context/burger-ingredient-context";
import Spinner from '../../components/common/spinner/spinner';
import { connect } from "react-redux";
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    async componentDidMount() {
        this.props.initIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    purchasingOrder = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    cancelOrder = () => {
        this.setState({
            purchasing: false
        });
    }

    continueOrder = async () => {
        this.props.purchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = this.props.ingredients[key] <= 0;
        }
        let orderSummary = null;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        let burger = this.props.error ? <p>Ingredients can't be loaded. Something went wrong!!</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BurgerIngredientContext.Provider value={{
                        addIngredient: (type) => this.props.addIngredient(type),
                        removeIngredient: (type) => this.props.removeIngredient(type),
                        disabledInfo: disabledInfo
                    }}>
                        <BuildControls
                            isAuthenticated={this.props.isAuthenticated}
                            purchased={this.purchasingOrder}
                            purchasable={this.updatePurchaseState(this.props.ingredients)}
                            price={this.props.totalPrice} />
                    </BurgerIngredientContext.Provider>
                </Fragment>
            );
            orderSummary = <OrderSummaryModal price={this.props.totalPrice} purchaseCanceled={this.cancelOrder}
                purchaseContinued={this.continueOrder} ingredients={this.props.ingredients} />;
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        removeIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        initIngredients: () => dispatch(actions.initIngredients()),
        purchaseInit: () => dispatch(actions.purchaseInit()),
        setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
