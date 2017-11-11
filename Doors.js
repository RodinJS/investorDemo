import * as RODIN from 'rodin/main';

export const openDoor = () => {
    doorBottom.animation.start('open');
    doorLeft.animation.start('open');
    doorRight.animation.start('open');
};
const duration = 1000;
openDoor.duration = duration;

export const hideRoom = () => {
    sceneObj.visible = false;
};

openDoor.duration = duration;

let doorLeft = null;
let doorRight = null;
let doorBottom = null;
let sceneObj = null;

export const initEnvirement = () => {
    const mainScene = RODIN.Scene.scenes.filter(i => i.name === 'Main')[0];
    // mainScene.add(new RODIN.Sculpt(new THREE.AmbientLight(0xFFFFFF, 0.5)));

    sceneObj = new RODIN.Sculpt();
    sceneObj.scale.set(1.5, 1.5, 1.5);
    mainScene.add(sceneObj);

    const easing = (k) => {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k + 2);
    };

    const room = new RODIN.Sculpt('./model/room.obj');
    room.on(RODIN.CONST.READY, (e)=>{
        sceneObj.add(e.target);
        e.target.position.z = -4;
        const room2 = e.target.clone();
        room2.position.z = -12;
        sceneObj.add(room2);
        const room3 = e.target.clone();
        room3.position.z = -20;
        sceneObj.add(room3);
    });

    doorLeft = new RODIN.Sculpt('./model/door_left.obj');
    doorLeft.on(RODIN.CONST.READY, (e)=>{
        sceneObj.add(e.target);

        const doorClone = e.target.clone();
        doorClone.position.z = -4;
        sceneObj.add(doorClone);

        e.target.rotation.y = Math.PI;
        e.target.position.z = -12;
    });
    doorRight = new RODIN.Sculpt('./model/door_right.obj');
    doorRight.on(RODIN.CONST.READY, (e)=>{
        sceneObj.add(e.target);

        const doorClone = e.target.clone();
        doorClone.position.z = -4;
        sceneObj.add(doorClone);

        e.target.rotation.y = Math.PI;
        e.target.position.z = -12;
    });
    doorBottom = new RODIN.Sculpt('./model/door_bottom.obj');
    doorBottom.on(RODIN.CONST.READY, (e)=>{
        sceneObj.add(e.target);

        const doorClone = e.target.clone();
        doorClone.position.z = -4;
        sceneObj.add(doorClone);

        e.target.rotation.y = Math.PI;
        e.target.position.z = -12;
    });

    const leftOpenAnimation = new RODIN.AnimationClip('open', {
        position: {
            x: '-0.866',
            y: '+0.5'
        }
    });
    leftOpenAnimation.duration(duration);
    leftOpenAnimation.easing(easing);

    const rightOpenAnimation = new RODIN.AnimationClip('open', {
        position: {
            x: '+0.866',
            y: '+0.5'
        }
    });
    rightOpenAnimation.duration(duration);
    rightOpenAnimation.easing(easing);

    const bottomOpenAnimation = new RODIN.AnimationClip('open', {
        position: {
            y: '-1'
        }
    });
    bottomOpenAnimation.duration(duration);
    bottomOpenAnimation.easing(easing);

    doorBottom.animation.add(bottomOpenAnimation);
    doorLeft.animation.add(leftOpenAnimation);
    doorRight.animation.add(rightOpenAnimation);
};
