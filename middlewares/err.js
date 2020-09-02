const CastError = (err, req, res) => {
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).send({ message: `Карточка с _id ${req.params.cardId} не найдена` });
  }
  return res.status(500).send({ message: err.message });
};

const errorСhecking = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: err.message });
  }
  return res.status(500).send({ message: err.message });
};

module.exports = { errorСhecking, CastError };
