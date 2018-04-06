import * as RODIN from 'rodin/main';

import {StepSculpt} from "./StepSculpt.js"

export const step8 = new StepSculpt();
step8.init = () => {
    step8.position.z = -13.5;

    const techstars = new RODIN.Plane(0.5, 0.25, new THREE.MeshBasicMaterial({
        transparent: true,
        map: RODIN.Loader.loadTexture('img/techstars.png')
    }));
    techstars.position.y = 0.22;
    step8.add(techstars);

    const text = new RODIN.Text3D({
        text: 'I have graduated Techstars Boulder',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Bold.ttf',
        fontSize: 0.07,
    });
    text.on(RODIN.CONST.READY, (e) => {
        text.center();
        text.position.y = -0.05;
        step8.add(text);
    });

    const text1 = new RODIN.Text3D({
        text: 'and am raising my round.',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Bold.ttf',
        fontSize: 0.07,
    });
    text1.on(RODIN.CONST.READY, (e) => {
        text1.center();
        text1.position.y = -0.15;
        step8.add(text1);
    });
}