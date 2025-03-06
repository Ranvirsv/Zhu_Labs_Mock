import { createContext, ReactNode, useContext, useState } from "react";

// Interface indicating the shape of the context object
interface UserContextType {
  userDetails: string;
  setUserDetails: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * ### UserContext
 * This is the context object that is used to share the user's details between components.
 * So when passing down our context, we're going to pass down an object with two properties:
 * - `userDetails`: a string representing the user's details
 * - `setUserDetails`: a function that sets the user's details
 */
const UserContext = createContext<UserContextType>({
  userDetails: "",
  setUserDetails: () => {},
});

/**
 * ### UserProvider
 * Component that provides the UserContext to its children. The UserContext represents
 *
 * ### State and Hooks:
 * - `userDetails`: a string representing the user's details
 *
 * @param children Child components that are wrapped by the UserProvider
 */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<string>("");

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook used to access the context object
const useUserContext = () => useContext(UserContext);
export default useUserContext;
