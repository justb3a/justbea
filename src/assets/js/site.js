const randomItem = (items, fallback = '') => {
  if (!items || !items.length) return fallback;
  return items[Math.floor(Math.random() * items.length)];
};

const randomQuestion = () => {
  const wrapper = document.querySelector('.random-question');

  if (wrapper) {
    const questions = ['foo', 'bar', 'zzp'];
    const question = randomItem(questions);
    wrapper.innerText = `„${question}“`;
  }
};

randomQuestion();
