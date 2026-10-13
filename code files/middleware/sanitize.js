// Blocks NoSQL operator injection ($, .) and escapes basic XSS characters.
const clean = (obj) => {
  if (Array.isArray(obj)) return obj.map(clean);
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k.startsWith("$") || k.includes(".")) continue;
      out[k] = clean(v);
    }
    return out;
  }
  return typeof obj === "string" ? obj.replace(/</g, "&lt;").replace(/>/g, "&gt;") : obj;
};

module.exports = (req, res, next) => {
  if (req.body) req.body = clean(req.body);
  if (req.query) {
    const q = clean(req.query);
    for (const k of Object.keys(req.query)) delete req.query[k];
    Object.assign(req.query, q);
  }
  next();
};
