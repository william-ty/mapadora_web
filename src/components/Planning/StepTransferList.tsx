import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { InterestPoint } from "model/InterestPoint";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import api from "api/api";
import { DraggableInterestPointItem } from "components/MapItems/DraggableInterestPointItem";
import StyledMenu from "components/MapItems/StyledMenu";
import { useData } from "provider/DataProvider";
import { Step } from "model/Step";
import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";

function not(a: readonly InterestPoint[], b: readonly InterestPoint[]) {
  return a?.filter((value) => b.indexOf(value) === -1);
}

function intersection(
  a: readonly InterestPoint[],
  b: readonly InterestPoint[]
) {
  return a?.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly InterestPoint[], b: readonly InterestPoint[]) {
  return [...a, ...not(b, a)];
}

export default function StepTransfertList(props: any) {
  const { t } = useTranslation();

  const { interestPoints }: { interestPoints: InterestPoint[] } =
    useOutletContext();

  const queryClient = useQueryClient();

  const deleteInterestPoint = useMutation(api.delete, {
    onSuccess: (interestPoint, { id }) => {
      queryClient.setQueryData<InterestPoint[]>(
        ["interestPoints", id_travel],
        (interestPoints) =>
          interestPoints ? interestPoints?.filter((poi) => poi.id !== id) : []
      );
    },
  });

  const { map } = useData();
  const navigate = useNavigate();

  // const [days, setDays] = React.useState<number[]>([]);
  // const [day, setDay] = React.useState<number>();

  const [checked, setChecked] = React.useState<readonly InterestPoint[]>([]);
  const [left, setLeft] = React.useState<readonly InterestPoint[]>(
    interestPoints?.filter((poi) => poi.id_step !== props.step.id)
  );
  const [right, setRight] = React.useState<readonly InterestPoint[]>(
    interestPoints?.filter((poi) => poi.id_step === props.step.id)
  );

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (interestPoint: InterestPoint) => () => {
    const currentIndex = checked.indexOf(interestPoint);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(interestPoint);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  const numberOfChecked = (interestPoints: readonly InterestPoint[]) =>
    intersection(checked, interestPoints).length;

  const handleToggleAll = (interestPoints: readonly InterestPoint[]) => () => {
    if (numberOfChecked(interestPoints) === interestPoints.length) {
      setChecked(not(checked, interestPoints));
    } else {
      setChecked(union(checked, interestPoints));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    // console.log(leftChecked);
    leftChecked &&
      leftChecked.length > 0 &&
      leftChecked.map((interestPoint) =>
        api.associateToStep({
          hasToken: true,
          idTravel: id_travel,
          idInterestPoint: interestPoint?.id!,
          idStep: props.step.id,
        })
      );
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    rightChecked &&
      rightChecked.length > 0 &&
      rightChecked.map((interestPoint) =>
        api.removeFromStep({
          hasToken: true,
          idTravel: id_travel,
          idInterestPoint: interestPoint?.id!,
        })
      );
  };

  const handleClose = () => props.setOpen(false);

  // StyledMenu Logic
  const onLocate = (item: Step | InterestPoint) => {
    // props.setOpen(false);
    map?.current.flyTo({
      center: item.point.coordinates,
      zoom: map?.current.getZoom(),
      pitch: map?.current.getPitch(),
      bearing: map?.current.getBearing(),
    });
  };
  const onDelete = (item: Step | InterestPoint) =>
    item?.id &&
    deleteInterestPoint.mutate({
      route: InterestPoint.routeName,
      id: item.id,
      idTravel: id_travel,
    });
  const onEdit = (itemId: number) =>
    navigate(`../interestpoints/${itemId}/edit`);
  const onRead = (itemId: number) => {
    navigate(`../interestpoints/${itemId}`);
  };

  const customList = (
    title: React.ReactNode,
    interestPoints: readonly InterestPoint[],
    isTargetStepList: boolean
  ) => {
    const notAssociatedIp = interestPoints?.filter(
      (interestPoint) => !interestPoint.id_step
    );
    const ipAlreadyAssociated = interestPoints?.filter(
      (interestPoint) => interestPoint.id_step
    );
    return (
      <Card>
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={
            <Checkbox
              sx={{
                color: "secondary.main",
                "&.Mui-checked": {
                  color: "secondary.main",
                },
                "&.MuiCheckbox-indeterminate": {
                  color: "secondary.main",
                },
              }}
              onClick={handleToggleAll(interestPoints)}
              checked={
                numberOfChecked(interestPoints) === interestPoints.length &&
                interestPoints.length !== 0
              }
              indeterminate={
                numberOfChecked(interestPoints) !== interestPoints.length &&
                numberOfChecked(interestPoints) !== 0
              }
              disabled={interestPoints.length === 0}
              inputProps={{
                "aria-label": "all items selected",
              }}
            />
          }
          title={title}
          subheader={`${numberOfChecked(interestPoints)}/${
            interestPoints.length
          } sélectionnés`}
        />
        <Divider />
        <List
          sx={{
            // width: 200,
            // height: 230,
            bgcolor: "secondary.darky",
            overflow: "auto",
          }}
          dense
          component="div"
          role="list"
        >
          {!isTargetStepList && (
            <Typography sx={{ px: 2, py: 1, color: "secondary.lightest" }}>
              {t("map.interestPoint.notAssociatedIp")}
            </Typography>
          )}
          {notAssociatedIp && notAssociatedIp?.length > 0 ? (
            notAssociatedIp.map((interestPoint: InterestPoint) => {
              const labelId = `transfer-list-all-item-${interestPoint.id}-label`;

              return (
                <ListItem
                  key={interestPoint.id}
                  role="listitem"
                  button
                  onClick={handleToggle(interestPoint)}
                >
                  <ListItemIcon>
                    <Checkbox
                      sx={{
                        color: "secondary.light",
                        "&.Mui-checked": {
                          color: "secondary.light",
                        },
                        "&.MuiCheckbox-indeterminate": {
                          color: "secondary.light",
                        },
                      }}
                      checked={checked.indexOf(interestPoint) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </ListItemIcon>
                  <DraggableInterestPointItem
                    icon={"location_on_icon"}
                    item={interestPoint}
                    stepDays={props.step.duration}
                    index={interestPoint.id!}
                    key={interestPoint.id}
                    // isDraggingOver={snapshot.isDraggingOver}
                    styledMenu={
                      <StyledMenu
                        onLocate={() => onLocate(interestPoint)}
                        onDelete={() => onDelete(interestPoint)}
                        onEdit={() =>
                          interestPoint.id && onEdit(interestPoint.id)
                        }
                        onRead={() =>
                          interestPoint.id && onRead(interestPoint.id)
                        }
                      />
                    }
                  />
                  {/* <ListItemText id={labelId} primary={interestPoint.element.name} /> */}
                  {/* <ListItemText id={labelId} primary={`List item ${value + 1}`} /> */}
                </ListItem>
              );
            })
          ) : (
            <>
              {!isTargetStepList && (
                <Typography sx={{ px: 5, py: 1, color: "secondary.lightest" }}>
                  {t("common.nothingToDisplay")}
                </Typography>
              )}
            </>
          )}
          <ListItem />
        </List>
        <List
          sx={{
            // width: 200,
            // height: 230,
            bgcolor: "secondary.darky",
            overflow: "auto",
          }}
          dense
          component="div"
          role="list"
        >
          {!isTargetStepList && (
            <Typography sx={{ px: 2, py: 1, color: "secondary.lightest" }}>
              {t("map.interestPoint.ipAlreadyAssociated")}
            </Typography>
          )}
          {ipAlreadyAssociated && ipAlreadyAssociated?.length > 0 ? (
            ipAlreadyAssociated.map((interestPoint: InterestPoint) => {
              const labelId = `transfer-list-all-item-${interestPoint.id}-label`;

              return (
                <ListItem
                  key={interestPoint.id}
                  role="listitem"
                  button
                  onClick={handleToggle(interestPoint)}
                >
                  <ListItemIcon>
                    <Checkbox
                      sx={{
                        color: "secondary.light",
                        "&.Mui-checked": {
                          color: "secondary.light",
                        },
                        "&.MuiCheckbox-indeterminate": {
                          color: "secondary.light",
                        },
                      }}
                      checked={checked.indexOf(interestPoint) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </ListItemIcon>
                  <DraggableInterestPointItem
                    icon={"location_on_icon"}
                    item={interestPoint}
                    stepDays={props.step.duration}
                    index={interestPoint.id!}
                    key={interestPoint.id}
                    // isDraggingOver={snapshot.isDraggingOver}
                    styledMenu={
                      <StyledMenu
                        onLocate={() => onLocate(interestPoint)}
                        onDelete={() => onDelete(interestPoint)}
                        onEdit={() =>
                          interestPoint.id && onEdit(interestPoint.id)
                        }
                        onRead={() =>
                          interestPoint.id && onRead(interestPoint.id)
                        }
                      />
                    }
                  />
                  {/* <ListItemText id={labelId} primary={interestPoint.element.name} /> */}
                  {/* <ListItemText id={labelId} primary={`List item ${value + 1}`} /> */}
                </ListItem>
              );
            })
          ) : (
            <>
              <Typography sx={{ px: 5, py: 1, color: "secondary.lightest" }}>
                {t("common.nothingToDisplay")}
              </Typography>
            </>
          )}
          <ListItem />
        </List>
      </Card>
    );
  };

  return (
    <>
      <Box display="flex" justifyContent="center" pb={4}>
        {/* <Box sx={{ position: 'absolute', top: '2rem', right: '2rem', backgroundColor: 'secondary.light', borderRadius: '50%', padding: '0.3rem', "&:hover": { backgroundColor: 'secondary.darky' }, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 15 }} onClick={() => handleClose()}><Icon>close</Icon></Box> */}
        <Paper
          sx={{
            py: 1,
            px: 2,
            display: "flex",
            alignItems: "center",
            backgroundColor: "secondary.lightest",
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.light", mr: 2 }}>
            <Icon sx={{ color: "secondary.dark" }} fontSize="large">
              location_on_icon
            </Icon>
          </Avatar>
          <Typography
            variant="h5"
            sx={{ textTransform: "capitalize", fontWeight: "500" }}
          >
            {t("common.step")} "{props.step && props.step.element.name}"
          </Typography>
          <Divider orientation="vertical" sx={{ ml: 2 }} />
          <Box sx={{ display: "flex", ml: 2, alignItems: "center" }}>
            <Tooltip title="Durée en jours" arrow>
              <Typography variant="h5">{props.step.duration}</Typography>
            </Tooltip>
            <Icon fontSize="large">calendar_month_icon</Icon>
          </Box>
        </Paper>
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ flexWrap: "nowrap" }}
      >
        <Grid item>
          {customList("Points d'intérêts non associés", left, false)}
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{
                my: 1,
                backgroundColor: "secondary.lighter",
                borderColor: "secondary.dark",
                color: "secondary.darker",
                fontSize: "large",
                "&:hover": {
                  backgroundColor: "secondary.darky",
                  borderColor: "secondary.lighter",
                  color: "secondary.lightest",
                },
              }}
              variant="outlined"
              size="medium"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{
                my: 1,
                backgroundColor: "secondary.lighter",
                borderColor: "secondary.dark",
                color: "secondary.darker",
                fontSize: "large",
                "&:hover": {
                  backgroundColor: "secondary.darky",
                  borderColor: "secondary.lighter",
                  color: "secondary.lightest",
                },
              }}
              variant="outlined"
              size="medium"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          {customList("Points d'intérêts associés à l'étape", right, true)}
        </Grid>
      </Grid>
    </>
  );
}
