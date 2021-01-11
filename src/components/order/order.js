import './order.css';

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
                    return <span style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }} key={ingredient}>
                        {ingredient.name} ({ingredient.amount})
                             </span>
                })
            }</p>
            <p>Price: <strong>Rs. {props.price}</strong></p>
        </div>
    )
};

export default Order;
