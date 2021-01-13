import axios from 'axios';

const AxiosOrders = axios.create({
    baseURL: 'https://react-burger-builder-505e6-default-rtdb.firebaseio.com/'
});

export default AxiosOrders;
