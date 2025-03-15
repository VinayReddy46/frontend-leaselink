import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';  // Import useLocation
import { useHandlePaymentSuccessMutation } from '../../redux/services/paymentSlice';
import { useSelector } from 'react-redux';

const PaymentSuccessPage = ({ onClose }) => {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const [handlePaymentSuccess] = useHandlePaymentSuccessMutation();
    const { userInfo } = useSelector(state => state.auth);
    const userId = userInfo?.id || userInfo?.user?.id;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cartId = queryParams.get('cartId');
    const sessionId = queryParams.get('sessionId');

    useEffect(() => {
        if (cartId && sessionId) {
            handlePaymentSuccess({ cartId, sessionId, userId })
                .then(() => {
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Payment success handling failed:', error);
                });
        }

        const timer = setTimeout(() => {
            setShow(false);
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [cartId, sessionId, handlePaymentSuccess, onClose, navigate]);

    const handleNavigate = () => {
        navigate('/');  // Again, you can change this to '/my-orders' if you prefer
    };

    return (
        <div style={{
            padding: '20px',
            textAlign: 'center',
            minHeight: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {show && (
                <div>
                    <h2>Payment Successful</h2>
                    <p>Your payment has been processed successfully. Thank you for your purchase!</p>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleNavigate}
                    >
                        Go to My Orders
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccessPage;
