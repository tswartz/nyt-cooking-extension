function getRevealRecipeButton() {
  return document.getElementById('reveal-recipe-button');
}

function getRevealedRecipeText() {
  return document.getElementById('revealed-text');
}

function handleRecipeRevealed(response) {
  if (!response) return;
  if (response.recipeRevealed) {
    getRevealRecipeButton().style.display = 'none';
    getRevealedRecipeText().style.display = 'block';
  }
}

chrome.tabs.query({active: true}, tabs => {
  const url = tabs[0].url;
  if (url && url.match('cooking.nytimes.com')) {
    chrome.tabs.sendMessage(tabs[0].id, {type: 'EXTENSION_OPENED'}, handleRecipeRevealed);
    const revealRecipeButton = getRevealRecipeButton();
    revealRecipeButton.classList.remove('disabled');
    revealRecipeButton.onclick = function(element) {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'REVEAL_RECIPE'}, handleRecipeRevealed);
    };
  }
});

