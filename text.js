const cmd = document.getElementById('cmd');
cmd.innerHTML = '';
const randomIn = (min, max) => min + Math.random() * (max - min);


function typeText(text = 'We are sculpting your experience, please wait.<br>It may take up to 20-40 sec to load') {
    typeText.runningID = Math.random();

    const type = (text, i, runningID) => {
        if(typeText.runningID !== runningID) {
            return;
        }

        if(i > text.length) {
            window.textReady = true;
            window.dispatchEvent(new Event('textReady'));
            typeText.runningID = NaN;
            return;
        }

        cmd.innerHTML = text.substr(0, i);
        setTimeout(() => {type(text, i + 1, runningID)}, randomIn(30, 60));
    };

    type(text, 0, typeText.runningID);
}

function typeError(text = 'Something went wrong, please reload the page') {
    typeText(text);
}

typeText.runningID = NaN;

setTimeout( typeText, 1500 );

