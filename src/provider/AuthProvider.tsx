import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { checkStatus, url_prefix } from "../api/util";
import { Traveler } from "../model/Traveler";
import "./loading.css";
import theme from "../../src/theme/theme";

export interface AuthContextProps {
  user: Traveler | null;
  signup: (credentials: any) => Promise<void>;
  signin: (credentials: any) => Promise<void>;
  signout: () => void;
  updateTraveler: (idTraveler: number, credentials: any) => Promise<void>;
  deleteTraveler: (idTraveler: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>(undefined!);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    fetch(`${url_prefix}/traveler/whoami`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(checkStatus)
      .then((res) => res.json())
      .then((user) => {
        // console.log("setUSer");
        setUser(user);
        setLoading(false);
      })
      .catch(() => {
        window.localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
        // navigate("/");
      });
  }, []);

  if (loading) {
    // return <h4>Checking authentication...</h4>;
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: theme.palette.primary.lighty,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div id="loading"></div>
      </div>
    );
  }

  const signup = (credentials: any) => {
    return api
      .create({
        route: Traveler.routeName + "/signup",
        body: new Traveler(credentials),
        hasToken: false,
      })
      .then(() => {
        navigate("/signin");
      });
  };

  const signin = (credentials: any) => {
    return api
      .create({
        route: Traveler.routeName + "/signin",
        body: credentials,
        hasToken: false,
      })
      .then((data) => {
        window.localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate("/dashboard");
      });
  };

  const signout = () => {
    window.localStorage.removeItem("token");
    setUser(null);
    navigate("/home");
  };

  const updateTraveler = (idTraveler: number, credentials: any) => {
    return api
      .update({
        route: Traveler.routeName,
        id: idTraveler,
        body: credentials,
        hasToken: true,
      })
      .then((user) => {
        setUser(user);
      });
  };

  const deleteTraveler = (idTraveler: number) => {
    return api
      .delete({
        route: Traveler.routeName,
        id: idTraveler,
        hasToken: true,
      })
      .then(() => {
        signout();
      });
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, signin, signout, updateTraveler, deleteTraveler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
