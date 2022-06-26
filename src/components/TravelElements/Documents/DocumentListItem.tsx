import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Document } from "../../../model/Document";
import { Link, Outlet, useParams } from "react-router-dom";
import DocViewer from "react-doc-viewer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { url_prefix } from "../../../api/util";


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type DocumentListItemProps = {
  document: Document;
  onDelete: any
};

export const DocumentListItem = (props: DocumentListItemProps) => {
  const docPath:string = props.document.path ? (url_prefix + "/" + props.document.path) : "../../img/static/logo.png";
//   const docToView: any = { uri: require(docPath)};

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const deleteDocument = () => {
            props.onDelete.mutate(props.document.id);
    }

  return (
    <>
      <ListItem>
        <ListItemText primary={props.document.name} />
       <a target="_blank" href={docPath}><VisibilityIcon/></a>
        <DeleteIcon onClick = {deleteDocument} />
      </ListItem>

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <DocViewer documents={docToView} />;
        </Box>
      </Modal> */}
    </>
  );
};
