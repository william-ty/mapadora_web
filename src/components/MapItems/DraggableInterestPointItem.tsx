import * as React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import { InterestPoint } from "../../model/InterestPoint";
import { useEffect } from "react";
import EventIcon from "@mui/icons-material/Event";
import { useMutation, useQueryClient } from "react-query";
import api from "api/api";
import { useParams } from "react-router";
import { SelectedInterestPoint } from "components/Planning/ToolbarScreens/EditInterestPoint";
import { useTranslation } from "react-i18next";

export type DraggableInterestPointItemProps = {
  item: InterestPoint;
  stepDays: number;
  index: number;
  icon: string;
  isDraggingOver?: any;
  styledMenu: JSX.Element;
};

export const DraggableInterestPointItem = ({
  item,
  icon,
  index,
  styledMenu,
  stepDays,
}: DraggableInterestPointItemProps) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [days, setDays] = React.useState<number[]>([]);
  const [day, setDay] = React.useState<number>();
  const queryClient = useQueryClient();
  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  const [interestpointToUpdate, setInterestPointToUpdate] =
    React.useState<SelectedInterestPoint>();

  const updateInterestPoint = useMutation(api.update, {
    onSuccess: (interestPoint, { id }) => {
      queryClient.setQueryData<InterestPoint[]>(
        ["interestPoints", id_travel],
        (interestPoints) =>
          interestPoints!.map((ip) => (ip.id === id ? interestPoint : ip))
      );
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let _days: any = [];
    for (let i = 1; i <= stepDays; i++) {
      _days.push(i);
    }
    setDays(_days);
  }, [item, stepDays]);

  const onChangeDays = async ({
    target: { name, value },
  }: SelectChangeEvent<string>) => {
    // console.log("UPDATE SET" + value)
    setInterestPointToUpdate({ [name]: value });
  };

  useEffect(() => {
    updateDay();
  }, [interestpointToUpdate]);

  const updateDay = () => {
    updateInterestPoint.mutate({
      route: InterestPoint.routeName,
      id: item?.id!,
      body: interestpointToUpdate!,
      idTravel: id_travel,
    });
  };

  return (
    <>
      {item.id && (
        // Draggable currently replaced with regular item with 'day' logic
        <ListItem sx={{ my: 1, backgroundColor: "primary.lightest" }}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "primary.light" }}>
              <Icon sx={{ color: "primary.dark" }} fontSize="large">
                {icon}
              </Icon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText sx={{ flex: 4 }} primary={item.element?.name || ""} />
          <Box sx={{ flex: 2 }}>
            <FormControl
              sx={{ flexDirection: "row", alignItems: "center", mx: 2 }}
            >
              {/* <EventIcon /> */}
              <Select
                labelId="interestpoint-day"
                id="interestpoint-day"
                name="day"
                // autoWidth
                defaultValue=""
                displayEmpty
                variant="standard"
                disableUnderline
                onChange={onChangeDays}
                renderValue={(value) => {
                  return (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {/* <SvgIcon color="primary"> */}
                      <EventIcon sx={{ ml: 1 }} />
                      {/* </SvgIcon> */}
                      {item.day ? item.day + "/" + stepDays : "N/A"}
                    </Box>
                  );
                }}
                // MenuProps={MenuProps}
              >
                {days?.map((option: any) => (
                  <MenuItem key={option} value={option}>
                    {t("map.day")} {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>{styledMenu}</Box>
        </ListItem>

        // Old draggable kept for futur change if needed
        // <Draggable draggableId={item.id.toString()} index={index}>
        //   {(provided, snapshot) => (
        //     <ListItem
        //       ref={provided.innerRef}
        //       {...provided.draggableProps}
        //       {...provided.dragHandleProps}
        //       sx={
        //         snapshot.isDragging
        //           ? styles.draggingListItem
        //           : styles.interestPointItem
        //       }
        //     >
        //       <Icon
        //         fontSize="medium"
        //         className="drag-icon"
        //         sx={{ opacity: "0" }}
        //       >
        //         drag_indicator
        //       </Icon>
        //       <ListItemAvatar>
        //         <Avatar sx={{ bgcolor: "primary.light" }}>
        //           <Icon sx={{ color: "primary.dark" }} fontSize="large">
        //             {icon}
        //           </Icon>
        //         </Avatar>
        //       </ListItemAvatar>
        //       <ListItemText
        //         sx={{ flex: 4 }}
        //         primary={item.element?.name || ""}
        //       />
        //       <Box sx={{ flex: 2 }}>
        //         {item.day ?
        //           item.day + "/" + stepDays
        //           : "N/A"
        //         }
        //         <EventIcon />
        //         <Select
        //           labelId="interestpoint-day"
        //           id="interestpoint-day"
        //           name="day"
        //           autoWidth
        //           defaultValue=""
        //           onChange={onChangeDays}
        //           input={<OutlinedInput label={"Jour"} />}
        //         // MenuProps={MenuProps}
        //         >
        //           {days.map((option: any) => (
        //             <MenuItem
        //               key={option}
        //               value={option}
        //             >Jour {option}
        //             </MenuItem>
        //           ))}
        //         </Select>
        //         {/* <InputLabel id="interestpoint-day">
        //         </InputLabel>
        //         <Select
        //           input={<IconButton
        //             aria-label="more"
        //             aria-controls={open ? 'long-menu' : undefined}
        //             aria-expanded={open ? 'true' : undefined}
        //             aria-haspopup="true"
        //             onClick={handleClick}
        //           >
        //             <EventIcon />
        //           </IconButton>}
        //           name="day"
        //           labelId="interestpoint-day"
        //           id="interestpoint-day"
        //           onChange={onChangeDays}>
        //           {days.map((option: any) => (
        //             <MenuItem value={option}>Jour {option}</MenuItem>
        //           ))}
        //         </Select> */}

        //         {/* <Menu
        //           id="long-menu"
        //           MenuListProps={{
        //             'aria-labelledby': 'long-button',
        //           }}
        //           anchorEl={anchorEl}
        //           open={open}
        //           onClose={handleClose}
        //           PaperProps={{
        //             style: {
        //               maxHeight: 48 * 4.5,
        //               width: '20ch',
        //             },
        //           }}
        //         >
        //           {days.map((option: any) => (
        //             <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleDays}>
        //               Jour {option}
        //             </MenuItem>
        //           ))}
        //         </Menu> */}

        //       </Box>

        //       <Box>{styledMenu}</Box>
        //     </ListItem>
        //   )}
        // </Draggable>
      )}
    </>
  );
};
