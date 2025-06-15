export function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    cart = JSON.parse(cart);
  }
  return cart;
}

export function AddToCart(product, qty) {
  let cart = getCart();
  let index = cart.findIndex((item) => {
    return item.productId == product.productId;
  });

  if (index == -1) {
    cart[cart.length] = {
      productId: product.productId,
      name: product.name,
      images: product.images[0],
      labeledPrice: product.labeledPrice,
      price: product.price,
      qty: qty,
    };
  } else {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) {
      RemoveFromCart(product.productId);
      return;
    } else {
      cart[index].qty = newQty;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function RemoveFromCart(productId) {
  let cart = getCart();

  const newCart = cart.filter((item) => {
    return item.productId != productId;
  });
  localStorage.setItem("cart", JSON.stringify(newCart));
}


export function ClearCart() {
  localStorage.setItem("cart", JSON.stringify([]));
}