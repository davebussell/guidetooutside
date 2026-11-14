// Restored from client module 70143 (exports: parseZoneQuery)
export const parseZoneQuery = function (e) {
  let t = e.trim().match(/^(?:zone\s*)?(\d{1,2})\s*([ab])?$/i);
  if (!t) return null;
  let r = Number(t[1]);
  return r >= 2 && r <= 11 ? String(r) : null;
};
