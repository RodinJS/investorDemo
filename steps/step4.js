import * as RODIN from 'rodin/main';

import {StepSculpt} from "./StepSculpt.js"

export const step4 = new StepSculpt();
step4.init = () => {
    step4.position.z = -10.5;

    const text = new RODIN.Text3D({
        text: 'This is what you can do with my platform:',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Bold.ttf',
        fontSize: 0.06,
    });
    text.on(RODIN.CONST.READY, (e) => {
        text.center();
        text.position.y = 0.15;
        step4.add(text);
    });
}