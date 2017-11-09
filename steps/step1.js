import * as RODIN from 'rodin/main';
import {StepSculpt} from "./StepSculpt.js"

export const step1 = new StepSculpt();
step1.init = () => {
    step1.position.z = -1.5;

    const title = new RODIN.Text3D({
        text: 'Hi John',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Bold.ttf',
        fontSize: 0.12,
    });
    title.on(RODIN.CONST.READY, (e) => {
        title.center();
        title.position.y = 0.15;
        step1.add(title);
    });

    const text = new RODIN.Text3D({
        text: 'I am Rodin and together we are going to sculpt',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Regular.ttf',
        fontSize: 0.05,
    });
    text.on(RODIN.CONST.READY, (e) => {
        text.center();
        text.position.y = -0;
        step1.add(text);
    });

    const text1 = new RODIN.Text3D({
        text: 'the immersive web.',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Regular.ttf',
        fontSize: 0.05,
    });
    text1.on(RODIN.CONST.READY, (e) => {
        text1.center();
        text1.position.y = -0.08;
        step1.add(text1);
    });
};

// RODIN.Scene.add(step1);