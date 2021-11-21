const journalingQuestions = require('./journalingQuestions.json');

module.exports = () => {
  const { questions } = journalingQuestions;
  return questions[Math.floor(Math.random() * questions.length)];
};
