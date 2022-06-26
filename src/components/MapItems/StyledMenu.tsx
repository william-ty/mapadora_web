import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import { useOutletContext } from "react-router";
import { useTranslation } from "react-i18next";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "4px",
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.secondary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus({
  onAddPois,
  onLocate,
  onDelete,
  onEdit,
  onRead,
  color,
  type,
}: any) {
  const { t } = useTranslation();

  const {
    isEditable,
  }: {
    isEditable: boolean;
  } = useOutletContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        color={color}
        sx={{ "&:hover": { backgroundColor: color + ".light" } }}
        // endIcon={<KeyboardArrowDownIcon />}
      >
        <KeyboardArrowDownIcon />
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {isEditable && type === "step" && (
          <MenuItem onClick={onAddPois} disableRipple>
            <EditLocationAltIcon />
            {t("map.addInterestPoint")}
          </MenuItem>
        )}
        <MenuItem onClick={onRead} disableRipple>
          <VisibilityIcon />
          {t("map.information")}
        </MenuItem>
        {/* //todo - add locate on trip? */}
        {type !== "trip" && (
          <MenuItem onClick={onLocate} disableRipple>
            <MyLocationIcon />
            {t("map.locate")}
          </MenuItem>
        )}
        {isEditable && (
          <MenuItem onClick={onEdit} disableRipple>
            <EditIcon />
            {t("map.update")}
          </MenuItem>
        )}
        {isEditable && (
          <Box>
            {type !== "trip" && (
              <>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={onDelete} disableRipple>
                  <DeleteForeverIcon />
                  {t("map.delete")}
                </MenuItem>
              </>
            )}
          </Box>
        )}
      </StyledMenu>
    </div>
  );
}
