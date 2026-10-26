function getModal() {
  return document.querySelector('[class^="modal_modal-window-container"]');
}

function getContainer() {
  return document.querySelector('main');
}

function getTruncator() {
  return document.querySelector('[data-testid="oma-cooking-truncator-wrapper"]');
}

function getRecipeBody() {
  return document.querySelector('[data-testid="recipe-body"]');
}

let revealed = false;

function revealRecipe() {
  const modal = getModal();
  if (modal) {
    modal.remove();
    revealed = true;
  }
  const footers = document.querySelectorAll('footer');
  footers.forEach(footer => footer.remove());
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(iframe => iframe.remove());
  const scripts = document.querySelectorAll('script,link[as="script"]');
  scripts.forEach(script => script.remove());
  const truncator = getTruncator();
  const container = getContainer();
  if (truncator) {
    truncator.remove();
    const recipeBody = getRecipeBody();
    if (recipeBody) {
      const classList = recipeBody.classList;
      const truncatorClasses = Array.from(classList).filter((className) => {
        return className.match('truncator');
      });
      truncatorClasses.forEach((className) => {
        classList.remove(className);
      });
    }
    revealed = true;
  } else if (container) {
    container.style.overflowY = 'scroll';
    container.style.height = '1000px';
  }

  const html = document.createElement('html');
  const head = document.createElement('head');
  document.querySelectorAll('head meta,link[rel="stylesheet"],link[as="style"]').forEach(link => {
    head.appendChild(link.cloneNode(true));
  });
  html.appendChild(head);
  html.appendChild(document.querySelector('body').cloneNode(true));

  const blob = new Blob([html.outerHTML], {
    type: 'text/html'
  });
  const url = URL.createObjectURL(blob);
  window.open(url);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request && request.type == 'GET_RECIPE_REVEALED') {
      sendResponse({ recipeRevealed: revealed });
    }
    if (request && request.type == 'REVEAL_RECIPE') {
      revealRecipe();
      if (revealed) {
        sendResponse({ recipeRevealed: true });
      }
    }
  }
);
