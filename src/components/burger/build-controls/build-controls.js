import { BURGER_INGREDIENTS_BUILD_CONTROLS } from '../../../constants/burger-ingredients';
import BuildControl from './build-control/build-control';
import './build-controls.css'

const BuildControls = (props) => {
    return (
        <div className="BuildControls">
            <p>Current Price: <strong>{props.price}</strong></p>
            {
                BURGER_INGREDIENTS_BUILD_CONTROLS.map((buildControl) => {
                    return <BuildControl type={buildControl.type}
                        key={buildControl.label} ingredientLabel={buildControl.label} />
                })
            }
            <button disabled={!props.purchasable}
                className="OrderButton"
                onClick={props.purchased}>ORDER NOW</button>
        </div>
    )
};

export default BuildControls;
