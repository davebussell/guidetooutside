"use client";
// The kids' land-and-sky tiles read the remembered place (usePlace), so they
// render on the client. The restored module (src/components/kids/LandSkyNav.jsx)
// lacks its "use client" line; this boundary lets the dig page use it from the
// server until it has one.
export { LandSkyNav } from "@/components/kids/LandSkyNav";
