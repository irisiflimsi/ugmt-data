var sm_currentEdit = null;
var sm_caret = 0;
function sm_change(evt) {
    var obj = evt.target;
    if (currentEdit) {
        stopEdit();
    }
    currentEdit = obj;
    document.documentElement.addEventListener("keypress", typeText);
    obj.setAttribute("style", "font-weight:bold;font-style:italic;");
}

function sm_typeText(evt) {
    if (evt.type == "keypress") {
        var charCode;
        if (evt.charCode) {
            charCode = evt.charCode;
        }
        else {
            charCode = evt.keyCode;
        }

        var text = currentEdit.firstChild.nodeValue;
        if (evt.keyCode == 37) { // back arrow
            if (caret > 0) {
                caret -= 1;
            }
        }
        else if (evt.keyCode == 39) { // forward arrow
            if (caret < text.length) {
                caret += 1;
            }
        }
        else if (evt.keyCode == 13) { // Enter
            stopEdit();
        }
        else if (evt.keyCode == 8) { // Backspace
            if (caret > 0) {
                text = text.substring(0, caret - 1) + text.substring(caret, text.length);
                currentEdit.firstChild.nodeValue = text; 
                caret -= 1;
            }
        }
        else if (evt.keyCode == 46) { // Delete
            if (caret < text.length) {
                text = text.substring(0, caret) + text.substring(caret + 1, text.length);
                currentEdit.firstChild.nodeValue = text; 
            }
        }
        else if (charCode > 31 && charCode < 65535) {
            var c = String.fromCharCode(charCode);
            text = text.substring(0, caret) + c + text.substring(caret, text.length);
            currentEdit.firstChild.nodeValue = text;
            caret += 1;
        }
        evt.preventDefault();
    }
}

function sm_stopEdit() {
    text = "";
    currentEdit.setAttribute("style", ""); 
    document.documentElement.removeEventListener("keypress", typeText);
    currentEdit = null;
    caret = 0;
}
