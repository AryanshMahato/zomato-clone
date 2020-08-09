import React from "react";
import { Box, Dialog, Typography } from "@material-ui/core";
import { Restaurant } from "../types/Restaurant";

interface RestaurantModalProps {
  open: boolean;
  handleModalClose: () => void;
  restaurant: Restaurant | undefined;
}

const RestaurantModal = ({
  open,
  handleModalClose,
  restaurant,
}: RestaurantModalProps) => {
  return (
    <Dialog open={open} onClose={handleModalClose}>
      <Box width={"500px"} p={"2rem"}>
        <a
          href={restaurant?.url}
          target={"_blank"}
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Typography
            component={"h1"}
            color={"textPrimary"}
            style={{ fontSize: "2rem" }}
          >
            {`Name: ${restaurant?.name}`}
          </Typography>
        </a>
        <Typography>{`Phone Number: ${restaurant?.phoneNumber}`}</Typography>
        <Typography>{`Address: ${restaurant?.location?.address}`}</Typography>
        <Typography>{`Timings: ${restaurant?.timings}`}</Typography>
        <Typography>{`Rating: ${restaurant?.rating?.rating_text}`}</Typography>
        <Typography>{`Votes: ${restaurant?.rating?.votes}`}</Typography>
      </Box>
    </Dialog>
  );
};

export default RestaurantModal;
