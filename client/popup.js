var popupBackground = document.createElement('div');
var popup           = document.createElement('div');
var closeButton     = document.createElement('div');
var popupText       = document.createElement('div');

function init() {
    switchVisibility("hidden");

    popupBackground.appendChild(popup);
    popup.appendChild(closeButton);
    popup.appendChild(popupText);

    popupBackground.className = "popup-background";
    popup.className           = "popup";
    closeButton.className     = "close-button";
    popupText.className       = "popup-text";

    var body = document.body;
    body.appendChild(popupBackground);

    closeButton.onclick = function() {
        switchVisibility("hidden")
    };
}

function switchVisibility (visibility) {
    var popupElements = [popupBackground, popup, closeButton, popupText]

    for (var i = 0; i < popupElements.length; i++) {
        popupElements[i].style.visibility = visibility;
    };
}

function showPopup (message) {
    switchVisibility("visible");
    setTimeout(function(){
        switchVisibility("hidden");
    } , 2500);

    popupText.innerHTML = message;
}

init();

module.exports = {
    switchVisibility: switchVisibility,
    showPopup:        showPopup
}