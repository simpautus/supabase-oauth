import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import type { WindowEnvironment } from "~/utils/env.server";
import { windowEnv } from "~/utils/env.server";
import { useEffect } from "react";

import styles from "./styles/app.css";
import supabase from "./utils/supabase";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  windowEnv: WindowEnvironment;
};

export const loader = () => {
  return json<LoaderData>({ windowEnv });
};

export default function App() {
  const { windowEnv } = useLoaderData<LoaderData>();

  const fetcher = useFetcher();

  useEffect(() => {
    const {
      data: { subscription: listener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log({ event });
      if (event === "SIGNED_IN" && session?.access_token) {
        fetcher.submit(
          {
            accessToken: session.access_token,
            refreshToken: session.refresh_token,
          },
          {
            method: "post",
            action: "/api/auth/login",
          }
        );
      }
      if (event === "SIGNED_OUT") {
        fetcher.submit(null, {
          method: "post",
          action: "/api/auth/logout",
        });
      }
    });

    return () => {
      listener?.unsubscribe();
    };
  }, [fetcher]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(windowEnv)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
