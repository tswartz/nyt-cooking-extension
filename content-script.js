function getModal() {
  return document.querySelector('.nytc---modal-window---windowContainer');
}

function getContainer() {
  return document.querySelector('#container');
}

function revealRecipe() {
  const modal = getModal();
  if (modal) {
    modal.remove();
  }
  const container = document.querySelector('#container');
  if (container) {
    container.style.overflowY = 'scroll';
    container.style.height = '1000px';
  }
}

function checkIfRecipeRevealed() {
  const modal = getModal();
  const container = getContainer();
  return !modal && container.style.overflowY === 'scroll' && container.style.height;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request && request.type == 'EXTENSION_OPENED') {
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
