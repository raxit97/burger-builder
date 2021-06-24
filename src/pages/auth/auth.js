import { useEffect, useState } from "react";
import Button from "../../components/common/button/button";
import './auth.css';
import * as ACTIONS from '../../store/actions/index';
import { connect } from "react-redux";
import Spinner from "../../components/common/spinner/spinner";
import { Redirect, withRouter } from "react-router";
import { updateObject } from "../../utilities/app-utility";
import { checkValidity } from "../../utilities/validation-utility";
const Auth = (props) => {

    const [authForm, setAuthForm] = useState({
        email: {
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
    });
    const [isSignUp, setIsSignUp] = useState(false);

    const { buildingBurger, authRedirectPath, setAuthRedirectPath } = props;
    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            setAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, setAuthRedirectPath]);

    const inputChange = (event) => {
        const updatedControls = updateObject(authForm, {
            [event.target.name]: updateObject(authForm[event.target.name], {
                ...authForm[event.target.name],
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, authForm[event.target.name].validation)
            })
        });
        setAuthForm(updatedControls);
    };

    const switchAuthMode = (event) => {
        event.preventDefault();
        setIsSignUp(prevState => !prevState);
    }

    const authenticate = (event) => {
        event.preventDefault();
        props.authenticate(authForm.email.value, authForm.password.value, isSignUp);
    }
    let errorMessage = null;
    if (props.error) {
        errorMessage = <p>{props.error.message}</p>;
    }

    let authSuccessRedirect = null;
    if (props.isAuthenticated) {
        authSuccessRedirect = <Redirect to={props.authRedirectPath} />;
    }
    return (
        <div className="auth">
            {authSuccessRedirect}
            {errorMessage}
            {props.loading ? <Spinner /> :
                <form onSubmit={authenticate}>
                    <div className="input-container">
                        <input type="email" placeholder="Email Address" value={authForm.email.value}
                            name="email" onChange={inputChange}
                            className={!authForm.email.valid && authForm.email.touched ? 'error' : null} />
                    </div>
                    <div className="input-container">
                        <input type="password" placeholder="Password" value={authForm.password.value}
                            name="password" onChange={inputChange}
                            className={!authForm.password.valid && authForm.password.touched ? 'error' : null} />
                    </div>
                    <Button buttonType="Success">{isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
                    <Button clicked={switchAuthMode} buttonType="Danger">Switch to {isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
                </form>
            }
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.idToken !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (email, password, isSignUp) => dispatch(ACTIONS.auth(email, password, isSignUp)),
        setAuthRedirectPath: () => dispatch(ACTIONS.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
