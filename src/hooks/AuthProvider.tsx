import * as React from 'react';
import {getToken, setToken, removeTokens} from '../utils/token';

interface UserType {
  id: string;
  name: string;
  email: string;
  access_token: string;
  refresh_token: string;
}

interface AuthContextType {
  user: UserType;
  signin: (value: UserType) => void;
  signout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const initialState = {
  id: '',
  name: '',
  email: '',
  access_token: '',
  refresh_token: '',
};

const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = React.useState(initialState);

  React.useEffect(() => {
    getToken()
      .then(token => {
        if (token) {
          setUser(prev => {
            return {
              ...prev,
              access_token: token,
            };
          });
        }
      })
      .catch(e => console.log(e));
  }, []);

  const signin = (newUser: UserType) => {
    setUser(newUser);
    setToken(newUser.access_token, newUser.refresh_token);
  };

  const signout = () => {
    setUser(initialState);
    removeTokens();
  };

  return (
    <AuthContext.Provider value={{user, signin, signout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = React.useContext(AuthContext) as AuthContextType;
  return auth;
};
