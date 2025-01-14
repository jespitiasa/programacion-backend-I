import fs from "fs";

export class productManager {
  static #path = "";

  static setPath(filePath = "") {
    this.#path = filePath;
  }

  static async getProducts() {
    if (fs.existsSync(this.#path)) {
      return JSON.parse(
        await fs.promises.readFile(this.#path, { encoding: "utf-8" })
      );
    } else {
      return [];
    }
  }

  static async getProductsById(id) {
    const products = await this.getProducts();
    let product = products.find((prod) => prod.id === id);
    return product;
  }

  static async addProduct(product) {
    try {
      const products = await this.getProducts();
      products.push(product);
      await fs.promises.writeFile(
        this.#path,
        JSON.stringify(products, null, 2)
      );
    } catch (error) {
      throw new Error("Error adding product");
    }
  }
  static async updateProduct(id, product) {
    const products = await this.getProducts();
    const index = products.findIndex((prod) => prod.id === id);
    if (index !== -1) {
      products[index] = product;
      await fs.promises.writeFile(
        this.#path,
        JSON.stringify(products, null, 2)
      );
    }
  }

  static async deleteProduct(id) {
    const products = await this.getProducts();
    const index = products.findIndex((prod) => prod.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      await fs.promises.writeFile(
        this.#path,
        JSON.stringify(products, null, 2)
      );
      return true;
    }
    return false;
  }
}