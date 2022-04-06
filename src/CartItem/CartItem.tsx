import React from "react";
import Button from "@mui/material/Button";
import { Wrapper } from "./CartItem.styles";
import { CartItemType } from "../App";
import { Divider, Grid } from "@mui/material";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
  handleRemoveFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({
  item,
  handleAddToCart,
  handleRemoveFromCart,
}) => (
  <Wrapper>
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <h3>{item.title}</h3>
        <Grid item container>
          <Grid item xs={6}>
            <p>${item.price}</p>
          </Grid>
          <Grid item xs={6}>
            <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={3}>
            <Button
              disableElevation
              size="small"
              variant="contained"
              onClick={() => handleRemoveFromCart(item.id)}
            >
              -
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="text" color="info" disableRipple>
              {item.amount}
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              disableElevation
              size="small"
              variant="contained"
              onClick={() => handleAddToCart(item)}
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <img src={item.image} alt={item.title} />
      </Grid>
    </Grid>
    <Divider />
  </Wrapper>
);

export default CartItem;
