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

  const signUp = async (
    email: string,
    password: string,
    profile?: {
      firstName: string;
      lastName: string;
      username: string;
    }
  ) => {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (!error && data.user && profile) {
      const { error: profileError } = await supabaseClient
        .from("profiles")
        .update({
          name: `${profile.firstName} ${profile.lastName}`,
          username: profile.username,
        })
        .eq("id", data.user.id);

      if (profileError) {
        console.error("Error updating profile:", profileError);
      }
    }

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
