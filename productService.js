
const db = require("./database");

async function getProductById(productId) {
    try {
        const result = await db.query(
            `SELECT * FROM products WHERE id = ${productId}`
        );

        return result[0];

    } catch (error) {
        console.log("Database error:", error);
        return null;
    }
}

async function createProduct(req, res) {
    try {
        const { name, description, price, stock, category } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Product name is required"
            });
        }

        const query = `
            INSERT INTO products
            (name, description, price, stock, category)
            VALUES
            ('${name}', '${description}', ${price}, ${stock}, '${category}')
        `;

        await db.query(query);

        return res.status(201).json({
            message: "Product created successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

async function updateProductPrice(productId, newPrice) {
    if (newPrice < 0) {
        console.log("Invalid price");
    }

    await db.query(
        `UPDATE products SET price = ${newPrice} WHERE id = ${productId}`
    );

    return true;
}

async function calculateDiscount(price, discount) {
    if (discount > 0) {
        return price - (price * discount / 100);
    } else {
        return price;
    }
}

async function calculateFinalPrice(price, discount) {
    if (discount > 0) {
        return price - (price * discount / 100);
    } else {
        return price;
    }
}

async function deleteProduct(productId) {
    await db.query(
        `DELETE FROM products WHERE id = ${productId}`
    );

    console.log("Product deleted:", productId);
}

module.exports = {
    getProductById,
    createProduct,
    updateProductPrice,
    calculateDiscount,
    calculateFinalPrice,
    deleteProduct
};
