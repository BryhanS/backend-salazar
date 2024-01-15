class ProductMangar {
  static lastId = 0;
  constructor() {
    this.products = [];
  }

  addProducts({ title, description, price, thumbnail, code, stock }) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los datos tienen que estar completos");
      return;
    }
    if (this.products.find((items) => items.code === code)) {
      console.log("ingresa un codigo distinto");
      return;
    }

    const newProduct = {
      id: ++ProductMangar.lastId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    console.log(newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      console.error("Producto No Encontrado,Intenta con otro ID");
    } else {
      console.log(product);
    }
  }

  //desafio 2 entregable
  updateProduct(id) {}
  deleteProduct(id) {
    const productsAfterDelete = this.products.filter(
      (produc) => produc.id !== id
    );

    this.products = productsAfterDelete;

    return this.products;
  }
}

const listProducts = new ProductMangar();



ejemplos de ingresos

const product = {
  title: "camote",
  description: "tuberculo",
  price: 2,
  thumbnail: "sin imgen",
  code: "codec",
  stock: 40,
};
const product2 = {
  title: "camoteAmarillo",
  description: "tuberculo",
  price: 5,
  thumbnail: "sin imgen",
  code: "codec2",
  stock: 30,
};

listProducts.addProducts(product);
listProducts.addProducts(product2);

