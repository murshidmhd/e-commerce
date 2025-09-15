import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./features/context/CartContext.jsx";
import { WishlistProvider } from "./features/context/WishListContext.jsx";
import { OrderProvider } from "./features/context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <HashRouter> */}
      <BrowserRouter>
        <WishlistProvider>
          <CartProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </CartProvider>
        </WishlistProvider>
      </BrowserRouter>
    {/* </HashRouter> */}
  </StrictMode>
);
