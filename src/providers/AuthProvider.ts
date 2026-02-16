import { authClient } from "@/lib/auth-client";
import { AuthProvider } from "@refinedev/core";
import { getSession } from "better-auth/api";

export const authProvider: AuthProvider = {
  // --
  login: async ({ email, password, rememberMe }) => {
    // You can handle the login process according to your needs.

    // // If the process is successful.
    // return {
    //   success: true,
    // };

    try {
      const { data, error } = await authClient.signIn.email({
        email, // required
        password, // required
        rememberMe,
        callbackURL: window.location.origin,
      });

      if (!data?.token) {
        return {
          success: false,
          error: {
            name: "Login Error",
            message: error,
          },
        };
      }

      return {
        success: true,
        successNotification: "User succesfully logged in",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "Login Error",
          message: error,
        },
      };
    }
  },

  register: async ({ name, email, password, role }) => {
    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
      });

      console.log(data);
      // You can handle the register process according to your needs.

      // If the process is successful.
      return {
        success: true,
        redirectTo: "/login",
        successNotification: {
          message: "User has been successfully registered",
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "Register Error",
          message: error,
        },
      };
    }
  },
  check: async () => {
    try {
      const { data } = await authClient.getSession();

      if (data?.session) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        redirectTo: "/login",
      };
    } catch {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },

  getIdentity: async () => {
    const user = await getSession();
    return user;
  },
  logout: async () => {
    await authClient.signOut();
    // ...
    return {
      success: true,
      redirectTo: "/login",
      successNotification: {
        message: "Logout Successful",
        description: "You have successfully logged out.",
      },
    };
  },
  // --
};
