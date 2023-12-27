import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import sharedStyle from "~/styles/shared.css";
import Error from "./components/util/Error";

export const links = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : [{ rel: "stylesheet", href: sharedStyle }]),
];

export const Document = ({ title, children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />

        <title>{title}</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <Document title="Remix Expenses Tracking">
      <Outlet />
    </Document>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();

  if (error) {
    return (
      <Document title={error.message}>
        <main>
          <Error title={error.status}>
            {error.message}
            <p>
              Back to <Link to="/">Home</Link>
            </p>
          </Error>
        </main>
      </Document>
    );
  }

  return (
    <Document title={`Something went wrong`}>
      <main>
        <Error title={`Something went wrong`}>
          <p>Something went wrong. Please try again later!</p>
          <p>
            Back to <Link to="/">Home</Link>
          </p>
        </Error>
      </main>
    </Document>
  );
};
