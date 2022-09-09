import { createMemorySessionStorage } from "@remix-run/node";

export default sessionStorage = createMemorySessionStorage({
  cookie: { name: "session", secrets: ["s3cr3t"] },
});
