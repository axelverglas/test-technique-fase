import type { Session } from "@supabase/supabase-js";
import { AuthError, type User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { router, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";

export interface SessionContextHelper {
  session: Session | null;
  error: AuthError | null;
  isLoading: boolean;
  supabaseClient: typeof supabase;
}

export interface AuthProviderProps {
  children: React.ReactNode;
  initialSession?: Session | null;
}

export const SessionContext = createContext<SessionContextHelper>({
  session: null,
  error: null,
  isLoading: false,
  supabaseClient: supabase,
});

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({
  children,
  initialSession,
}: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(
    initialSession || null
  );
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useProtectedRoute(session?.user ?? null);

  useEffect(() => {
    setIsLoading(true);
    supabase.auth
      .getSession()
      .then(({ data: { session: newSession } }) => {
        setSession(newSession);
      })
      .catch((error) => setError(new AuthError(error.message)))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider
      value={
        session
          ? {
              session,
              isLoading: false,
              error: null,
              supabaseClient: supabase,
            }
          : error
          ? {
              error,
              isLoading: false,
              session: null,
              supabaseClient: supabase,
            }
          : {
              error: null,
              isLoading,
              session: null,
              supabaseClient: supabase,
            }
      }
    >
      <AuthStateChangeHandler />
      {children}
    </SessionContext.Provider>
  );
};
export function useProtectedRoute(user: User | null) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    console.log(
      "useProtectedRoute - user:",
      !!user,
      "segments:",
      segments,
      "inAuthGroup:",
      inAuthGroup
    );

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      console.log("Redirection vers /(auth)");
      replaceRoute("/(auth)/choice");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      console.log("Redirection vers /");
      router.dismissAll();
      router.replace("/");
    }
  }, [user, segments]);
}

/**
 * temporary fix
 *
 * see https://github.com/expo/router/issues/740
 * see https://github.com/expo/router/issues/745
 *  */
const replaceRoute = (href: string) => {
  console.log("replaceRoute appelé avec:", href);
  if (Platform.OS === "ios") {
    setTimeout(() => {
      console.log("Exécution de router.push vers:", href);
      router.push(href as any);
    }, 100); // Augmentons légèrement le délai
  } else {
    setTimeout(() => {
      console.log("Exécution de router.push vers:", href);
      router.push(href as any);
    }, 100);
  }
};

const useRedirectAfterSignOut = () => {
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    const signOutListener = supabaseClient.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        replaceRoute("/");
      }
    });
    return () => {
      signOutListener.data.subscription.unsubscribe();
    };
  }, [supabaseClient]);
};

export const AuthStateChangeHandler = () => {
  useRedirectAfterSignOut();
  return null;
};
