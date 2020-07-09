import {Product} from "./product";

export class ProductLogic{

    private _products: Array<Product>;

    constructor(){
        this._products = new Array<Product>();
    }

    getAllProducts(): Array<Product>{
        return this._products;
    }

    getProductsByCategory(category: string): Array<Product>{
        return this._products.filter(product => product.Category == category);
    }

    getProductsByManufacturer(manufacturer: string): Array<Product>{
        return this._products.filter(product => product.Manufacturer == manufacturer);
    }

    create(product: Product): string
    {
        if(this.isDuplicate(product.ProductId))
        {
            return "ProductId must be unique";
        }
        try {
            this._products.push(product);
        } catch (error) {
            return error;
        }

        return "Product created successfully";
    }

    isDuplicate(productId: string){
        return this._products.some(product => product.ProductId === productId);
    }

    update(productId: string, product: Product): string{
        var targetProduct = this._products.find(product => product.ProductId == productId);

        try {
            targetProduct.ProductName = product.ProductName;
            targetProduct.Category = product.Category;
            targetProduct.Manufacturer = product.Manufacturer;
            targetProduct.Description = product.Description;
            targetProduct.Price = product.Price;
        } catch (error) {
            return error;
        }

        return "Product updated successfully";
    }

    delete(productId: string): string{
        var index = this._products.indexOf(this._products.find(product => product.ProductId == productId));

        if(index == -1){
            return "Product does not exist";
        }
        else{
            this._products.splice(index, 1);
            return "Product deleted successfully";
        }
    }
}
