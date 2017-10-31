export class Item {

  id: number;
  name: String;
  price: number;
  descrption: String;

  toString():String {
    return "Id: " + this.id + "\n" +
      "Name: " + this.name + "\n" +
      "Price: " + this.price + "\n" +
      "Description: " + this.descrption + "\n";

  }
}
