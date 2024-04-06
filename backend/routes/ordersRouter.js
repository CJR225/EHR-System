const express = require('express');
const router = express.Router();
const { models } = require('./database.js');
const { Orders } = models;


router.get('/:patientId/orders', async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const orders = await Orders.findAll({
            where: { patient_id: patientId }
        });
        res.json(orders);
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/:patientId/orders', async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const { order_id, description } = req.body;
        const newOrder = await Orders.create({
            patient_id: patientId,
            order_id,
            description
        });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Failed to create order:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:patientId/orders/:orderId', async (req, res) => {
    try {
        const { patientId, orderId } = req.params;
        const { description } = req.body;
        const order = await Orders.findOne({
            where: { patient_id: patientId, order_id: orderId }
        });
        if (order) {
            order.description = description;
            await order.save();
            res.json(order);
        } else {
            res.status(404).send('Order not found');
        }
    } catch (error) {
        console.error('Failed to update order:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;