import { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
  });

  const setLocationInfo = ({ latitude, longitude }) => {
    setLocationData({
      latitude,
      longitude,
    });
  };

  return (
    <LocationContext.Provider value={{ locationData, setLocationInfo }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return useContext(LocationContext);
};
