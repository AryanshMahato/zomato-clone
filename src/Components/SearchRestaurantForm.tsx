import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, MenuItem, Select, TextField } from "@material-ui/core";
import RestaurantService, {
  GetAllRestaurantsReturn,
} from "../Services/RestaurantService";
import { AllRestaurant, Category, Cuisines } from "../types/Restaurant";
import RestaurantList from "./RestaurantList";
import { toast } from "react-toastify";

interface SearchRestaurantFormProps {
  locationId: string;
}

const SearchRestaurantForm = ({ locationId }: SearchRestaurantFormProps) => {
  // Category State
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: "Select Category",
  });

  // Cuisine State
  const [cuisines, setCuisines] = useState<Cuisines[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<Cuisines>({
    id: 0,
    name: "Select Cuisine",
  });

  // Restaurant State
  const [restaurantInput, setRestaurantInput] = useState("");
  const [restaurants, setRestaurants] = useState<AllRestaurant[]>([]);
  const [fetchedRestaurants, setFetchedRestaurants] = useState<AllRestaurant[]>(
    []
  );

  useEffect(() => {
    getCategories();
    getCuisines();
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    const response = (await RestaurantService.getAllRestaurants({
      locationId: +locationId,
      cuisineId: selectedCuisines.id,
      categoryId: selectedCategory.id,
    })) as GetAllRestaurantsReturn;

    if (!response.restaurantFound)
      toast.error("No Restaurants found in this constraints");

    setRestaurants(response.restaurants);
    setFetchedRestaurants(response.restaurants);
  };

  const getCategories = async () => {
    const categories = (await RestaurantService.getAllCategories()) as Array<
      Category
    >;
    setCategories(categories);
  };

  const getCuisines = async () => {
    const cuisines = (await RestaurantService.getAllCuisines(
      +locationId
    )) as Array<Cuisines>;
    setCuisines(cuisines);
  };

  const categoryChangeHandler = (event: ChangeEvent<any>) => {
    const { value: id } = event.target;
    const selectedCategory = categories.find((category) => category.id === +id);
    if (selectedCategory?.id) {
      setSelectedCategory(selectedCategory);
      getRestaurants();
    }
  };
  const cuisinesChangeHandler = (event: ChangeEvent<any>) => {
    const { value: id } = event.target;
    const selectedCuisines = cuisines.find((cuisines) => cuisines.id === +id);
    if (selectedCuisines?.id) {
      setSelectedCuisines(selectedCuisines);
      getRestaurants();
    }
  };

  const restaurantChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filteredRestaurants = fetchedRestaurants.filter((restaurant) =>
      restaurant.name.includes(value)
    );
    setRestaurants(filteredRestaurants);
    setRestaurantInput(value);
  };

  return (
    <>
      <Box mx={"auto"} width={"fit-content"}>
        <form>
          <Box my={"2rem"} display={"flex"}>
            <Box mr={"2.5rem"}>
              <Select
                value={selectedCategory.id}
                onChange={categoryChangeHandler}
              >
                <MenuItem value={0} disabled style={{ display: "none" }}>
                  Select Category
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Select
              value={selectedCuisines.id}
              onChange={cuisinesChangeHandler}
            >
              <MenuItem value={0} disabled style={{ display: "none" }}>
                Select Cuisine
              </MenuItem>
              {cuisines.map((cuisine) => (
                <MenuItem key={cuisine.id} value={cuisine.id}>
                  {cuisine.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </form>
        <Box mr={"2rem"} width={"100%"}>
          <TextField
            fullWidth
            placeholder={"Enter Restaurant Name"}
            onChange={restaurantChangeHandler}
            value={restaurantInput}
          />
        </Box>
      </Box>
      <Box mt={"3rem"}>
        <RestaurantList restaurants={restaurants} />
      </Box>
    </>
  );
};

export default SearchRestaurantForm;
