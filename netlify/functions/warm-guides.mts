/**
 * Scheduled: every Sunday at 06:00 UTC, ahead of the Sunday-evening email,
 * hand the week's guide rewriting to the background function, which has the
 * fifteen minutes the work needs (a scheduled function has thirty seconds).
 */
const warmGuides = async () => {
  const base = process.env.URL ?? process.env.DEPLOY_PRIME_URL;
  if (!base) return new Response("no site URL", { status: 500 });
  const res = await fetch(`${base}/.netlify/functions/warm-guides-background`, {
    method: "POST",
    headers: { "x-warm-secret": process.env.WARM_SECRET ?? "" },
  });
  return new Response(`queued: ${res.status}`);
};

export default warmGuides;

export const config = { schedule: "0 6 * * 0" };
