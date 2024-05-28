import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext(); // Create AuthContext

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize isLoggedIn state with value from localStorage, if available
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });

  const [username, setUsername] = useState(() => {
    // Initialize username state with value from localStorage, if available
    const storedUsername = localStorage.getItem("username");
    return storedUsername ? storedUsername : "";
  });

  const [aType, setAType] = useState(() => {
    const storedAType = localStorage.getItem("account_type");
    return storedAType ? storedAType : "";
  });
  const [emailAuth, setEmailAuth] = useState(() => {
    // Initialize username state with value from localStorage, if available
    const storedEmail = localStorage.getItem("email");
    return storedEmail ? storedEmail : "";
  });

  const [favCounty, setFavCounty] = useState(() => {
    // Initialize username state with value from localStorage, if available
    const storedfavCounty = localStorage.getItem("county");
    return storedfavCounty ? storedfavCounty : "";
  });

  useEffect(() => {
    // Update localStorage with the current values of isLoggedIn and username whenever they change
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("username", username);
    localStorage.setItem("account_type", aType);
    localStorage.setItem("email", emailAuth);
    localStorage.setItem("county", favCounty);
  }, [isLoggedIn, username, aType, emailAuth, favCounty]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        username,
        setUsername,
        aType,
        setAType,
        emailAuth,
        setEmailAuth,
        favCounty,
        setFavCounty,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
