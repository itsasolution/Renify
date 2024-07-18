import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function LocationFinder() {
  return (
    <Autocomplete
      // disablePortal
      options={Locations}
      sx={{
        width: 250,
        bgcolor:"white",
        // '&:hover': {
        //   bgcolor: 'skyblue',
        // }
      }}
      renderInput={(params) => <TextField {...params} label="Location" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const Locations= [
   { label: "Bhawarkua", year: 2000 },
  { label: "Banganga", year: 2009 },
  { label: "IT Park", year: 1975 },
  { label: "Sarvate", year: 1975 },
  { label: "Airport", year: 1975 },
  { label: "Indore Junction", year: 1975 },
];
