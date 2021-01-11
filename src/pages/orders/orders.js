import { Component } from "react";
import Order from '../../components/order/order';
import axios from 'axios';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    async componentDidMount() {
        try {
            const response = await axios.get('https://react-burger-builder-505e6-default-rtdb.firebaseio.com/orders.json');
            console.log(response.data);
            const fetchedOrders = []
            for (let key in response.data) {
                fetchedOrders.push({ ...response.data[key], id: key });
            }
            this.setState({ loading: false, orders: fetchedOrders });
        } catch (error) {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map((order) => {
                        return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                    })
                }
            </div>
        );
    }

}

export default Orders;
