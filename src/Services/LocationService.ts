import mAxios from "../Utils/mAxios";
import { toast } from "react-toastify";

export default class LocationService {
  public static getAllLocations = async (location: string) => {
    try {
      const { data } = await mAxios.post("/location/all", {
        location,
      });
      return data.locations;
    } catch (e) {
      toast.error("Cannot fetch Locations", {
        autoClose: 5000,
      });
    }
  };

  public static getLocation = async (locationId: number) => {
    try {
      const { data } = await mAxios.post("/location", {
        id: locationId,
      });
      return data.location;
    } catch (e) {
      toast.error("Cannot fetch Location", {
        autoClose: 5000,
      });
    }
  };
}
