import { INGREDIENT_PRICES } from "../../constants/ingredient-prices";
import { ACTION_TYPES } from "../actions/action-types";
import { updateObject } from "../../utilities/app-utility";

const initialState = {
    ingredients: null,
    totalPrice: 30,
    error: false,
    building: false
};

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.INIT_INGREDIENTS:
            return updateObject(state, { ingredients: action.ingredients, error: false, totalPrice: 30, building: false });
        case ACTION_TYPES.INIT_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        case ACTION_TYPES.ADD_INGREDIENT:
            return updateObject(state, { ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            });
        case ACTION_TYPES.REMOVE_INGREDIENT:
            if (state.ingredients[action.ingredientName] === 0) {
                return state;
            }
            return updateObject(state, { ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            });
        default:
            return state;
    }
};

export default burgerBuilderReducer;
