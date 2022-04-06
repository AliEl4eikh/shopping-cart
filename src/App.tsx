import React, { useState } from "react";
// components
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import { useQuery } from "react-query";
import { Wrapper, StyledIconButton } from "./App.styles";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
// types
export type CartItemType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  amount: number;
};

// function to get products data outside the component to prevent refetching
const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<CartItemType[]>("products", getProducts);

  // functionality
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prevState) => {
      const isItemInCart = prevState.find((item) => clickedItem.id === item.id);

      if (isItemInCart) {
        return prevState.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prevState, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prevState) =>
      prevState.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) {
            return acc;
          } else {
            return [...acc, { ...item, amount: item.amount - 1 }];
          }
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };

  const handleCloseCart = () => {
    setCartIsOpen(false);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>something went wrong...</div>;
  }

  return (
    <Wrapper>
      <Drawer
        anchor="right"
        open={cartIsOpen}
        onClose={() => setCartIsOpen(false)}
      >
        <Cart
          items={cartItems}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleCloseCart={handleCloseCart}
        />
      </Drawer>
      <StyledIconButton
        color="primary"
        aria-label="add to shopping cart"
        onClick={() => setCartIsOpen((prevState) => !prevState)}
      >
        <Badge badgeContent={getTotalItems(cartItems)} color="warning">
          <AddShoppingCartOutlined />
        </Badge>
      </StyledIconButton>
      <Grid container spacing={3}>
        {products?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
