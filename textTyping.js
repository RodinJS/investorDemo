const text = 'We are getting ready, please wait';

const randomIn = (min, max) => min + Math.random() * (max - min);

function start() {
    const type = (text, i) => {
        if(i > text.length) return self.postMessage('end');
        self.postMessage(text.substr(0, i));
        setTimeout(() => {type(text, i + 1)}, randomIn(30, 60));
    };

    type(text, 0)
}

setTimeout( start, 1500 );