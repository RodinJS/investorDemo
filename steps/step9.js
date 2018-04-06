import * as RODIN from 'rodin/main';
import {get} from "../ajax.js";
import {logEvent, getUserID} from "../firebase.js";

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

    const error = new RODIN.Text3D({
        text: 'Oops. Something went wrong\nplease check your network connection',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Bold.ttf',
        fontSize: 0.07,
    });

    error.on(RODIN.CONST.READY, (e) => {
        error.center();
        error.position.y = 0;
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
            x: 0.9,
            y: 0.9,
            z: 0.9,
        }
    });

    impulsInAnimation.duration(800);
    impulsInAnimation.easing(RODIN.AnimationClip.EASING.Sinusoidal.InOut);

    const impulsOutAnimation = new RODIN.AnimationClip('impulsOut', {
        scale: {
            x: 1,
            y: 1,
            z: 1,
        }
    });

    impulsOutAnimation.duration(800);
    impulsOutAnimation.easing(impulsInAnimation.easing());

    const location = new RODIN.Plane(1, 0.25, new THREE.MeshBasicMaterial({
        transparent: true,
        map: RODIN.Loader.loadTexture('img/slogo.png'),
        side: THREE.DoubleSide
    }));
    step9.add(location);
    location.position.z = 0.02;
    location.position.y = 0.02;

    location.animation.add(impulsInAnimation, impulsOutAnimation);
    location.animation.start('impulsIn');

    location.on(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
        if (e.animation === 'impulsOut' && !location.hovered) {
            e.target.animation.start('impulsIn');
        }
        if (e.animation === 'impulsIn' && !location.hovered) {
            e.target.animation.start('impulsOut');
        }
    });
    location.on(RODIN.CONST.GAMEPAD_HOVER, (e) => {
        location.animation.stop('impulsOut');
        location.animation.stop('impulsIn');
        location.animation.start('impulsOut');
        location.hovered = true;
    });
    location.on(RODIN.CONST.GAMEPAD_HOVER_OUT, (e) => {
        location.animation.stop('impulsOut');
        location.animation.stop('impulsIn');
        location.animation.start('impulsIn');
        location.hovered = false;
    });

    const text2 = new RODIN.Text3D({
        text: 'touch/click here and get',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Bold.ttf',
        fontSize: 0.065,
    });
    text2.on(RODIN.CONST.READY, (e) => {
        text2.center();
        text2.position.y = -0.21;
        step9.add(text2);
    });

    const text3 = new RODIN.Text3D({
        text: 'your share of Rodin',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Bold.ttf',
        fontSize: 0.065,
    });
    text3.on(RODIN.CONST.READY, (e) => {
        text3.center();
        text3.position.y = -0.3;
        step9.add(text3);
    });

    location.on(RODIN.CONST.GAMEPAD_BUTTON_UP, (e) => {
        logEvent({type: 'linkClick'});
        window.location.href = "https://www.seedinvest.com/rodin/seed";
    });
};
