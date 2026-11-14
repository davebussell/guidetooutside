// Restored from client module 89542 (exports: theRegion)
export const theRegion = (e) => (/^(Atlantic|Continental|Mediterranean|Madagascar)\b/.test(e) ? e : `the ${e}`);
