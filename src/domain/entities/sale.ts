export class Sale {
  #id: string;
  #productId: string;
  #quantity: number;
  #salePrice: number;
  #saleDate: Date;

  constructor(
    id: string,
    productId: string,
    quantity: number,
    salePrice: number,
    saleDate: Date,
  ) {
    this.#id = id;
    this.#productId = productId;
    this.#quantity = quantity;
    this.#salePrice = salePrice;
    this.#saleDate = saleDate;

    this.#validate();
  }

  #validate() {
    if (this.#quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    if (this.#salePrice <= 0) {
      throw new Error("Sale price must be greater than 0");
    }

    if (Number.isNaN(this.#saleDate.getTime())) {
      throw new Error("Invalid date");
    }

    if (!this.#productId) {
      throw new Error("Product ID cannot be empty");
    }

    if (!this.#id) {
      throw new Error("Sale ID cannot be empty");
    }
  }

  changeQuantity(quantity: number) {
    this.#quantity = quantity;
    this.#validate();
  }

  changeSalePrice(salePrice: number) {
    this.#salePrice = salePrice;
    this.#validate();
  }

  changeSaleDate(saleDate: Date) {
    this.#saleDate = saleDate;
    this.#validate();
  }

  get id() {
    return this.#id;
  }

  get productId() {
    return this.#productId;
  }

  get quantity() {
    return this.#quantity;
  }

  get salePrice() {
    return this.#salePrice;
  }

  get saleDate() {
    return this.#saleDate;
  }
}
