import * as RODIN from 'rodin/main';
import {Next} from './Next.js';
import {initEnvirement} from "./Doors.js"

RODIN.start();

const startExperience = () => {
    initEnvirement();

    const mainScene = RODIN.Scene.scenes.filter(i => i.name === 'Main')[0];
    mainScene.add(new RODIN.Sculpt(new THREE.AmbientLight(0xFFFFFF, 0.5)));

    const next = new Next();
    next.initSteps();
    RODIN.Avatar.active.add(next);

    const milkyway = new RODIN.Sphere(720, 4, new THREE.MeshBasicMaterial({ map : RODIN.Loader.loadTexture('./img/milkyway.jpg'),}));
    milkyway.scale.z = -1;
    milkyway.rotation.y = Math.PI/2;
    milkyway.position.set(0, 1.6, -25);
    mainScene.add(milkyway);
};

startExperience();

RODIN.messenger.once(RODIN.CONST.ALL_SCULPTS_READY, ()=> {
    startExperience();
});
