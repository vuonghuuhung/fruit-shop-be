module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        productId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: false
        },
        salePercent: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        salePrice: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
        },
    });
    return Product;
};