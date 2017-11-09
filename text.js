// let worker = new Worker('textTyping.js');
const cmd = document.getElementById('cmd');
cmd.innerHTML = '';

// worker.onmessage = function(event){
//     if(event.data === 'end') {
//         return setTimeout(() => {
//             window.textReady = true;
//             window.dispatchEvent(new Event('textReady'));
//         }, 1000);
//     }
//
//     cmd.innerHTML = event.data;
// };

const text = 'We are getting ready, please wait';

const randomIn = (min, max) => min + Math.random() * (max - min);

function start() {
    const type = (text, i) => {
        if(i > text.length) {
            window.textReady = true;
            window.dispatchEvent(new Event('textReady'));
            return;
        }

        cmd.innerHTML = text.substr(0, i)
        setTimeout(() => {type(text, i + 1)}, randomIn(30, 60));
    };

    type(text, 0)
}

setTimeout( start, 1500 );