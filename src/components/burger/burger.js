import BurgerIngredient from './burger-ingredient/burger-ingredient';
import './burger.css';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map((ingredient) => {
            return [...Array(props.ingredients[ingredient])].map((_, ingredientIndex) => {
                return <BurgerIngredient key={ingredient + ingredientIndex} type={ingredient}/>
            });
        })
        .reduce((prevValue, currentValue) => {
            return prevValue.concat(currentValue);
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add some ingredients</p>;
    }
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;
