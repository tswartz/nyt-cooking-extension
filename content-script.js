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
  const container = getContainer();
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
