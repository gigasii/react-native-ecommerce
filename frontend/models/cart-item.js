class CartItem {
  constructor(quantity, productPrice, productTitle, sum, ownerId) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
    this.ownerId = ownerId;
  }
}

export default CartItem;
