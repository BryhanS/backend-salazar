class ProductMangar {
  static lastId = 0;
  constructor() {
    this.products = [];
  }

  addProducts(title, description, price, thumbnail, code, stock) {
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
}

const listProducts = new ProductMangar();
