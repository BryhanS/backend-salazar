const { faker } = require("@faker-js/faker");
const generateProducts = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: parseInt(faker.string.numeric()),
    description: faker.commerce.productDescription(),
  };
};
module.exports = generateProducts;
