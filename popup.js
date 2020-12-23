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
  const { url, id } = tabs[0] || {};
  if (url && url.match('cooking.nytimes.com')) {
    chrome.tabs.sendMessage(id, {type: 'GET_RECIPE_REVEALED'}, handleRecipeRevealed);
    const revealRecipeButton = getRevealRecipeButton();
    revealRecipeButton.classList.remove('disabled');
    revealRecipeButton.onclick = function(element) {
      chrome.tabs.sendMessage(id, {type: 'REVEAL_RECIPE'}, handleRecipeRevealed);
    };
  }
});

