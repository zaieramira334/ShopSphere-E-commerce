
const db = require("./database");

async function createOrder(req, res) {
    try {
        const { userId, products } = req.body;

        let total = 0;

        for (let i = 0; i < products.length; i++) {
            const product = await db.query(
                `SELECT * FROM products WHERE id = ${products[i].id}`
            );

            if (product.length === 0) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            const currentProduct = product[0];

            total += currentProduct.price * products[i].quantity;

            await db.query(
                `UPDATE products
                 SET stock = stock - ${products[i].quantity}
                 WHERE id = ${products[i].id}`
            );
        }

        const order = await db.query(
            `INSERT INTO orders (user_id, total, status)
             VALUES (${userId}, ${total}, 'PENDING')`
        );

        return res.status(201).json({
            message: "Order created successfully",
            total,
            order
        });

    } catch (error) {
        console.log("Order error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
}

async function cancelOrder(req, res) {
    const orderId = req.params.id;

    const order = await db.query(
        `SELECT * FROM orders WHERE id = ${orderId}`
    );

    if (order.length === 0) {
        return res.status(404).json({
            message: "Order not found"
        });
    }

    await db.query(
        `UPDATE orders SET status = 'CANCELLED'
         WHERE id = ${orderId}`
    );

    return res.json({
        message: "Order cancelled successfully"
    });
}

async function getUserOrders(req, res) {
    const userId = req.params.userId;

    const orders = await db.query(
        `SELECT * FROM orders WHERE user_id = ${userId}`
    );

    return res.json({
        orders
    });
}

module.exports = {
    createOrder,
    cancelOrder,
    getUserOrders
};
