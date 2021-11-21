const journalingQuestions = require('./journalingQuestions.json');

module.exports = () => journalingQuestions.questions;

// const randomItem = (items) => {
//   if (!items || !items.length) return '';
//   return items[Math.floor(Math.random() * items.length)];
// };

// module.exports = function () {
//   return randomItem(journalingQuestions.questions);
// };
