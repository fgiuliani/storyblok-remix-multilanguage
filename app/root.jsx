import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import styles from "./styles/app.css";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "./components/Feature";
import Grid from "./components/Grid";
import Page from "./components/Page";
import Teaser from "./components/Teaser";
import HeroSection from "./components/HeroSection";
import AllArticles from "./components/AllArticles";
import Article from "./components/Article";

import { json } from "@remix-run/node";
import { useChangeLanguage } from "remix-i18next";
import { useTranslation } from "react-i18next";
import i18next from "~/i18next.server";

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  hero_section: HeroSection,
  all_articles: AllArticles,
  article: Article,
};

storyblokInit({
  accessToken: "K2l9dzRizRmbiXhwnuBFMgtt",
  use: [apiPlugin],
  components,
});

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export let loader = async ({ request }) => {
  let locale = await i18next.getLocale(request);
  return json({ locale });
};

export let handle = {
  i18n: "common",
};

export const meta = () => ({
  charset: "utf-8",
  title: "Storyblok Remix Multilanguage",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  // Get the locale from the loader
  let { locale } = useLoaderData();
  let { i18n } = useTranslation();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />

        <Links />
      </head>

      <body>
        <Outlet />

        <ScrollRestoration />

        <Scripts />

        <LiveReload />
      </body>
    </html>
  );
}
