export class Price {
  #id: string;
  #productId: string;
  #purchasePrice: number;
  #salePrice: number;
  #effectiveDate: Date;

  constructor(
    id: string,
    productId: string,
    purchasePrice: number,
    salePrice: number,
    effectiveDate: Date
  ) {
    this.#id = id;
    this.#productId = productId;
    this.#purchasePrice = purchasePrice;
    this.#salePrice = salePrice;
    this.#effectiveDate = effectiveDate;

    this.#validate();
  }

  #validate() {
    if (this.#purchasePrice <= 0) {
      throw new Error("Purchase price must be greater than zero");
    }

    if (this.#salePrice <= 0) {
      throw new Error("Sale price must be greater than zero");
    }

    if (isNaN(this.#effectiveDate.getTime())) {
      throw new Error("Invalid date");
    }
  }

  changePurchasePrice(purchasePrice: number) {
    this.#purchasePrice = purchasePrice;
    this.#validate();
  }

  changeSalePrice(salePrice: number) {
    this.#salePrice = salePrice;
    this.#validate();
  }

  changeEffectiveDate(effectiveDate: Date) {
    this.#effectiveDate = effectiveDate;
    this.#validate();
  }

  get id() {
    return this.#id;
  }

  get productId() {
    return this.#productId;
  }

  get purchasePrice() {
    return this.#purchasePrice;
  }

  get salePrice() {
    return this.#salePrice;
  }

  get effectiveDate() {
    return this.#effectiveDate;
  }
}