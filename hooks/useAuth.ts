import { useSessionContext } from "@/providers/AuthProvider";

export const useAuth = () => {
  const { session, isLoading, error, supabaseClient } = useSessionContext();

  const signIn = async (email: string, password: string) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    return { error };
  };

  return {
    session,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
  };
};
