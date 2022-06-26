import { Box, Typography } from "@mui/material";

type PopupType = {
  title: string;
  name: string;
  description: string;
};

export const Popup = ({ title, name, description }: PopupType) => (
  <Box className="popup">
    <Typography
      my={1}
      sx={{ textTransform: "uppercase" }}
      align="center"
      variant="subtitle1"
      component="h4"
    >
      {title}
    </Typography>
    <Box>
      <Typography variant="body1">{name}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
  </Box>
);
