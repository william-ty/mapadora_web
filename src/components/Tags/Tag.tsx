import * as React from "react";
import { Chip } from "@mui/material";

// const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
//   borderRadius: 20,
//   margin: 5,
//   disabled: true,
//   color: theme.palette.getContrastText(green[500]),
//   backgroundColor: green[500],
//   "&:hover": {
//     backgroundColor: green[700],
//   },
// }));

type TagProps = {
  tag: string;
};

export const Tag = (props: TagProps) => {
  return <Chip label={props.tag} />;
};
