import React from 'react';
import PropTypes from 'prop-types';
import './burger-ingredient.css';

const BurgerIngredient = (props) => {
    let ingredient = null;
    switch (props.type) {
        case 'bread-bottom':
            ingredient = <div className='BreadBottom'></div>;
            break;
        case 'bread-top':
            ingredient = (
                <div className='BreadTop'>
                    <div className='Seeds1'></div>
                    <div className='Seeds2'></div>
                </div>
            );
            break;
        case 'alooPatty':
            ingredient = <div className="AlooPatty"></div>;
            break;
        case 'cheese':
            ingredient = <div className="Cheese"></div>;
            break;
        case 'salad':
            ingredient = <div className="Salad"></div>;
            break;
        case 'sauce':
            ingredient = <div className="Sauce"></div>;
            break;
        default:
            ingredient = null;
            break;
    }
    return ingredient;
};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;
