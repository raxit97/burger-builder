import { Component } from "react";
import Button from "../../components/common/button/button";
import './auth.css';
import * as ACTIONS from '../../store/actions/index';
import { connect } from "react-redux";
import Spinner from "../../components/common/spinner/spinner";
import { Redirect, withRouter } from "react-router";
import { updateObject } from "../../utilities/app-utility";
import { checkValidity } from "../../utilities/validation-utility";
class Auth extends Component {

    state = {
        controls: {
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
            }
        },
        isSignUp: false
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.setAuthRedirectPath();
        }
        if (this.props.isAuthenticated) {
            this.props.history.replace('/');
        }
    }

    inputChange = (event) => {
        const updatedControls = updateObject(this.state.controls, {
            [event.target.name]: updateObject(this.state.controls[event.target.name], {
                ...this.state.controls[event.target.name],
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, this.state.controls[event.target.name].validation)
            })
        });
        this.setState({ controls: updatedControls });
    };

    switchAuthMode = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
        });
    }

    authenticate = (event) => {
        event.preventDefault();
        this.props.authenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    render() {
        const signInForm = this.state.controls;
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }

        let authSuccessRedirect = null;
        if (this.props.isAuthenticated) {
            authSuccessRedirect = <Redirect to={this.props.authRedirectPath} />;
        }
        return (
            <div className="auth">
                {authSuccessRedirect}
                {errorMessage}
                {this.props.loading ? <Spinner /> :
                    <form onSubmit={this.authenticate}>
                        <div className="input-container">
                            <input type="email" placeholder="Email Address" value={signInForm.email.value}
                                name="email" onChange={this.inputChange}
                                className={!signInForm.email.valid && signInForm.email.touched ? 'error' : null} />
                        </div>
                        <div className="input-container">
                            <input type="password" placeholder="Password" value={signInForm.password.value}
                                name="password" onChange={this.inputChange}
                                className={!signInForm.password.valid && signInForm.password.touched ? 'error' : null} />
                        </div>
                        <Button buttonType="Success">{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
                        <Button clicked={this.switchAuthMode} buttonType="Danger">Switch to {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
                    </form>
                }
            </div>
        )
    }

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
