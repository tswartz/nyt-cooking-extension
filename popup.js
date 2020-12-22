chrome.tabs.query({active: true}, tabs => {
  const url = tabs[0].url;
  const revealRecipeButton = document.getElementById('reveal-recipe-button');
  if (!revealRecipeButton) return;
  if (url && url.match('cooking.nytimes.com')) {
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request && request.type == 'RECIPE_REVEALED') {
          revealRecipeButton.setAttribute('class', 'disabled');
        }
      }
    );
    chrome.tabs.sendMessage(tabs[0].id, {type: 'EXTENSION_OPENED'});
    revealRecipeButton.onclick = function(element) {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'REVEAL_RECIPE'});
    };
  } else {
    revealRecipeButton.setAttribute('class', 'disabled');
  }
});

