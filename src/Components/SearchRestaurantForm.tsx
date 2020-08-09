import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Box, Button, MenuItem, Select, TextField } from "@material-ui/core";
import RestaurantService, {
  GetAllRestaurantsReturn,
} from "../Services/RestaurantService";
import { Location } from "../types/Location";
import { AllRestaurant, Category, Cuisines } from "../types/Restaurant";
import RestaurantList from "./RestaurantList";

interface SearchRestaurantFormProps {
  location: Location | {};
  locationId: string;
}

const SearchRestaurantForm = ({
  location,
  locationId,
}: SearchRestaurantFormProps) => {
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
  const [totalRestaurant, setTotalRestaurant] = useState<number>(0);

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

    setRestaurants(response.restaurants);
    setTotalRestaurant(response.restaurantFound);
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

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const restaurantChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
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
        <form onSubmit={formSubmitHandler}>
          <Box display={"flex"}>
            <Box mr={"2rem"}>
              <TextField
                placeholder={"Enter Restaurant Name"}
                onChange={restaurantChangeHandler}
                value={restaurantInput}
              />
            </Box>
            <Button
              type={"submit"}
              variant="contained"
              color="primary"
              disableElevation
            >
              Search
            </Button>
          </Box>
        </form>
      </Box>
      <Box mt={"3rem"}>
        <RestaurantList restaurants={restaurants} />
      </Box>
    </>
  );
};

export default SearchRestaurantForm;
