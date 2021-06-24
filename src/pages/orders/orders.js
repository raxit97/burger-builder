import { useEffect } from "react";
import Order from '../../components/order/order';
import * as actions from '../../store/actions/index';
import { connect } from "react-redux";
import Spinner from '../../components/common/spinner/spinner'
import { withRouter } from "react-router-dom";

const Orders = (props) => {

    const { userId, idToken, fetchOrders } = props;
    useEffect(() => {
        fetchOrders(userId, idToken);
    }, [userId, idToken, fetchOrders]);
    let orders = props.orders.map((order) => {
        return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
    });
    if (props.loading) {
        orders = <Spinner />;
    }
    return (
        <div>
            {orders}
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        userId: state.auth.userId,
        idToken: state.auth.idToken
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (userId, idToken) => dispatch(actions.fetchOrders(userId, idToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders));
