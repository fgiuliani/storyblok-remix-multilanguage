import { redirect } from "@remix-run/node";
import languageCookie from "~/cookie";

export async function loader({ request }) {
  const url = new URL(request.url);
  const language = url.searchParams.get("language");
  const redirectUrl = url.searchParams.get("redirectUrl");

  return redirect(typeof redirectUrl === "string" ? redirectUrl : "/", {
    headers: {
      "Set-Cookie": await languageCookie.serialize(language),
    },
  });
}
