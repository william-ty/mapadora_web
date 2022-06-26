import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

import { Planning } from "./components/Planning/Planning";
import Home from "./components/Home/Home";
import ResponsiveAppBar from "./components/Menu/ResponsiveAppBar";
import { DataProvider } from "./provider/DataProvider";
import { SignIn } from "./components/SignIn/SignIn";
import Dashboard from "./components/Dashboard/Dashboard";
import { SignUp } from "./components/SignIn/Signup";
import { MainDataProvider } from "./provider/MainDataProvider";
// import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/Error/ErrorFallback";
import { PersonalForm } from "./components/Dashboard/PersonalForm";
import { PrivateTravels } from "./components/Dashboard/PrivateTravels";
import { LogOut } from "./components/SignIn/LogOut";
import { NewTravel } from "./components/Dashboard/NewTravel";
import { HomeDashboard } from "./components/Dashboard/HomeDashboard";
import { TravelInfo } from "./components/TravelElements/TravelInfo";
import { MainMenu } from "./components/TravelElements/MainMenu";
import { DocumentImport } from "./components/TravelElements/DocumentImport.js";
import { Welcome } from "./components/Planning/ToolbarScreens/Welcome";
import { StepList } from "./components/Planning/ToolbarScreens/StepList";
import { TripList } from "./components/Planning/ToolbarScreens/TripList";
import { InterestPointList } from "./components/Planning/ToolbarScreens/InterestPointList";
import { StepDetails } from "./components/Planning/ToolbarScreens/StepDetails";
import { Outlet } from "react-router-dom";
import { EditStep } from "./components/Planning/ToolbarScreens/EditStep";
import { InterestPointDetail } from "./components/Planning/ToolbarScreens/InterestPointDetail";
import { EditInterestPoint } from "./components/Planning/ToolbarScreens/EditInterestPoint";
import { TripDetail } from "./components/Planning/ToolbarScreens/TripDetail";
import { EditTrip } from "./components/Planning/ToolbarScreens/EditTrip";
import { Notifications } from "./components/Dashboard/Notifications";
import Participants from "./components/Dashboard/Participants";
import Album from "./components/Album/Album";
import PhotoCredit from "components/PhotoCredit";
import TodosMenu from "components/TravelElements/TodosMenu";
import { AuthProvider } from "provider/AuthProvider";
import { PublicAlbum } from "components/PublicViews/PublicAlbum";
import { TravelAlbum } from "components/Dashboard/TravelAlbum";
import "./App.css";

import api from "api/api";
import { url_prefix } from "api/util";
import { Typography } from "@mui/material";
import { TodoListPlanning } from "./components/Planning/ToolbarScreens/TodoListPlanning";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <MainDataProvider>
            <div style={{ background: theme.palette.primary.lighty }}>
              {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
              <ResponsiveAppBar />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/credits" element={<PhotoCredit />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                >
                  <Route
                    path="newTravel"
                    element={
                      <PrivateRoute>
                        <NewTravel />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="notifications"
                    element={
                      <PrivateRoute>
                        <Notifications />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <HomeDashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="informations"
                    element={
                      <PrivateRoute>
                        <PersonalForm />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="travel"
                    element={
                      <PrivateRoute>
                        <PrivateTravels />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="travel/:idTravel"
                    element={
                      <PrivateRoute>
                        <DataProvider>
                          <MainMenu />
                        </DataProvider>
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<TravelInfo />} />

                    {/* <Route path="info" element={
                        <PrivateRoute>
                          <TravelInfo />
                        </PrivateRoute>
                      } /> */}
                    <Route
                      path="documents"
                      element={
                        <PrivateRoute>
                          <DocumentImport />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="album"
                      element={
                        <PrivateRoute>
                          <TravelAlbum />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="taches"
                      element={
                        <PrivateRoute>
                          <TodosMenu />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="participants"
                      element={
                        <PrivateRoute>
                          <Participants />
                        </PrivateRoute>
                      }
                    />
                  </Route>
                </Route>
                <Route
                  path="/logout"
                  element={
                    <PrivateRoute>
                      <LogOut />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
                <Route
                  path="/travel/:idTravel"
                  element={
                    <PublicTravel>
                      <DataProvider>
                        <Planning />
                      </DataProvider>
                    </PublicTravel>
                  }
                >
                  <Route index element={<Welcome />} />
                  <Route path="welcome" element={<Welcome />} />
                  <Route
                    path="steps/:id"
                    element={
                      <PublicTravel>
                        <StepDetails />
                      </PublicTravel>
                    }
                  ></Route>
                  <Route
                    path="steps/:id/edit"
                    element={
                      <PrivateRoute>
                        <EditStep />
                      </PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="steps"
                    element={
                      <PublicTravel>
                        <StepList />
                      </PublicTravel>
                    }
                  ></Route>
                  <Route
                    path="todos"
                    element={
                      <PublicTravel>
                        <TodoListPlanning />
                      </PublicTravel>
                    }
                  ></Route>
                  <Route
                    path="interestpoints/:id"
                    element={
                      <PublicTravel>
                        <InterestPointDetail />
                      </PublicTravel>
                    }
                  ></Route>
                  <Route
                    path="interestpoints/:id/edit"
                    element={
                      <PrivateRoute>
                        <EditInterestPoint />
                      </PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="interestpoints"
                    element={
                      <PublicTravel>
                        <InterestPointList />
                      </PublicTravel>
                    }
                  />
                  <Route
                    path="trips/:id"
                    element={
                      <PublicTravel>
                        <TripDetail />
                      </PublicTravel>
                    }
                  ></Route>
                  <Route
                    path="trips/:id/edit"
                    element={
                      <PrivateRoute>
                        <EditTrip />
                      </PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="trips"
                    element={
                      <PublicTravel>
                        <TripList />
                      </PublicTravel>
                    }
                  />
                </Route>
                {/* Public routes READ ONLY */}
                <Route path="view/:uidTravel/album" element={<PublicAlbum />} />

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              {/* </ErrorBoundary> */}
            </div>
          </MainDataProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function PublicTravel({ children }: { children: JSX.Element }) {
  const params = useParams();

  const id = params.idTravel ? parseInt(params.idTravel) : undefined;
  const {
    data: travel,
    isError: travelError,
    isLoading: travelLoading,
  } = useQuery(["travel", id], () => {
    const token = window.localStorage.getItem("token");
    return fetch(`${url_prefix}/travel/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  });

  return (
    <>
      {!travelLoading ? (
        !travelError ? (
          <>{children}</>
        ) : (
          <>
            <Typography style={{ color: "red" }}>
              You are not authorized to access this resource
            </Typography>
          </>
        )
      ) : (
        <p>LOADING...</p>
      )}
    </>
  );
}

function PrivateRoute({ children }: { children: JSX.Element }) {
  const params = useParams();
  const id = params.idTravel ? parseInt(params.idTravel) : undefined;
  const { data: isAuthorized, isLoading: isLoadingIsAuthorized } = useQuery(
    ["isAuthorized", id],
    () => {
      return api.get({ route: `isAuthorized`, hasToken: true, idTravel: id });
    }
  );

  let isLoggedIn = localStorage.getItem("token") !== null;
  let location = useLocation();

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Navigate to="/signin" state={{ from: location }} replace />
        </>
      ) : !isLoadingIsAuthorized ? (
        isAuthorized === false ? (
          <>
            <Typography style={{ color: "red" }}>
              You are not authorized to access this resource
            </Typography>
          </>
        ) : (
          <>{children}</>
        )
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
