import * as RODIN from 'rodin/main';

import {StepSculpt} from "./StepSculpt.js"

export const step9 = new StepSculpt();
step9.init = () => {
    step9.position.z = -37.5;

    const check = new RODIN.Text3D({
        text: 'Check your email please',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Bold.ttf',
        fontSize: 0.07,
    });
    check.on(RODIN.CONST.READY, (e) => {
        check.center();
        check.position.y = 0;
    });

    const text = new RODIN.Text3D({
        text: 'I want you onboard as we',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Bold.ttf',
        fontSize: 0.07,
    });
    text.on(RODIN.CONST.READY, (e) => {
        text.center();
        text.position.y = 0.3;
        step9.add(text);
    });

    const text1 = new RODIN.Text3D({
        text: 'democratize VR/AR development.',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Bold.ttf',
        fontSize: 0.07,
    });
    text1.on(RODIN.CONST.READY, (e) => {
        text1.center();
        text1.position.y = 0.21;
        step9.add(text1);
    });

    const impulsInAnimation = new RODIN.AnimationClip('impulsIn', {
        scale: {
            x: 0.5,
            y: 0.5,
            z: 0.5,
        }
    });

    impulsInAnimation.duration(1200);
    impulsInAnimation.easing((k) => {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k + 2);
    });

    const impulsOutAnimation = new RODIN.AnimationClip('impulsOut', {
        scale: {
            x: 1,
            y: 1,
            z: 1,
        }
    });

    impulsOutAnimation.duration(1200);
    impulsOutAnimation.easing(impulsInAnimation.easing());

    const location = new RODIN.Plane(0.25, 0.25, new THREE.MeshBasicMaterial({
        transparent: true,
        map: RODIN.Loader.loadTexture('img/location.png'),
        side: THREE.DoubleSide
    }));
    step9.add(location);

    const locationImpuls = new RODIN.Plane(0.4, 0.4, new THREE.MeshBasicMaterial({
        transparent: true,
        map: RODIN.Loader.loadTexture('img/locationImpuls.png'),
        side: THREE.DoubleSide
    }));
    locationImpuls.animation.add(impulsInAnimation, impulsOutAnimation);
    locationImpuls.animation.start('impulsIn');
    locationImpuls.position.z = -0.01;
    step9.add(locationImpuls);

    locationImpuls.on(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
        if (e.animation === 'impulsOut' && !location.hovered) {
            e.target.animation.start('impulsIn');
        }
        if (e.animation === 'impulsIn' && !location.hovered) {
            e.target.animation.start('impulsOut');
        }
    });
    location.on(RODIN.CONST.GAMEPAD_HOVER, (e) => {
        locationImpuls.animation.stop('impulsOut');
        locationImpuls.animation.stop('impulsIn');
        locationImpuls.animation.start('impulsOut');
        location.hovered = true;
    });
    location.on(RODIN.CONST.GAMEPAD_HOVER_OUT, (e) => {
        locationImpuls.animation.stop('impulsOut');
        locationImpuls.animation.stop('impulsIn');
        locationImpuls.animation.start('impulsIn');
        location.hovered = false;
    });

    const text2 = new RODIN.Text3D({
        text: 'touch/click here and I will send you',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Bold.ttf',
        fontSize: 0.07,
    });
    text2.on(RODIN.CONST.READY, (e) => {
        text2.center();
        text2.position.y = -0.21;
        step9.add(text2);
    });

    const text3 = new RODIN.Text3D({
        text: 'some more stuff',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Bold.ttf',
        fontSize: 0.07,
    });
    text3.on(RODIN.CONST.READY, (e) => {
        text3.center();
        text3.position.y = -0.3;
        step9.add(text3);
    });

    location.on(RODIN.CONST.GAMEPAD_BUTTON_UP, (e) => {
        /// TODO: mail gna
        text.parent = null;
        text1.parent = null;
        text2.parent = null;
        text3.parent = null;
        location.parent = null;
        locationImpuls.parent = null;

        step9.add(check);
    });
}