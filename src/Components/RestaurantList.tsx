import React from "react";
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
import { AllRestaurant } from "../types/Restaurant";

interface RestaurantListProps {
  restaurants: Array<AllRestaurant>;
}

const RestaurantList = ({ restaurants }: RestaurantListProps) => {
  const restaurantClickHandler = (id: number) => {};

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
    </Box>
  );
};

export default RestaurantList;
