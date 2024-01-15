const fs = require("fs");

class ProductManager {
  static lastId = 0;
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProducts({ title, description, price, thumbnail, code, stock }) {
    const newArray = await this.readArchive();
    console.log(newArray);
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los datos tienen que estar completos");
      return;
    }
    if (newArray.find((items) => items.code === code)) {
      console.log("ingresa un codigo distinto");
      return;
    }

    const newProduct = {
      id: ++ProductManager.lastId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    newArray.push(newProduct);
    this.saveArchive(newArray);
  }

  async getProducts() {
    return await this.readArchive();
  }

  async getProductById(id) {
    try {
      const newArray = await this.readArchive();
      const product = await newArray.find((item) => item.id === id);
      if (!product) {
        console.log("ID no se encuentra en Data");
      }
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  //desafio 2 entregable
  async updateProduct(id, newInformation) {
    try {
      const newArray = await this.readArchive();
      const productAfterUpdate = newArray.map((produc) =>
        produc.id === id ? { ...produc, ...newInformation } : produc
      );
      this.saveArchive(productAfterUpdate);
    } catch (error) {
      console.error("error al actualizar", error);
    }
  }

  async deleteProduct(id) {
    try {
      const newArray = await this.readArchive();
      const productsAfterDelete = newArray.filter((produc) => produc.id !== id);
      this.saveArchive(productsAfterDelete);
    } catch (error) {
      console.log("error al eliminar", error);
    }
  }

  async readArchive() {
    try {
      const answer = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(answer);
      return result;
    } catch (error) {
      // console.log("error al leer archivo", error);
      return this.products;
    }
  }

  async saveArchive(newArray) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, 2));
    } catch (error) {
      console.log("Error en guardar el archivo!!", error);
    }
  }
}
const path = "./product-data.json";
const listProducts = new ProductManager(path);

const product1 = {
  title: "Pimientos Rojos",
  description: "Pimientos rojos dulces y jugosos.",
  price: 0.5,
  thumbnail: "vegetable-4.png",
  code: "PR9",
  stock: 104,
};
// Test clase
async function myTest() {
  await listProducts.addProducts(product1);

  const response = await listProducts.readArchive();
  console.log(response);

  // const deleteProduct = await listProducts.deleteProduct(6);
  // console.log(deleteProduct);

  // let updateinformation = {
  //   price: 0.5,
  //   stock: 104,
  // };

  // const updateProducto = await listProducts.updateProduct(9, updateinformation);
  // console.log(updateProducto);
}

//Ejecuto el test.
myTest();
