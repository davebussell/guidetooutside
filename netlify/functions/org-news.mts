/**
 * Scheduled: once a day, hand the organisations' feed reading to the
 * background function, which has the fifteen minutes two hundred feeds can
 * take (a scheduled function has thirty seconds).
 */
const orgNews = async () => {
  const base = process.env.URL ?? process.env.DEPLOY_PRIME_URL;
  if (!base) return new Response("no site URL", { status: 500 });
  const res = await fetch(`${base}/.netlify/functions/org-news-background`, {
    method: "POST",
    headers: { "x-warm-secret": process.env.WARM_SECRET ?? "" },
  });
  return new Response(`queued: ${res.status}`);
};

export default orgNews;

export const config = { schedule: "@daily" };
