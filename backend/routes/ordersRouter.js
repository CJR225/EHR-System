
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
        // Map each order to convert snake_case to camelCase
        const formattedOrders = orders.map(order => ({
            orderId: order.order_id,
            description: order.description,
            visibleToStudents: order.visible_to_students // Make sure to convert this
        }));
        res.json(formattedOrders);
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

router.delete('/:patientId/orders/:orderId', async (req, res) => {
    try {
        const { patientId, orderId } = req.params;
        const result = await Orders.destroy({
            where: { patient_id: patientId, order_id: orderId }
        });
        if (result > 0) {
            res.send('Order deleted successfully');
        } else {
            res.status(404).send('Order not found');
        }
    } catch (error) {
        console.error('Failed to delete order:', error);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE endpoint to remove all orders for a specific patient
router.delete('/:patientId/orders', async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const result = await Orders.destroy({
            where: { patient_id: patientId }
        });
        if (result > 0) {
            res.send('All orders for the patient have been deleted successfully');
        } else {
            res.status(404).send('No orders found for this patient');
        }
    } catch (error) {
        console.error('Failed to delete orders:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.put('/:patientId/orders/:orderId/visibility', async (req, res) => {
    try {
        const patientId = parseInt(req.params.patientId); // Make sure patientId is an integer
        const orderId = req.params.orderId; // orderId is a string
        const { visibleToStudents } = req.body; // Ensure this is correctly parsed as a boolean

        // Updating the order visibility
        const result = await Orders.update(
            { visible_to_students: visibleToStudents },
            { where: { patient_id: patientId, order_id: orderId } }
        );

        if (result[0] > 0) {  // Sequelize update returns an array with the count of affected rows
            // Fetch the updated order
            const updatedOrder = await Orders.findOne({
                where: { patient_id: patientId, order_id: orderId }
            });

            res.json(updatedOrder);
        } else {
            res.status(404).send('Order not found');
        }
    } catch (error) {
        console.error('Failed to update order visibility:', error);
        res.status(500).send('Internal Server Error');
    }
});






module.exports = router;