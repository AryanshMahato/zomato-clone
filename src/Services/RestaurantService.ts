import mAxios from "../Utils/mAxios";
import { toast } from "react-toastify";

export default class RestaurantService {
  public static getAllCategories = async () => {
    try {
      const { data } = await mAxios.get("/restaurant/categories");
      return data.categories;
    } catch (e) {
      toast.error("Cannot fetch Locations", {
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
      toast.error("Cannot fetch Locations", {
        autoClose: 5000,
      });
    }
  };
}
