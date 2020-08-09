import React from "react";
import { useParams } from "react-router";
import SearchRestaurantForm from "../Components/SearchRestaurantForm";

const SearchRestaurantPage = () => {
  const { locationId } = useParams();

  return (
    <>
      <SearchRestaurantForm locationId={locationId} />
    </>
  );
};

export default SearchRestaurantPage;
