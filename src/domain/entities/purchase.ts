export class Purchase {
  #id: string;
  #productId: string;
  #supplierId: string;
  #quantity: number;
  #purchasePrice: number;
  #purchaseDate: Date;

  constructor(
    id: string,
    productId: string,
    supplierId: string,
    quantity: number,
    purchasePrice: number,
    purchaseDate: Date,
  ) {
    this.#id = id;
    this.#productId = productId;
    this.#supplierId = supplierId;
    this.#quantity = quantity;
    this.#purchasePrice = purchasePrice;
    this.#purchaseDate = purchaseDate;

    this.#validate();
  }

  #validate() {
    if (this.#quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    if (this.#purchasePrice <= 0) {
      throw new Error("Purchase price must be greater than 0");
    }

    if (Number.isNaN(this.#purchaseDate.getTime())) {
      throw new Error("Invalid date");
    }

    if (!this.#productId) {
      throw new Error("Product ID cannot be empty");
    }

    if (!this.#supplierId) {
      throw new Error("Supplier ID cannot be empty");
    }

    if (!this.#id) {
      throw new Error("Purchase ID cannot be empty");
    }
  }

  changeQuantity(quantity: number) {
    this.#quantity = quantity;
    this.#validate();
  }

  changePurchasePrice(purchasePrice: number) {
    this.#purchasePrice = purchasePrice;
    this.#validate();
  }

  changePurchaseDate(purchaseDate: Date) {
    this.#purchaseDate = purchaseDate;
    this.#validate();
  }

  get id() {
    return this.#id;
  }

  get productId() {
    return this.#productId;
  }

  get supplierId() {
    return this.#supplierId;
  }

  get quantity() {
    return this.#quantity;
  }

  get purchasePrice() {
    return this.#purchasePrice;
  }

  get purchaseDate() {
    return this.#purchaseDate;
  }
}
