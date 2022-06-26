import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function RatingStars(rating: any) {
  const [value, setValue] = React.useState<number | null>(2);

  // React.useEffect(() => {
  //   console.log(rating)
  // }, [rating])
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        readOnly
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
}
