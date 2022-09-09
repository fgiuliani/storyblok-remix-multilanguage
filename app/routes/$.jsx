import Layout from "../components/Layout";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import i18next from "~/i18next.server";

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

  let locale = await i18next.getLocale(request);

  let sbParams = {
    version: "draft",
    language: locale,
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return json(data?.story);
};
