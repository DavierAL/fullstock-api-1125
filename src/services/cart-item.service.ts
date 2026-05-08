import { ApiError } from "../lib/errors.ts";
import * as cartItemRepository from "../repositories/cart-item.repository.ts";

export async function createCartItem(
  productId: number,
  cartId: number,
  quantity: number,
): Promise<cartItemRepository.CartItem> {
  const productFind = await cartItemRepository.findByCartAndProduct(
    productId,
    cartId,
  );
  if (productFind) {
    throw new ApiError(409, "El producto ya existe en el carrito");
  }

  return cartItemRepository.create(productId, cartId, quantity);
}
