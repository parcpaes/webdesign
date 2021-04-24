class ToggleStyle {
  constructor(selector, toggleSelector) {
    this.selector = selector;
    this.toggleSelector = toggleSelector;
    this.questionItem = {};
  }
  toggleStyle(parent) {
    this.questionItem = parent.querySelector(this.selector);
    this.questionItem.classList.toggle(this.toggleSelector);
  }
  isStyled() {
    const itemStyle = this.questionItem.classList;
    return itemStyle.contains(this.toggleSelector);
  }
}

class ItemsToggle {
  constructor(question) {
    this.question = question;
  }

  toggleItems(currentElement) {
    Object.keys(this.question).forEach((key) =>
      this.question[key].toggleStyle(currentElement)
    );
  }
  isItemsStyled() {
    return Object.keys(this.question).every((key) =>
      this.question[key].isStyled()
    );
  }
}
const questionToggleStyle = new ToggleStyle('.question', 'active');
const arrowToggleStyle = new ToggleStyle('.arrow-icon', 'arrow-up');
const answerToggleStyle = new ToggleStyle('.answer', 'active');

const question = {
  questionToggleStyle,
  arrowToggleStyle,
  answerToggleStyle,
};
const toggles = new ItemsToggle(question);

function useStateToggle(toggles) {
  let previousItem, prevToggle;
  return {
    toggle: function (actualItem) {
      if (
        this.isSameAsPrevItem(actualItem, previousItem) &&
        this.isStyled(prevToggle)
      ) {
        prevToggle.toggleItems(previousItem);
      }
      toggles.toggleItems(actualItem);
      previousItem = actualItem;
      prevToggle = toggles;
    },
    isSameAsPrevItem: function (actual, prev) {
      return prev && prev !== actual;
    },
    isStyled: function (toggles) {
      return toggles && toggles.isItemsStyled();
    },
  };
}

const toggleState = useStateToggle(toggles);

const fqa = document.querySelector('.fqa');
fqa.addEventListener('click', (event) => {
  const paragraph = event.target;
  const questionItem = event.target.closest('.question__item');
  if (!questionItem || paragraph.tagName === 'P') return;

  toggleState.toggle(questionItem);
});

function isToggledPrevious(actualItem, prevItem) {
  return prevItem && prevItem !== actualItem;
}
