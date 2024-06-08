export class Supplier {
  #id: string;
  #name: string;
  #contact?: string | null;
  #address?: string | null;

  constructor(
    id: string,
    name: string,
    contact?: string | null,
    address?: string | null,
  ) {
    this.#id = id;
    this.#name = name;
    this.#contact = contact;
    this.#address = address;

    this.#validate();
  }

  #validate() {
    if (!this.#name.trim()) {
      throw new Error("Supplier name cannot be empty");
    }
  }

  changeName(name: string) {
    this.#name = name;
  }

  changeContact(contact: string) {
    this.#contact = contact;
  }

  changeAddress(address: string) {
    this.#address = address;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get contact() {
    return this.#contact;
  }

  get address() {
    return this.#address;
  }
}
