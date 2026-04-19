const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Chat = require('../models/Chat');
const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');
// const chatRepo = require('../repositories/chat.repository');
// const chatService = require('../services/chat.service');

const createChat = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const title = req.body.title || 'New Chat';

  const newChat = await Chat.create({
    title,
    userId,
  });

  res.status(201).json({
    ok: true,
    chatId: newChat._id,
    title: newChat.title,
  });
});

const getAllChats = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const chats = await Chat.find({ userId })
    .select('-userId -__v')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Chat.countDocuments({ userId });

  res.status(200).json({
    ok: true,
    chats,
    pagination: {
      total,
      page,
      Pages: Math.ceil(total / limit),
    },
  });
});

const getChat = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { chatId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(400).json({ ok: false, error: 'Invalid chat ID format' });
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;

  const chat = await Chat.findOne({ _id: chatId, userId })
    .select('-userId -__v')
    .lean();

  if (!chat) {
    return res
      .status(404)
      .json({ ok: false, error: 'Chat not found or unauthorized' });
  }

  const chatMessages = await ChatMessage.find({ chatId })
    .select('-userId -__v')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalMessages = await ChatMessage.countDocuments({ chatId });

  res.status(200).json({
    ok: true,
    pagination: {
      totalMessages,
      page,
      totalPages: Math.ceil(totalMessages / limit),
    },
    chat,
    chatMessages,
  });
});

const deleteChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { userId } = req.user;

  if (!mongoose.Types.ObjectId.isValid(chatId))
    return res.status(400).json({ ok: false, error: 'Invalid chat ID format' });

  const chat = await Chat.findOneAndDelete({ _id: chatId, userId });
  if (!chat)
    return res.status(404).json({ ok: false, error: 'Chat not found' });

  await ChatMessage.deleteMany({ chatId });

  return res.status(204).send();
});

const updateChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { userId } = req.user;
  const { title } = req.body;

  if (!mongoose.Types.ObjectId.isValid(chatId))
    return res.status(400).json({ ok: false, error: 'Invalid chat ID format' });

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res
      .status(400)
      .json({ ok: false, error: 'A valid text title is required' });
  }

  // must update
  const chat = await Chat.findOneAndUpdate(
    { _id: chatId, userId },
    { $set: { title } },
    { new: true, runValidators: true }
  ).select('-userId -__v');

  if (!chat)
    return res.status(404).json({ ok: false, error: 'Chat not found' });

  res.status(200).json({ ok: true, chat });
});

module.exports = {
  createChat,
  getAllChats,
  getChat,
  updateChat,
  deleteChat,
};
