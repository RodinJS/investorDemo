import * as RODIN from 'rodin/main';

import {StepSculpt} from "./StepSculpt.js"

export const step6 = new StepSculpt();
step6.init = () => {
    step6.position.z = -10.5;

    const text = new RODIN.Text3D({
        text: 'Authentic Social/Communication',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Bold.ttf',
        fontSize: 0.07,
    });
    text.on(RODIN.CONST.READY, (e) => {
        text.center();
        text.position.y = 0.15;
        step6.add(text);
    });

    const text1 = new RODIN.Text3D({
        text: 'we need to accelerate the densification of the',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Regular.ttf',
        fontSize: 0.05,
    });
    text1.on(RODIN.CONST.READY, (e) => {
        text1.center();
        text1.position.y = -0.0;
        step6.add(text1);
    });

    const text2 = new RODIN.Text3D({
        text: 'emotional exchange rate between humans.',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Regular.ttf',
        fontSize: 0.05,
    });
    text2.on(RODIN.CONST.READY, (e) => {
        text2.center();
        text2.position.y = -0.08;
        step6.add(text2);
    });
}