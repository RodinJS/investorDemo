import * as RODIN from 'rodin/main';
import {Next} from './Next.js';
import {initEnvirement} from "./Doors.js";
import {userEnter, enableFirebase} from "./firebase.js";
import {get} from "./ajax.js";
import {initSpace} from "./space.js"

RODIN.start();
initEnvirement();

const fadeSphere = new RODIN.Sphere(.5, 32, 32, new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 1,
    color: 0x000000,
    side: THREE.DoubleSide
}));
RODIN.Avatar.active.HMDCamera.add(fadeSphere);

let fadeSceneAnim = new RODIN.AnimationClip("fadeSceneAnim", {
    _threeObject: {
        material: {
            opacity: {from: 1, to: 0}
        }
    }
});
fadeSceneAnim.duration(1500).delay(1000).easing(RODIN.AnimationClip.EASING.Cubic.Out);

fadeSphere.animation.add(fadeSceneAnim);

fadeSphere.on(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
    if (e.animation === 'fadeSceneAnim') {
        fadeSphere.parent = null;
    }
});


const milkyway = new RODIN.Sphere(50, 720, 4, new THREE.MeshBasicMaterial({map: RODIN.Loader.loadTexture('./img/milkyway.jpg')}));
milkyway.scale.z = -1;
milkyway.rotation.y = Math.PI / 2;
milkyway.position.set(0, 1.6, -25);
RODIN.Scene.add(milkyway);


const startExperience = (userData) => {

    if(getAllUrlParams().a === true) {
        enableFirebase();
        console.log('firebase enabled');
    }

    userEnter(userData.id, userData.name);
    document.getElementById('loadingBackground').style.display = 'none';

    // RODIN.Scene.add(new RODIN.Sculpt(new THREE.AmbientLight(0xFFFFFF, 0.5)));

    fadeSphere.animation.start('fadeSceneAnim');
    const next = new Next();
    next.initSteps(userData.name, userData.id);
    RODIN.Avatar.active.next = next;
    RODIN.Avatar.active.add(next);
};


const getUserData = new Promise((resolve, reject) => {
    const n = getAllUrlParams().n;
    if (!n) {
        return typeError();
    }

    resolve(n);
//     return get(`https://api.rodin.investments/?id=${id}`).then((data) => {
//         console.log('data get success');
//         data = JSON.parse(data);
//         resolve({id, name: data.name});
//     }).catch(() => {
//         typeError();
//     });
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
    initSpace();
});
