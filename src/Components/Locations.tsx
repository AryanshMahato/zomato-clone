import React from "react";
import {
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@material-ui/core";
import { AllLocation } from "../types/Location";
import { useHistory } from "react-router";

interface LocationProps {
  locations: Array<AllLocation>;
}

const Locations = ({ locations }: LocationProps) => {
  const history = useHistory();

  const locationClickHandler = (id: number) => {
    history.push(`/location/${id}`);
  };

  return (
    <Box width={"100%"}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location) => (
              <TableRow
                key={location.id}
                style={{ cursor: "pointer" }}
                onClick={() => locationClickHandler(location.id)}
              >
                <TableCell>{location.name}</TableCell>
                <TableCell>{location.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Locations;
