import * as cartItemRepository from "../repositories/cart-item.repository.ts";

export async function createCartItem(
  productId: number,
  cartId: number,
  quantity: number,
): Promise<cartItemRepository.CartItem> {
  return cartItemRepository.create(productId, cartId, quantity);
}
