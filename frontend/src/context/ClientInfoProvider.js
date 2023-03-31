import React, { createContext, useState, useContext } from "react";

const UserInfoContext = createContext({
  userState: {},
  setUserState: {},
});

const UserInfoProvider = ({
  children,
  value = {
    client_id: "",
    vet_id: "",
    email: "",
    phone_number: "",
    address: "",
    birth_date: "",
    firstname: "",
    lastname: "",
    password: "",
    cash_balance: 0,
    profile_picture_url:
      "https://storage.googleapis.com/sopet1/458ea5f4-027e-4449-91a7-c1e0bdd53723",
  },
}) => {
  const [userState, setUserState] = useState(value);
  return (
    <UserInfoContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserInfoContext.Provider>
  );
};

const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a UserInfoContext");
  }
  return context;
};

export { UserInfoProvider, useUserInfo };
