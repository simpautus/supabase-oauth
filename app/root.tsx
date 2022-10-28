import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { User } from "@supabase/supabase-js";
import type { WindowEnvironment } from "~/utils/env.server";
import { windowEnv } from "~/utils/env.server";

import styles from "./styles/app.css";
import { getUser } from "./utils/session";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export type RootLoaderData = {
  windowEnv: WindowEnvironment;
  user: User | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json<RootLoaderData>({ windowEnv, user });
};

export default function App() {
  const { windowEnv } = useLoaderData<RootLoaderData>();

  /**
   * This is moved to '/api/auth/callback' where
   * successful OAuth login is redirected


  // // Sign in with credentials from window.location.hash
  // // Uncomment to use and comment out useEffect below
  // const { useOnSignInCallBack } = useSignIn();
  // useOnSignInCallBack();

  // // Sign in with onAuthStateChange subscription
  // // Uncomment to use and comment out useSignInCallback hook above
  // const { useOnAuthStateChange } = useSignIn();
  // useOnAuthStateChange();

  */

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
