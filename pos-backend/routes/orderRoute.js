const express = require('express');
const { addOrder, getOrderById, getOrders, updateOrder } = require('../controllers/orderController');
const { isVerifiedUser } = require('../middlewares/tokenVerification');
const router = express.Router();

router.route('/').post(isVerifiedUser, addOrder);
router.route('/:id').get(isVerifiedUser, getOrderById);
router.route('/').get(isVerifiedUser, getOrders);
router.route('/:id').put(isVerifiedUser, updateOrder);

module.exports = router;