function getModal() {
  return document.querySelector('[class^="modal_modal-window-container"]');
}

function getContainer() {
  return document.querySelector('main');
}

function revealRecipe() {
  const modal = getModal();
  if (modal) {
    modal.remove();
  }
  const footers = document.querySelectorAll('footer');
  footers.forEach(footer => footer.remove());
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(iframe => iframe.remove());
  const scripts = document.querySelectorAll('script,link[as="script"]');
  scripts.forEach(script => script.remove());
  const container = getContainer();
  if (container) {
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

function checkIfRecipeRevealed() {
  const modal = getModal();
  const container = getContainer();
  return !modal && container && container.style.overflowY === 'scroll' && container.style.height;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request && request.type == 'GET_RECIPE_REVEALED') {
      sendResponse({ recipeRevealed: checkIfRecipeRevealed() });
    }
    if (request && request.type == 'REVEAL_RECIPE') {
      revealRecipe();
      if (checkIfRecipeRevealed()) {
        sendResponse({ recipeRevealed: true });
      }
    }
  }
);
