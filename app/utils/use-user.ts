import { useMatches } from "@remix-run/react";
import type { User } from "@supabase/supabase-js";
import type { RootLoaderData } from "~/root";
import { useMemo } from "react";

function useMatchesData<T>(id: string): T | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return (route?.data as T) || undefined;
}

export function useUser(): User | null {
  const data = useMatchesData<RootLoaderData>("root");
  const { user } = data || {};
  return user || null;
}
