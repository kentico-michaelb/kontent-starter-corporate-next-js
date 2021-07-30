import React from "react";
import get from "lodash.get";
import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Head from "next/head";
import { hydrateContentItemListingResponse, hydrateContentItemSingleResponse } from "../lib/api";


function MyApp({ Component, pageProps }) {

  const configObject = get(pageProps, "data.config") && hydrateContentItemSingleResponse(pageProps.data.config);
  const pageObject = get(pageProps, "data.page") && hydrateContentItemSingleResponse(pageProps.data.page);
  const listingSections = get(pageProps, "data.listingSections") && Object.fromEntries(
    Object.entries(pageProps.data.listingSections)
      .map(([key, value]) => [key, hydrateContentItemListingResponse(value)])
  );
  const listingItems = get(pageProps, "data.listingItems") && Object.fromEntries(
    Object.entries(pageProps.data.listingItems)
      .map(([key, value]) => [key, hydrateContentItemListingResponse(value)])
  );


  const font = get(configObject, "item.font.value[0].codename", null);
  const fontName = font === "nunito_sans"
    ? "Nunito Sans"
    : font === "fira_sans"
      ? "Fira Sans"
      : "Arial";

  let title = get(configObject, "item.title.value", "");
  if (title) {
    title += " | ";
  }
  title += get(pageProps, "seo.title", null);

  const palette = (get(configObject, "item.palette.value[0].codename", null));
  const colors = {
    primary: "#F05A22",
    secondary: "#B72929"
  };

  switch (palette) {
    case "blue":
      colors.primary = "#3553B8";
      colors.secondary = "#81D4FA";
      break;
    case "cyan":
      colors.primary = "#007C91";
      colors.secondary = "#5DDEF4";
      break;
    case "green":
      colors.primary = "#2C9E7E";
      colors.secondary = "#4b830d";
      break;
    case "purple":
      colors.primary = "#7D3F9C";
      colors.secondary = "#7986cb";
      break;
    case "default":
    default:
      break;
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
      background: {
        default: "#FFF",
      },
    },
    typography: {
      fontFamily: [
        fontName,
        "sans-serif"
      ]
    },
  });

  // https://material-ui.com/guides/server-rendering/#the-client-side
  // https://github.com/mui-org/material-ui/tree/master/examples/nextjs
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google" content="notranslate" />

        {get(configObject, "item.favicon.value[0]", null) && (
          <link rel="icon" href={get(configObject, "item.favicon.value[0].url", null)} />
        )}

        <meta name="description" content={get(pageProps, "seo.description", null)} />
        {get(pageProps, "seo.keywords", null) && (
          <meta name="keywords" content={get(pageProps, "seo.keywords", null)} />
        )}
        {get(pageProps, "seo.canonicalUrl", null) ?? (
          <link rel="canonical" href={get(pageProps, "seo.canonicalUrl", null)} />
        )}
        {get(pageProps, "seo.noIndex", null) && (
          <meta name="robots" content="noindex,follow" />
        )}

        {(font !== "system-sans") && (
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        )}
        {(font === "nunito_sans") ? ([
          <link key="0" href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" as="style" rel="preload" />,
          <link key="1" href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" media="print" onLoad="this.media='all'" />,
          <noscript key="2">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            />
          </noscript>
        ]) : ((font === "fira_sans") && ([
          <link key="0" href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap" as="style" rel="preload" />,
          <link key="1" href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap" rel="stylesheet" media="print" onLoad="this.media='all'" />,
          <noscript key="2">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            />
          </noscript>
        ]))}

      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} configObject={configObject} pageObject={pageObject} listingSections={listingSections} listingItems={listingItems} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;