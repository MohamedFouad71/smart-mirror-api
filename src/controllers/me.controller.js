const asyncHandler = require('express-async-handler');

const { fetchUserOr404 } = require('../utils/me.controllerHelpers');
const User = require('../models/User');
const {
  generateTrainingSchedule,
  generateDiet,
} = require('../services/me.service');

exports.me = async (req, res) => {
  const user = await fetchUserOr404(req.user.userId, '-passwordHash', res);
  if (!user) return;
  res.json({ ok: true, user });
};

exports.createTrainingSchedule = asyncHandler(async (req, res) => {
  const user = await fetchUserOr404(req.user.userId, 'trainingSchedule', res);
  if (!user) return;

  const schedule = await generateTrainingSchedule(user);
  user.trainingSchedule = schedule;
  await user.save();

  res.status(201).json({ ok: true, schedule: user.trainingSchedule });
});

exports.getTrainingSchedule = asyncHandler(async (req, res) => {
  const user = await fetchUserOr404(req.user.userId, 'trainingSchedule', res);
  if (!user) return;

  res.status(200).json({ ok: true, schedule: user.trainingSchedule });
});

exports.deleteTrainingSchedule = asyncHandler(async (req, res) => {
  const user = await fetchUserOr404(req.user.userId, 'trainingSchedule', res);
  if (!user) return;

  user.trainingSchedule = [];
  await user.save();

  res.status(200).json({ ok: true, message: 'schedule deleted successfully' });
});

exports.createDiet = asyncHandler(async (req, res) => {
  const user = await fetchUserOr404(req.user.userId, 'diet', res);
  if (!user) return;

  const diet = await generateDiet(user);
  user.diet = diet;
  await user.save();

  res.status(201).json({ ok: true, diet: user.diet });
});

exports.getDiet = asyncHandler(async (req, res) => {
  const user = await fetchUserOr404(req.user.userId, 'diet', res);
  if (!user) return;

  res.status(200).json({ ok: true, diet: user.diet });
});

exports.deleteDiet = asyncHandler(async (req, res) => {
  const user = await fetchUserOr404(req.user.userId, 'diet', res);
  if (!user) return;

  user.diet = [];
  await user.save();

  res.status(200).json({ ok: true, message: 'diet deleted successfully' });
});
