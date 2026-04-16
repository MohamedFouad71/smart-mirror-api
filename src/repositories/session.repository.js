const Session = require('../models/Session');

const create = async (data) => {
  return await Session.create(data);
};

const findLatestByUser = async (userId) => {
  return await Session.findOne({ userId }).sort({ ts: -1 });
};

const findAll = async (query) => {
  return await Session.find(query).sort({ ts: -1 }).limit(500);
};

const findByIdAndUser = async (id, userId) => {
  return await Session.findOne({ _id: id, userId });
};

const findByUserAndDateRange = async (userId, start, end, extra = {}) => {
  return await Session.find({
    userId,
    ts: { $gte: start, $lte: end },
    ...extra,
  });
};

module.exports = {
  create,
  findLatestByUser,
  findAll,
  findByUserAndDateRange,
  findByIdAndUser,
};