import React from 'react';

const BurgerIngredientContext = React.createContext({
    addIngredient: () => {},
    removeIngredient: () => {},
    disabledInfo: {}
});

export default BurgerIngredientContext;
