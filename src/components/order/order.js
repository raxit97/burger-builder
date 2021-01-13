import './order.scss';

const Order = (props) => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        });
    }

    return (
        <div className="order">
            <p>Ingredients: {
                ingredients.map((ingredient) => {
                    return (
                        <span className="ingredient" key={ingredient.name}>
                            {ingredient.name} ({ingredient.amount})
                        </span>
                    );
                })
            }</p>
            <p>Price: <strong>Rs. {props.price}</strong></p>
        </div>
    )
};

export default Order;
