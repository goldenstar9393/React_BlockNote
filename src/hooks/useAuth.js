// src/hooks/useAuth.js
import { useAuth0 } from "@auth0/auth0-react";

const useAuth = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  const login = async (options) => {
    await loginWithRedirect(options);
  };

  const signup = async (email, password) => {
    await loginWithRedirect({
      email,
      password,
    });
  };

  const signupWithGoogle = async () => {
    await loginWithRedirect({
      connection: "google-oauth2",
    });
  };

  return {
    login,
    signup,
    signupWithGoogle,
    logout,
    user,
    isAuthenticated,
    isLoading,
  };
};

export default useAuth;
