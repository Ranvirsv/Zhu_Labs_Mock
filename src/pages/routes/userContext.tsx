import { createContext, ReactNode, useContext, useState } from "react";
interface UserContextType {
  userDetails: string;
  setUserDetails: React.Dispatch<React.SetStateAction<string>>;
}
const UserContext = createContext<UserContextType>({
  userDetails: "",
  setUserDetails: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<string>("");

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);
export default useUserContext;