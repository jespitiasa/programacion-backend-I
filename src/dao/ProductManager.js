import fs from 'fs'

export class productManager {
    static #path = ''

    static setPath(filePath='') {
        this.#path = filePath
    }
    
    static async getProducts() {
        if (fs.existsSync(this.#path)) {
            return JSON.parse(await fs.promises.readFile(this.#path, {encoding: 'utf-8'}))
        } else {
            return []
        }
    }
    
    static async getProductsById(id) {
        const products = await this.getProducts()
        let product = products.find(prod => prod.id === id)
        return product
    }

    static async addProduct(product = {}) {
        if (!fs.existsSync(this.#path)) {
            await fs.promises.writeFile(this.#path, JSON.stringify(product))
        }
    }
    static async updateProduct(id, product) {
        const products = await this.getProducts()
        const index = products.findIndex(prod => prod.id === id)
        if (index !== -1) {
            products[index] = product
            await fs.promises.writeFile(this.#path, JSON.stringify(products))
        }
    }

    static async deleteProduct(id) {
        const products = await this.getProducts()
        const index = products.findIndex(prod => prod.id === id)
        if (index !== -1) {
            products.splice(index, 1)
            await fs.promises.writeFile(this.#path, JSON.stringify(products))
        }
    }
}