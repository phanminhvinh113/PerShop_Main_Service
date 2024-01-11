import { ProductType } from '../../models.mongo/interface.model'
import { ProductModel, ClothingModel, ElectronicModel, FurnitureModel, LaptopModel, PhoneModel } from '../../models.mongo/product.model'
import { BadRequestError } from '../../core/error.response'
import { StatusCode, TypeProduct } from '../../utils/constant'
import {
   findAllDaftForShop,
   publicProductByShop,
   findAllPublicForShop,
   findAllProduct,
   searchProduct,
} from '../../models.mongo/repositories/product.repo'
import { Types } from 'mongoose'
import { insertInvProduct } from '../../models.mongo/repositories/inventory.repo'
import { producerQueueProduct } from '../../event/product/rabbitmq/producer'

type productRegistryType = { [key: string]: any }
//
interface getAllProductType {
   limit: number
   skip: number
   page: number
   sort: string
   filter: object
   select: string[] | number[]
}
// PRODUCT FACTORY
class ProductFactory {
   //
   private static productRegistry: productRegistryType = {}
   //
   public static registerProductType(type: string, classRef: any) {
      ProductFactory.productRegistry[type] = classRef
   }

   //
   async createProduct(type: string, payload: any) {
      if (!type || !payload) throw new BadRequestError('Missing Parameters')
      //
      const productClass: any = ProductFactory.productRegistry[type]
      if (!productClass) throw new BadRequestError('Error Type')
      return new productClass(payload).createProduct()
   }
   // PUT
   async publicProductByShop(shop_id: string, product_id: string) {
      return await publicProductByShop(shop_id, product_id)
   }
   // PATCH
   // GET
   async searchProduct(keySearch: string) {
      return await searchProduct(keySearch)
   }
   //
   async findAllDaftForShop({ shop_id, skip = 0, limit = 0 }: { shop_id: string | undefined; skip: number; limit: number }) {
      const query = { shop_id, isDaft: true }
      return await findAllDaftForShop({ query, skip, limit })
   }
   //
   async findAllPublicForShop({ shop_id, skip = 0, limit = 0 }: { shop_id: string | undefined; skip: number; limit: number }) {
      const query = { shop_id, isPublic: true }
      return await findAllPublicForShop({ query, skip, limit })
   }
   //
   async findAllProduct(query: any) {
      const {
         limit = 60,
         sort = 'ctime',
         filter = { isPublic: true },
         page = 1,
         select = ['name', 'thumb', 'price', 'description', 'discount'],
      }: getAllProductType = query
      //
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         message: 'OK!',
         data: await findAllProduct({ limit, sort, filter, page, select }),
      }
   }
}

class Product {
   // define properties
   protected name: string
   protected type: string[] | string
   protected thumb: string
   protected description: string
   protected price: number
   protected quantity: number
   protected shop: string
   protected shop_id: string | number | object
   protected discount: number
   protected sold: number
   protected stock: number
   protected attributes: object
   protected isDaft: boolean
   protected isPublic: boolean
   protected product_rating: object | number
   protected product_variations: any
   protected location: string
   // constructor
   constructor({
      name,
      type,
      thumb,
      description,
      price,
      quantity,
      shop,
      discount,
      sold,
      stock,
      attributes,
      shop_id,
      product_rating,
      isDaft,
      isPublic,
      product_variations,
   }: ProductType) {
      this.name = name
      this.type = type
      this.thumb = thumb
      this.description = description
      this.price = price
      this.quantity = quantity
      this.shop = shop
      this.shop_id = shop_id
      this.discount = discount
      this.sold = sold
      this.stock = stock
      this.attributes = attributes
      this.isDaft = isDaft
      this.isPublic = isPublic
      this.product_rating = product_rating
      this.product_variations = product_variations
   }
   // Create New Product
   public async createProduct() {
      const product = await ProductModel.create(this)
      if (product) {
         const inventory = {
            productId: product._id,
            shopId: product.shop_id,
            location: this.location,
            stock: product.quantity,
         }
         await insertInvProduct(inventory)
         await producerQueueProduct({ msg: product })
      }
      return product
   }
   //
   async updateProduct(productId: string, bodyUpdate: object) {
      return await ProductModel.updateOne({ _id: new Types.ObjectId(productId) }, { $set: bodyUpdate }, { new: true })
   }
}

class Clothing extends Product {
   async createProduct() {
      if (!this.attributes) throw new BadRequestError('Missing Attributes')
      const newProduct = await super.createProduct()
      if (!newProduct) throw new BadRequestError('Failed Create  Product!')
      //
      const newClothing = await ClothingModel.create({
         ...this.attributes,
         _id: newProduct._id,
         shop_id: this.shop_id,
      })
      if (!newClothing) throw new BadRequestError('Failed Create Clothing Product!')
      //
      return newProduct
   }
}
class Electronic extends Product {
   async createProduct() {
      if (!this.attributes) throw new BadRequestError('Missing Attributes')
      const newProduct = await super.createProduct()
      if (!newProduct) throw new BadRequestError('Failed Create  Product!')
      //
      const newElectronic = await ElectronicModel.create({
         ...this.attributes,
         _id: newProduct._id,
         shop_id: this.shop_id,
      })
      if (!newElectronic) throw new BadRequestError('Failed Create Electronic Product!')
      //
      return newProduct
   }
}
class Furniture extends Product {
   async createProduct() {
      if (!this.attributes) throw new BadRequestError('Missing Attributes')
      const newProduct = await super.createProduct()
      if (!newProduct) throw new BadRequestError('Failed Create  Product!')
      //
      const newFurniture = await FurnitureModel.create({
         ...this.attributes,
         _id: newProduct._id,
         shop_id: this.shop_id,
      })
      if (!newFurniture) throw new BadRequestError('Failed Create Furniture Product!')
      //
      return newProduct
   }
}
//
class Laptop extends Product {
   async createProduct() {
      //
      if (!this.attributes) throw new BadRequestError('Missing Attributes')
      const newProduct = await super.createProduct()
      //
      if (!newProduct) throw new BadRequestError('Failed Create  Product!')
      //
      const newLaptop = await LaptopModel.create({
         ...this.attributes,
         _id: newProduct._id,
         shop_id: this.shop_id,
      })
      if (!newLaptop) throw new BadRequestError('Failed Create Laptop Product!')
      //
      return newProduct
   }
}
//
class Phone extends Product {
   async createProduct() {
      if (!this.attributes) throw new BadRequestError('Missing Attributes')
      const newProduct = await super.createProduct()
      if (!newProduct) throw new BadRequestError('Failed Create  Product!')
      //
      const newLaptop = await PhoneModel.create({
         ...this.attributes,
         _id: newProduct._id,
         shop_id: this.shop_id,
      })
      if (!newLaptop) throw new BadRequestError('Failed Create PhoneProduct!')
      //
      return newProduct
      //
   }
}
//
ProductFactory.registerProductType(TypeProduct.Electronic, Electronic)
ProductFactory.registerProductType(TypeProduct.Clothing, Clothing)
ProductFactory.registerProductType(TypeProduct.Furniture, Furniture)
ProductFactory.registerProductType(TypeProduct.Laptop, Laptop)
ProductFactory.registerProductType(TypeProduct.Phone, Phone)
//
export default new ProductFactory()
