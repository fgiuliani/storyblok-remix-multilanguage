import Layout from "../components/Layout";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import i18next from "~/i18next.server";
import sessionStorage from "~/sessionStorage";

import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
} from "@storyblok/react";

export default function Page() {
  let story = useLoaderData();
  story = useStoryblokState(story);

  return (
    <Layout>
      <StoryblokComponent blok={story.content} />
    </Layout>
  );
}

export const loader = async ({ request, params }) => {
  let slug = params["*"] ?? "home";
  slug = slug.endsWith("/") ? slug.slice(0, -1) : slug;

  let session = await sessionStorage.getSession();
  const selectedLanguage = new URL(request.url).searchParams.get("lng");

  console.log(selectedLanguage);

  if (selectedLanguage) {
    session.set("lng", selectedLanguage);
  }

  request = new Request(request.url, {
    headers: { Cookie: await sessionStorage.commitSession(session) },
  });

  let locale = await i18next.getLocale(request);

  console.log(locale);

  let sbParams = {
    version: "draft",
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return json(data?.story);
};
