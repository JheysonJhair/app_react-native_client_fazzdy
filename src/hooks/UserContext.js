import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    IdUsuario: "",
    Email: "",
    Contrasena: "",
    Nombre: "",
    Apellido: "",
    Telefono: "",
  });

  const setUserInfo = ({
    IdUsuario,
    Email,
    Contrasena,
    Nombre,
    Apellido,
    Telefono,
  }) => {
    setUserData({
      ...userData,
      IdUsuario,
      Email,
      Contrasena,
      Nombre,
      Apellido,
      Telefono,
    });
  };

  return (
    <UserContext.Provider value={{ userData, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export const setUserData = (data) => {
  setUserInfo(data);
};