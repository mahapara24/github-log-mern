import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://github-log-mern-hzndn7h9v-mahapara24.vercel.app/",
          { credentials: "include" }
        ); //proxy set http://localhost:5000
        const data = await res.json();
        setAuthUser(data.user); //wil be null or authenticated object
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
