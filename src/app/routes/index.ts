import { Router } from "express";
import { ProductRoutes } from "../modules/Product/product.route";
import { CartRoutes } from "../modules/Cart/cart.route";
import { CheckoutRoutes } from "../modules/Checkout/checkout.route";

const router = Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: "/carts",
    route: CartRoutes,
  },
  {
    path: "/checkouts",
    route: CheckoutRoutes

  }
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;