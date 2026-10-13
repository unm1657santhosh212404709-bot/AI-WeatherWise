// Gemini-powered summaries and recommendations, with a rule-based fallback.
const { GoogleGenAI } = require("@google/genai");

const describe = (w) =>
  `${w.city}: ${w.temperature}°C (feels ${w.feelsLike}°C), ${w.condition}, humidity ${w.humidity}%, wind ${w.windSpeed} m/s`;

const ask = async (prompt, fallbackText) => {
  if (!process.env.GEMINI_API_KEY) return { text: fallbackText, source: "fallback" };
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const r = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
    return { text: r.text, source: "gemini" };
  } catch (err) {
    console.error("Gemini error:", err.message);
    return { text: fallbackText, source: "fallback" };
  }
};

exports.summary = (w) =>
  ask(
    `Write a friendly 2-3 sentence natural language weather summary for: ${describe(w)}.`,
    `Currently in ${w.city} it is ${w.temperature}°C with ${w.condition}. Humidity is ${w.humidity}% and wind speed is ${w.windSpeed} m/s.`
  );

exports.recommendations = (w) => {
  const t = w.temperature;
  const cloth = t < 15 ? "Wear a warm jacket." : t < 27 ? "Light layers are fine." : "Wear light, breathable clothing and stay hydrated.";
  const rainy = /rain|storm|drizzle/i.test(w.condition);
  const act = rainy ? "Consider indoor activities like museums or cafes." : "Great time for walking, sightseeing or outdoor activities.";
  return ask(
    `Given the weather (${describe(w)}), give a short bulleted list of clothing and outdoor activity recommendations for a traveler.`,
    `${cloth} ${act}`
  );
};
