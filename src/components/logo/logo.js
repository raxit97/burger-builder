import burgerLogo from '../../assets/images/burger-logo.png';
import './logo.css';

const Logo = (props) => {
    return (
        <div className="Logo" style={{ height: props.height }}>
            <img src={burgerLogo} alt="Burger Builder Logo" />
        </div>
    );
};

export default Logo;
