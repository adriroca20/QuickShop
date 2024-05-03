import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { Message } from '../../components/Message';
import {Loader} from '../../components/Loader';
import { useGetOrdersQuery } from '../../state/slices/ordersApiSlice';
import { IOrder } from '../../interfaces/IOrderItem';
const OrderListScreen = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery({});
    return (
        <>
            <h1>Orders</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {"Couldnt get orders"}
                </Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>CREATED AT</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order:IOrder) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    {order.paidAt ? (
                                        order.paidAt.toString().substring(0, 10)
                                    ) : (
                                        <FaTimes style={{ color: 'red' }} />
                                    )}
                                </td>
                                <td>
                                    {order.deliveredAt ? (
                                        order.deliveredAt.toString().substring(0, 10)
                                    ) : (
                                        <FaTimes style={{ color: 'red' }} />
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default OrderListScreen;