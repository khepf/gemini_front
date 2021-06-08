export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.baseballcard) return tally; // products can be deleted, but they could still be in your cart
    return tally + cartItem.quantity * cartItem.baseballcard.sellingPrice;
  }, 0);
}
