class ToggleQuestion {
  constructor(listItems) {
    this.listItems = listItems;
  }

  toggleItemParagraph(items, selector) {
    const answers = items.querySelectorAll('.answer');
    const p = answers.find((value) => value.classList.contains(selector));
    p.classList.toggle(selector);
  }
  togglePropertyStyle(items, selector) {
    const questions = items.querySelectorAll('.question');
    const arrowImage = questions.find((value) =>
      value.style.getPropertyValue('rotate(180deg)')
    );
    arrowImage.style.setProperty('--image-rotate', 'rotate(0)');
  }
  togglePrevious(divItem, question, selector) {
    if (this.isToggledPrevious(divItem, this.prevActiveItem, selector)) {
      this.prevActiveItem.classList.toggle(selector);
      this.prevUpDownArrow.style.setProperty(
        '--image-rotate',
        this.isToggleRotated()
      );
      this.isRotated = !this.isRotated;
    }
    this.setPrevActive(divItem, question);
  }
  toggleItem(divItem, selector) {
    const answer = divItem.querySelector('.answer');
    const question = divItem.querySelector('.question');

    this.togglePrevious(answer, question, selector);
    question.style.setProperty('--image-rotate', this.isToggleRotated());

    this.isRotated = !this.isRotated;
    answer.classList.toggle(selector);
  }

  isToggleRotated() {
    return this.isRotated ? 'rotate(0deg)' : 'rotate(180deg)';
  }
  setPrevActive(actualItem, question) {
    this.prevActiveItem = actualItem;
    this.prevUpDownArrow = question;
  }

  isToggledPrevious(actualItem, prevItem, selector) {
    return (
      prevItem &&
      prevItem.classList.contains(selector) &&
      prevItem !== actualItem
    );
  }
}

class Question {
  constructor(mainSelector, toggleQuestion) {
    this.questionsContent = mainSelector;
    this.toggleQuestion = toggleQuestion;
    this.questionsContent.onclick = this.clickQuestion.bind(this);
  }

  clickQuestion(event) {
    const divItem = event.target.closest('div');
    if (this.isEqualClassName(divItem, this.questionsContent)) return;
    this.toggleQuestion.toggleItem(divItem, 'active');
  }

  isEqualClassName(element1, element2) {
    return element1.className === element2.className;
  }
}
const questions = document.querySelector('.questions');
const question_items = questions.querySelector('.question__item');
const toggleQuestion = new ToggleQuestion(question_items);
const question = new Question(questions, toggleQuestion);
