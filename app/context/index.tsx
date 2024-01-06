"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Listing, Reservation, User } from "../constant";
import axios from "axios";
// import Loading from "../components/Loading";

interface contextProps {
  user: User | null;
  setUser: SetStateAction<Dispatch<User | null>>;
  listings: Listing[];
  setListings: SetStateAction<Dispatch<Listing[]>>;
  favorites: Listing[];
  setFavorites: SetStateAction<Dispatch<Listing[]>>;
  reservations: Reservation[];
  setReservations: SetStateAction<Dispatch<Reservation[]>>;
  loading: true | false;
  setLoading: (val: boolean) => void;
}

export const GlobalContext = createContext<contextProps>({
  user: null,
  setUser: () => {},
  listings: [],
  setListings: () => {},
  favorites: [],
  setFavorites: () => {},
  reservations: [],
  setReservations: () => {},
  loading: false,
  setLoading: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [favorites, setFavorites] = useState<Listing[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/api/user").then((res: any) => setUser(res.data));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        listings,
        setListings,
        favorites,
        setFavorites,
        reservations,
        setReservations,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
