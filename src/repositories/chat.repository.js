const Chat = require('../models/Chat');

/**
 * @param {Object} title
 * @returns {Promise<Object>}
 */
const createChat = async (title) => {
  return Chat.create(title || { title: 'New Chat' });
};

/**
 *
 * @param {object} chatId
 * @returns {Promise<Object>}
 */
const getChat = async (chatId) => {
  return Chat.findOne(chatId);
};

/**
 * @param {object} chatId
 * @returns {Promise<Object>}
 */
const deleteChat = async (chatId) => {
  return Chat.deleteOne(chatId);
};

module.exports = { createChat, deleteChat };
