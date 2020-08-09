import React, { ChangeEvent, FormEvent, useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";

import { AllLocation } from "../types/Location";
import LocationService from "../Services/LocationService";
import Locations from "../Components/Locations";
import { toast } from "react-toastify";

const HomePage = () => {
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState<Array<AllLocation>>();

  const getLocations = async () => {
    const locations = (await LocationService.getAllLocations(
      location
    )) as Array<AllLocation>;
    setLocations(locations);

    if (!locations.length) toast.error("No Locations found with this name");
  };

  const locationChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLocation(value);
  };

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getLocations();
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      mt={"2rem"}
    >
      <form onSubmit={formSubmitHandler}>
        <Box display={"flex"}>
          <Box mr={"2rem"}>
            <TextField
              placeholder={"Enter Locations"}
              onChange={locationChangeHandler}
              value={location}
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
      {!!locations?.length && (
        <Box width={"95vw"} maxWidth={"1200px"} mt={"2rem"}>
          <Locations locations={locations} />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
