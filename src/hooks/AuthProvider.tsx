import * as React from 'react';
import {updateTokenCacheFromLocal} from '../utils/token';

updateTokenCacheFromLocal();

interface UserType {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: UserType;
  setUser: (value: UserType) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const initialState = {
  id: '',
  name: '',
  email: '',
  token: '',
};

const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = React.useState(initialState);
  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = React.useContext(AuthContext) as AuthContextType;
  return auth;
};
