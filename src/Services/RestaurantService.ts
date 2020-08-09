import mAxios from "../Utils/mAxios";
import { toast } from "react-toastify";
import { AllRestaurant } from "../types/Restaurant";

export default class RestaurantService {
  public static getAllCategories = async () => {
    try {
      const { data } = await mAxios.get("/restaurant/categories");
      return data.categories;
    } catch (e) {
      toast.error("Cannot fetch Categories", {
        autoClose: 5000,
      });
    }
  };
  public static getAllCuisines = async (locationId: number) => {
    try {
      const { data } = await mAxios.post("/restaurant/cuisines", {
        locationId,
      });
      return data.cuisines;
    } catch (e) {
      toast.error("Cannot fetch Cuisines", {
        autoClose: 5000,
      });
    }
  };

  public static getAllRestaurants = async ({
    locationId,
    cuisineId,
    categoryId,
  }: GetAllRestaurantsParams): Promise<GetAllRestaurantsReturn | undefined> => {
    try {
      const { data } = await mAxios.post("/restaurant/all", {
        locationId,
        cuisineId,
        categoryId,
      });
      return { ...data, message: undefined };
    } catch (e) {
      toast.error("Cannot fetch Restaurants", {
        autoClose: 5000,
      });
    }
  };

  public static getRestaurant = async (
    restaurantId: number
  ): Promise<GetAllRestaurantsReturn | undefined> => {
    try {
      const { data } = await mAxios.post("/restaurant/", {
        id: restaurantId,
      });
      return data.restaurant;
    } catch (e) {
      toast.error("Cannot fetch Restaurant", {
        autoClose: 5000,
      });
    }
  };
}

interface GetAllRestaurantsParams {
  locationId: number;
  cuisineId: number;
  categoryId: number;
}

export interface GetAllRestaurantsReturn {
  restaurants: Array<AllRestaurant>;
  restaurantFound: number;
}
