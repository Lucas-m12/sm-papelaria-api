export class Product {
  #id: string;
  #name: string;
  #code: string;
  #description?: string;
  #category?: string;

  constructor(
    id: string,
    name: string,
    code: string,
    description?: string,
    category?: string
  ) {
    this.#id = id;
    this.#name = name;
    this.#code = code;
    this.#description = description;
    this.#category = category;

    this.#validate();
  }

  #validate() {
    if (!this.#name.trim()) {
      throw new Error("Product name cannot be empty");
    }

    if (!this.#code.trim()) {
      throw new Error("Product code cannot be empty");
    }
  }

  changeDescription(description: string) {
    this.#description = description;
    this.#validate();
  }

  changeCategory(category: string) {
    this.#category = category;
    this.#validate();
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get code() {
    return this.#code;
  }

  get description() {
    return this.#description;
  }

  get category() {
    return this.#category;
  }
}