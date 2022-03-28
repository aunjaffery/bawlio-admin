import React, { useEffect, useState } from "react";
import jwtService from "./jwt_service";
import { useAuthStore } from "./store/auth_store";

const Auth = ({ children }) => {
  const { setUserData, setLogin, logoutUser } = useAuthStore((state) => state);

  const [waitAuthCheck, setWaitAuthCheck] = useState(true);

  useEffect(() => {
    jwtCheck().then(() => setWaitAuthCheck(false));
  }, []);
  const jwtCheck = () =>
    new Promise((resolve) => {
      jwtService.on("onAutoLogin", () => {
        jwtService
          .signInWithToken()
          .then((user) => {
            setUserData(user);
            setLogin();

            resolve();

            console.log("Auto Logged in with JWT");
          })
          .catch((error) => {
            console.log("Token Expired");
            logoutUser();
            resolve();
          });
      });

      jwtService.on("onAutoLogout", (message) => {
        if (message) {
          console.log("Auto Logout");
        }

        logoutUser();

        resolve();
      });

      jwtService.on("onNoAccessToken", () => {
        resolve();
      });

      jwtService.init();

      return Promise.resolve();
    });
  return <>{waitAuthCheck ? "" : <React.Fragment children={children} />}</>;
};

export default Auth;
