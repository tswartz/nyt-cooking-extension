function revealRecipe() {
  const modal = document.querySelector('.nytc---modal-window---windowContainer');
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
  const modal = document.querySelector('.nytc---modal-window---windowContainer');
  const container = document.querySelector('#container');
  return !modal && container.style.overflowY === 'scroll' && container.style.height;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request && request.type == 'EXTENSION_OPENED') {
      if (checkIfRecipeRevealed()) {
        chrome.runtime.sendMessage({ type: 'RECIPE_REVEALED' });
      }
    }
    if (request && request.type == 'REVEAL_RECIPE') {
      revealRecipe();
      if (checkIfRecipeRevealed()) {
        chrome.runtime.sendMessage({ type: 'RECIPE_REVEALED' });
      }
    }
  }
);
