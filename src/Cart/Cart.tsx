import React from "react";
import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";
import { Divider, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Types
import { CartItemType } from "../App";

type Props = {
  items: CartItemType[];
  handleAddToCart: (clickedItem: CartItemType) => void;
  handleRemoveFromCart: (id: number) => void;
  handleCloseCart: () => void;
};

const Cart: React.FC<Props> = ({
  items,
  handleAddToCart,
  handleRemoveFromCart,
  handleCloseCart,
}) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

  const matches = useMediaQuery("(max-width:500px)");

  return (
    <Wrapper style={{ width: matches ? "100%" : "500px" }}>
      <IconButton onClick={handleCloseCart}>
        <CloseIcon />
      </IconButton>
      <h2>Your shopping cart</h2>
      {items.length === 0 ? (
        <>
          <p>No Items in the cart</p>
          <Divider />
        </>
      ) : null}
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(items).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
