import * as RODIN from 'rodin/main';
import {Next} from './Next.js';
import {initEnvirement} from "./Doors.js";

RODIN.start();

initEnvirement();

const startExperience = (name) => {


    document.getElementById('loadingBackground').style.display = 'none';

    const mainScene = RODIN.Scene.scenes.filter(i => i.name === 'Main')[0];
    mainScene.add(new RODIN.Sculpt(new THREE.AmbientLight(0xFFFFFF, 0.5)));

    const fadeSphere = new RODIN.Sphere(.5, 32, 32, new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 1,
        color: 0x000000,
        side: THREE.DoubleSide
    }));
    fadeSphere.position.y = 1.6;
    mainScene.add(fadeSphere);

    let fadeSceneAnim = new RODIN.AnimationClip("fadeSceneAnim", {
        _threeObject: {
            material: {
                opacity: { from: 1, to :0}
            }
        }
    });
    fadeSceneAnim.duration(1500);

    fadeSphere.animation.add(fadeSceneAnim);
    fadeSphere.animation.start('fadeSceneAnim');

    fadeSphere.on(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
        if (e.animation === 'fadeSceneAnim') {
            fadeSphere.visible = false;
        }
    });

    const next = new Next();
    next.initSteps(name);
    RODIN.Avatar.active.add(next);

    const milkyway = new RODIN.Sphere(720, 4, new THREE.MeshBasicMaterial({ map : RODIN.Loader.loadTexture('./img/milkyway.jpg'),}));
    milkyway.scale.z = -1;
    milkyway.rotation.y = Math.PI/2;
    milkyway.position.set(0, 1.6, -25);
    mainScene.add(milkyway);
};

const getUserData = new Promise((resolve, reject) => {
    resolve({name: 'Gor'});
});

getUserData.then((data) => {
    // todo: add to firebase
    console.log('user data ready');
}).catch(err => {
    console.log(`Error when getting data`);
    console.error(err);
});

RODIN.messenger.once(RODIN.CONST.ALL_SCULPTS_READY, ()=> {
    getUserData.then(userData => {
        if(window.textReady) {
            startExperience(userData.name);
        } else {
            window.addEventListener('textReady', () => {
                startExperience();
            });
        }
    })
});
