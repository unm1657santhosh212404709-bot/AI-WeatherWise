const { getWeather } = require("../utils/weatherService");
const ai = require("../utils/aiService");

exports.currentWeather = async (req, res, next) => {
  try { res.json(await getWeather(req.params.city)); } catch (e) { next(e); }
};

exports.aiSummary = async (req, res, next) => {
  try {
    const weather = await getWeather(req.params.city);
    res.json({ weather, summary: await ai.summary(weather) });
  } catch (e) { next(e); }
};

exports.aiRecommendations = async (req, res, next) => {
  try {
    const weather = await getWeather(req.params.city);
    res.json({ weather, recommendations: await ai.recommendations(weather) });
  } catch (e) { next(e); }
};
