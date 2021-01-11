import { Component, Fragment } from "react";
import Modal from "../modal/modal";

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        };

        errorConfirmed = () => {
            this.setState({ error: null });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        render() {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({ error: null });
                return request;
            });
            this.responseInterceptor =  axios.interceptors.response.use(response => response, error => {
                this.setState({ error: error });
            });
            return (
                <Fragment>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmed}>
                        { this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
        }
    };
};

export default errorHandler;
