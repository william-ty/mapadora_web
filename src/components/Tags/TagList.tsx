import { Travel } from "../../model/Travel";
import Grid from "@mui/material/Grid";

type TagListProps = {
  travel: Travel;
};

export const TagList = (props: TagListProps) => {
  // const tagsTravel : Array<string> | undefined = props.travel.tags;
  return (
    <Grid
      container
      columnSpacing={{ xs: 1, sm: 1, md: 1 }}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      alignContent="start"
    >
      {/* {tagsTravel.map((tags: string, idx: number) => {
          return (
            <Grid item  key={"tag" + idx} mt={2}>
              <Tag tag={tags} />
            </Grid>
          );
        })} */}
    </Grid>
  );
};
