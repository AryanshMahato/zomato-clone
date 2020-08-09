import mAxios from "../Utils/mAxios";
import { toast } from "react-toastify";

export default class LocationService {
  public static getAllLocations = async (location: string) => {
    try {
      const { data } = await mAxios.get("/location/all", {
        params: {
          location,
        },
      });
      return data.locations;
    } catch (e) {
      toast.error("Cannot fetch Locations", {
        autoClose: 5000,
      });
    }
  };
}
