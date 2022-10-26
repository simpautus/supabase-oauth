import type { Location } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";

type SignInResult = (
  | {
      success: true;
      accessToken: string;
      refreshToken: string;
    }
  | {
      success: false;
      accessToken?: string;
      refreshToken?: string;
    }
) & {
  providerToken?: string;
  expiresIn?: string;
  tokenType?: string;
};

function getCredentials(location: Location): SignInResult {
  const { hash } = location;

  if (!hash) return { success: false };

  const urlParams = new URLSearchParams(hash.replace("#", ""));
  const {
    access_token,
    refresh_token,
    provider_token,
    expires_in,
    token_type,
  } = Object.fromEntries(urlParams);

  if (!access_token || !refresh_token) return { success: false };

  return {
    success: true,
    accessToken: access_token,
    refreshToken: refresh_token,
    providerToken: provider_token,
    expiresIn: expires_in,
    tokenType: token_type,
  };
}

export function useSignInCallback() {
  const location = useLocation();
  const { submit } = useFetcher();

  const [handled, setHandled] = useState(false);

  useEffect(() => {
    if (!handled) {
      const { success, accessToken, refreshToken } = getCredentials(location);
      if (success) {
        submit(
          {
            accessToken,
            refreshToken,
          },
          {
            method: "post",
            action: "/api/auth/login",
          }
        );
      }
    }
    setHandled(true);
  }, [submit, location, handled]);
}
