import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import LocationService from "../Services/LocationService";
import { Location } from "../types/Location";
import SearchRestaurantForm from "../Components/SearchRestaurantForm";

const SearchRestaurantPage = () => {
  const { locationId } = useParams();
  const [location, setLocation] = useState<Location | {}>({});

  useEffect(() => {
    getLocation(locationId);
  }, []);

  const getLocation = async (locationId: number) => {
    const location = (await LocationService.getLocation(
      locationId
    )) as Location;

    setLocation(location);
  };

  return (
    <>
      <SearchRestaurantForm location={location} />
    </>
  );
};

export default SearchRestaurantPage;
