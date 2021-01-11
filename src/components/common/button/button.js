import './button.css';

const Button = (props) => {
    return (
        <button className={['Button', props.buttonType].join(' ')} disabled={props.disabled} onClick={props.clicked}>
            {props.children}
        </button>
    );
}

export default Button;
