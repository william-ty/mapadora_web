import { Alert, AlertColor, AlertTitle, CircularProgress } from "@mui/material";

export type InlineAlertProps = {
  severity: AlertColor, // MUI value : 'success' | 'info' | 'warning' | 'error'
  message: string,
  title?: string, // Is predefined with the type error, but can be redefined
  icon?: React.ReactNode, // Is predefined with isLoading, but can be redefined
  isLoading?: boolean,
};

export const InlineAlert = ({ severity, message, title, icon, isLoading }: InlineAlertProps) => {
  return (
    <Alert variant="outlined" severity={severity} icon={isLoading ? <CircularProgress color="secondary" size={22} /> : icon}>
      <AlertTitle>
        {
          severity === "error" && !title ? "Erreur" : title
        }
      </AlertTitle>
      {
        message
      }
    </Alert>
  );
}
