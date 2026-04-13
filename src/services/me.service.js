const { GoogleGenAI } = require('@google/genai');

const {
  DIET_SYSTEM_PROMPT,
  SCHEDULE_SYSTEM_PROMPT,
} = require('../constants/prompts');

/**
 * Generates a workout schedule using Gemini.
 * @param {Object} userProfile - The user's physical profile and goals
 * @returns {Object} The parsed JSON schedule
 */
exports.generateTrainingSchedule = async (userProfile) => {
  try {
    const aiClient = new GoogleGenAI({});
    const profileString = JSON.stringify(userProfile);
    const response = await aiClient.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: SCHEDULE_SYSTEM_PROMPT + '\n\nUser Profile: ' + profileString,
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error('Error generating training schedule:', error);
    throw error;
  }
};

/**
 * Generates a workout schedule using Gemini.
 * @param {Object} userProfile - The user's physical profile and goals
 * @returns {Object} The parsed JSON schedule
 */
exports.generateDiet = async (userProfile) => {
  try {
    const aiClient = new GoogleGenAI({});
    const profileString = JSON.stringify(userProfile);
    const response = await aiClient.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: DIET_SYSTEM_PROMPT + '\n\nUser Profile: ' + profileString,
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error('Error generating training schedule:', error);
    throw error;
  }
};
