import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { AllRestaurant, Restaurant } from "../types/Restaurant";
import RestaurantModal from "./RestaurantModal";
import RestaurantService from "../Services/RestaurantService";

interface RestaurantListProps {
  restaurants: Array<AllRestaurant>;
}

const RestaurantList = ({ restaurants }: RestaurantListProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [restaurant, setRestaurant] = useState<Restaurant | undefined>();

  const restaurantClickHandler = async (id: number) => {
    await getRestaurant(id);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const getRestaurant = async (restaurantId: number) => {
    const restaurant = (await RestaurantService.getRestaurant(
      restaurantId
    )) as Restaurant;

    setRestaurant(restaurant);
  };

  return (
    <Box width={"100%"}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Phone Number</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Location</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Timings</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow
                key={restaurant.id}
                style={{ cursor: "pointer" }}
                onClick={() => restaurantClickHandler(restaurant.id)}
              >
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.phoneNumber}</TableCell>
                <TableCell>{restaurant.location}</TableCell>
                <TableCell>{restaurant.timings}</TableCell>
                <TableCell>{restaurant.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <RestaurantModal
        open={openModal}
        handleModalClose={handleModalClose}
        restaurant={restaurant}
      />
    </Box>
  );
};

export default RestaurantList;
