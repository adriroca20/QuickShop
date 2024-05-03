import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useGetMyOrdersQuery } from '../state/slices/ordersApiSlice';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { useEffect } from 'react';
import { IOrder } from '@/interfaces/IOrderItem';
import { Link } from 'react-router-dom';

export const MyOrdersScreen = () => {
    const { data, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery({});
    const orders:IOrder[] = data;
    return loadingOrders ? (
        <Loader />
    ) : errorOrders ? (
        <Message variant='danger'>An error happened</Message>
    ) : 
    orders.length === 0 ? (
        <main className='d-flex flex-column justify-content-center align-items-center'>
            <Message variant='info'>You have no orders yet</Message>
            <Link to="/" className="btn btn-light my-3">Go back to home page</Link>
        </main>
    ) :
    (
       <main>
              <h1>My Orders</h1>
              <Row className='row-gap-3'>
                {orders.map((order) => (
                     <Col key={order._id} md={6}>
                          <Card>
                            <ListGroup variant='flush'>
                                 <ListGroup.Item>
                                      <h2>Order {order._id}</h2>
                                 </ListGroup.Item>
                                 <ListGroup.Item>
                                      <h2>Total: ${order.totalPrice}</h2>
                                 </ListGroup.Item>
                                 <ListGroup.Item>
                                      {order.isPaid ? (
                                        <Message variant='success'>Paid on {order.paidAt}</Message>
                                      ) : (
                                        <Message variant='danger'>Not paid</Message>
                                      )}
                                 </ListGroup.Item>
                                 <ListGroup.Item>
                                      {order.isDelivered ? (
                                        <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                      ) : (
                                        <Message variant='danger'>Not delivered</Message>
                                      )}
                                 </ListGroup.Item>
                                 <ListGroup.Item>
                                      <Link to={`/order/${order._id}`} className='btn btn-light'>Details</Link>
                                 </ListGroup.Item>
                            </ListGroup>
                          </Card>
                     </Col>
                ))}
              </Row>
       </main>
    );
}