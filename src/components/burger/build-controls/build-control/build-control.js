import { useContext } from 'react';
import BurgerIngredientContext from '../../../../context/burger-ingredient-context';
import './build-control.css'

const BuildControl = (props) => {
    const burgerIngredientContext = useContext(BurgerIngredientContext);
    return (
        <div className="BuildControl">
            <div className="Label">{props.ingredientLabel}</div>
            <button
                onClick={() => burgerIngredientContext.addIngredient(props.type)}
                className="More">More</button>
            <button
                onClick={() => burgerIngredientContext.removeIngredient(props.type)}
                disabled={burgerIngredientContext.disabledInfo[props.type]}
                className="Less">Less</button>
        </div>
    );
};

export default BuildControl;
