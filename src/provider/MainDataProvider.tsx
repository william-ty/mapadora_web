import { Alert, AlertColor, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

export interface MainDataContextProps {
  currentTravelId: number;
  setCurrentTravelId: (value: number) => void;
  showFeedback: (message: string, severity?: AlertColor) => void;
}

const MainDataContext = createContext<MainDataContextProps>(undefined!);

export const MainDataProvider = ({ children }: any) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [currentTravelId, setCurrentTravelId] = useState(1);

  const showFeedback = (message: string, severity: AlertColor = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setIsSnackbarOpen(true);
  };

  return (
    <MainDataContext.Provider
      value={{
        currentTravelId,
        setCurrentTravelId,
        showFeedback,
      }}
    >
      {children}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </MainDataContext.Provider>
  );
};

export const useMainData = () => useContext(MainDataContext);
