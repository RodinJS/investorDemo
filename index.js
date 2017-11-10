import * as RODIN from 'rodin/main';
import {Next} from './Next.js';
import {initEnvirement} from "./Doors.js";
import {userEnter} from "./firebase.js";
import {get} from "./ajax.js";

RODIN.start();

initEnvirement();

const startExperience = (userData) => {

    userEnter(userData.id, userData.name);
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
                opacity: {from: 1, to: 0}
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
    next.initSteps(userData.name, userData.id);
    RODIN.Avatar.active.add(next);

    const milkyway = new RODIN.Sphere(50, 720, 4, new THREE.MeshBasicMaterial({map: RODIN.Loader.loadTexture('./img/milkyway.jpg')}));
    milkyway.scale.z = -1;
    milkyway.rotation.y = Math.PI / 2;
    milkyway.position.set(0, 1.6, -25);
    mainScene.add(milkyway);
};

const getUserData = new Promise((resolve, reject) => {
    const id = getAllUrlParams().id;
    if (!id) {
        return typeError();
    }

    return get(`https://api.rodin.investments/?id=${id}`).then((data) => {
        console.log('data get success');
        data = JSON.parse(data);
        resolve({id, name: data.name});
    }).catch(() => {
        typeError();
    });
});

RODIN.messenger.once(RODIN.CONST.ALL_SCULPTS_READY, () => {
    getUserData.then(userData => {
        if (window.textReady) {
            startExperience(userData);
        } else {
            window.addEventListener('textReady', () => {
                startExperience(userData);
            });
        }
    })
});
