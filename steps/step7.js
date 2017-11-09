import * as RODIN from 'rodin/main';

import {StepSculpt} from "./StepSculpt.js"

export const step7 = new StepSculpt();
step7.position.z = -10.5;

const icon = new RODIN.Plane(0.25,0.25, new THREE.MeshBasicMaterial({
    transparent:true,
    map: RODIN.Loader.loadTexture('img/icon.png')
}));
icon.position.y = 0.22;
step7.add(icon);


const text = new RODIN.Text3D({
    text: 'Cross-device games',
    color: 0xFFFFFF,
    font: './fonts/Roboto-Bold.ttf',
    fontSize: 0.07,
});
text.on(RODIN.CONST.READY, (e) => {
    text.center();
    text.position.y = -0.08;
    step7.add(text);
});