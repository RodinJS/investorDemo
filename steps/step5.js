import * as RODIN from 'rodin/main';

import {StepSculpt} from "./StepSculpt.js"

export const step5 = new StepSculpt();
step5.position.z = -10.5;

const text = new RODIN.Text3D({
    text: 'Build vr/ar experiences from your browser',
    color: 0xFFFFFF,
    font: './fonts/Roboto-Bold.ttf',
    fontSize: 0.07,
});
text.on(RODIN.CONST.READY, (e) => {
    text.center();
    text.position.y = 0.15;
    step5.add(text);
});

const text1 = new RODIN.Text3D({
    text: 'manage from a single codebase, and deploy apps',
    color: 0xFFFFFF,
    font: './fonts/Roboto-Regular.ttf',
    fontSize: 0.05,
});
text1.on(RODIN.CONST.READY, (e) => {
    text1.center();
    text1.position.y = -0.00;
    step5.add(text1);
});

const text2 = new RODIN.Text3D({
    text: 'to any device with a single push.',
    color: 0xFFFFFF,
    font: './fonts/Roboto-Regular.ttf',
    fontSize: 0.05,
});
text2.on(RODIN.CONST.READY, (e) => {
    text2.center();
    text2.position.y = -0.08;
    step5.add(text2);
});

const build = new RODIN.Plane(1, 0.2, new THREE.MeshBasicMaterial({
    transparent: true,
    map: RODIN.Loader.loadTexture('img/build.png')
}));
build.position.y = -0.2;
step5.add(build);