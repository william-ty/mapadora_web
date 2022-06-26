import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography, Divider } from "@mui/material";

type ImgTextComponentProps = {
  imagePath: string;
  text: string;
  title: string;
  imgPosition: Position;
};

export enum Position {
  Left,
  Right,
  NoImgTextCenter,
}

export const ImgTextComponent = (props: ImgTextComponentProps) => {
  const minHeightValue = "25rem"
  if (props.imgPosition === Position.Left) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          // bgcolor: "background.paper",
          minHeight: minHeightValue,
        }}
      >
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          rowSpacing={{ xs: 1, sm: 2, md: 3 }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={10} md={4} >
            <img
              style={{
                borderRadius: "8px"
              }}
              src={props.imagePath} alt="Logo" width={"100%"} />
          </Grid>
          <Grid item xs={10} md={8}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="h4">{props.title}</Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ mt: 1 }}>
              <Typography>{props.text}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  } else if (props.imgPosition === Position.Right) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          // bgcolor: "background.paper",
          minHeight: minHeightValue,
        }}
      >
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          rowSpacing={{ xs: 1, sm: 2, md: 3 }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={10} md={8}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="h4">{props.title}</Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ mt: 1 }}>
              <Typography>{props.text}</Typography>
            </Box>
          </Grid>
          <Grid item xs={10} md={4}>
            <img
              style={{
                borderRadius: "8px"
              }}
              src={props.imagePath} alt="Logo" width={"100%"} />
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return null;
  }
};
