import axios from '../../utilities/axios-orders';
import { ACTION_TYPES } from './action-types';

export const initIngredients = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/ingredients.json');
            dispatch(setIngredients(response.data));
        } catch (error) {
            dispatch(initIngredientsFailed());
        }
    };
}

export const setIngredients = (ingredients) => {
    return {
        type: ACTION_TYPES.INIT_INGREDIENTS,
        ingredients: ingredients
    };
}

export const initIngredientsFailed = () => {
    return {
        type: ACTION_TYPES.INIT_INGREDIENTS_FAILED
    };
}

export const addIngredient = (ingredientName) => {
    return {
        type: ACTION_TYPES.ADD_INGREDIENT,
        ingredientName: ingredientName
    };
};

export const removeIngredient = (ingredientName) => {
    return {
        type: ACTION_TYPES.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    };
};
