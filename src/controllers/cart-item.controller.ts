import type { Request, Response } from "express";
import { ApiError } from "../lib/errors.ts";
import * as cartItemService from "../services/cart-item.service.ts";
import * as cartService from "../services/cart.service.ts";

export async function createCartItem(
  req: Request<
    object,
    unknown,
    { productId: number; quantity: number },
    unknown
  >,
  res: Response,
) {
  const { productId, quantity } = req.body;

  if (typeof productId !== "number") {
    throw new ApiError(400, "productId es requerido y debe ser un numero");
  }

  if (typeof quantity !== "number" || quantity < 1) {
    throw new ApiError(
      400,
      "quantity es requerido y debe ser un numero positivo",
    );
  }

  let cartId: number;

  if (req.session.cartId !== undefined) {
    // Buscamos el carrito que le pertenece al usuario
    const cart = await cartService.getCart(req.session.cartId);
    if (cart === null) {
      delete req.session.cartId; // Limpiamos el cartId De la session
      throw new ApiError(409, "El carrito de la session ya no existe");
    }

    cartId = cart.id;
  } else {
    const cart = await cartService.createCart();
    req.session.cartId = cart.id;
    cartId = cart.id;
  }

  // Crear un cart-item
  const item = await cartItemService.createCartItem(
    productId,
    cartId,
    quantity,
  );

  res.json({ status: "success", data: item });
}
