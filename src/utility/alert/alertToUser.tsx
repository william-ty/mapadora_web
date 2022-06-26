import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export type AlertProps = {
  activate: boolean;
  dialogTitle: string;
  dialogDescription: string;
  onCloseYesAction: () => void;
  onCloseNoAction: () => void;
}


export default function AlertDialog(props: AlertProps) {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    setOpen(true)
  }, [])

  const handleCloseYes = () => {
    props.onCloseYesAction();
    setOpen(false);
  };

  const handleCloseNo = () => {
    props.onCloseNoAction();
    setOpen(false);
  }

  return (

    <div data-cy="alertDialog">
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ backgroundColor: "rgb(0,0,0, 0.3)" }}
      >
        <DialogTitle id="alert-dialog-title">
          {props.dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.dialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button sx={{
            color: "secondary.lighter", backgroundColor: "secondary.darky", "&:hover": {
              backgroundColor: "secondary.light"
            }
          }} data-cy="okButton" onClick={handleCloseYes}>Ok, compris</Button>
          <Button sx={{
            color: "accent.lighter", backgroundColor: "accent.darky", "&:hover": {
              backgroundColor: "accent.light"
            }
          }} onClick={handleCloseNo} autoFocus>
            Non, je renonce
          </Button>
        </DialogActions>
      </Dialog>

    </div>

  );
}
