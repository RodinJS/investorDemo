import * as RODIN from 'rodin/main';
import {step1} from "./step1.js";
import {step2} from "./step2.js";
import {step3} from "./step3.js";
import {step4} from "./step4.js";
import {step5} from "./step5.js";
import {step6} from "./step6.js";
import {step7} from "./step7.js";
import {step8} from "./step8.js";
import {step9} from "./step9.js";

import {openDoor, hideRoom} from "../Doors.js";

const moveforwardAnimation = new RODIN.AnimationClip('moveforward', {
    position: {
        z: '-3'
    }
});
moveforwardAnimation.duration(500);
moveforwardAnimation.easing(function (k) {
    if ((k *= 2) < 1) {
        return 0.5 * k * k;
    }
    return -0.5 * (--k * (k - 2) - 1);
});

RODIN.Avatar.active.animation.add(moveforwardAnimation);

const exitAnimation = new RODIN.AnimationClip('exit', {
    position: {
        z: '-24'
    }
});
exitAnimation.duration(2000);
exitAnimation.easing(function (k) {
    if ((k *= 2) < 1) {
        return 0.5 * k * k;
    }
    return -0.5 * (--k * (k - 2) - 1);
});

RODIN.Avatar.active.animation.add(exitAnimation);

const fadeAnimation = new RODIN.AnimationClip('fade', {
    _threeObject: {
        children: {
            0: {
                material: {
                    opacity: {
                        from: 1,
                        to: 0
                    }
                }
            }
        }
    }
});
fadeAnimation.duration(1000);
fadeAnimation.easing(moveforwardAnimation.easing());

// const fadeInAnimation = new RODIN.AnimationClip('fadeIn', {
//     material: {
//         opacity: {
//             from: 0,
//             to: 1
//         }
//     }
// });
// fadeInAnimation.duration(1000);
// fadeInAnimation.easing(moveforwardAnimation.easing());

const leftAnimation = new RODIN.AnimationClip('left', {
    position: {
        z: '+0.8',
        x: '-1.6'
    },
    rotation: {
        y: Math.PI / 3
    }
});

leftAnimation.duration(1000);
leftAnimation.easing((k) => {
    if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k + 2);
});

const rightAnimation = new RODIN.AnimationClip('right', {
    position: {
        z: '+0.8',
        x: '+1.6'
    },
    rotation: {
        y: -Math.PI / 3
    }
});

rightAnimation.duration(1000);
rightAnimation.easing(leftAnimation.easing());

class Steps {
    constructor() {
        this.current = -1;
        this.steps = [step1, step2, step3, step4, step5, step6, step7, step8];
        this.steps[4].animation.add(leftAnimation);
        this.steps[5].animation.add(rightAnimation);
        this.steps.forEach(step => step.visible = false);
        this.callbacks = [
            () => {
                this.hideAllShow(0);
                this.moveForward();
            },
            () => {
                // this.fadeIn(1);
                this.hideAllShow(1);
                this.moveForward();
            },
            () => {
                this.hideAllShow(2);
                this.moveForward();
            },
            () => {
                this.hideAllShow(3);
                this.moveForward();
                this.fade(3);
            },
            () => {
                this.hideAllShow(4);
            },
            () => {
                this.steps[4].animation.start('left');
                this.steps[4].once(RODIN.CONST.ANIMATION_COMPLETE, () => {
                    this.steps[5].visible = true;
                });
            },
            () => {
                this.steps[5].animation.start('right');
                this.steps[5].once(RODIN.CONST.ANIMATION_COMPLETE, () => {
                    this.steps[6].visible = true;
                });
            },
            () => {
                this.hideAllShow(7);
                this.moveForward();
            },
        ];

        this.lastMovedTimestamp = Date.now();

        RODIN.Avatar.active.position.z += 3;
        this.next();
    }

    requestNext() {
        if ([0, 1, 2, 3, 5, 6, 7, 8].indexOf(this.current + 1) === -1) return;
        if (RODIN.Avatar.active.animation.isPlaying('moveforward') || this.steps[5].animation.isPlaying('right') || this.steps[4].animation.isPlaying('left')) {
            return;
        }

        this.next();
    }

    next() {
        if (this.current + 1 > this.steps.length) return;

        if (this.current === this.steps.length - 1) {
            this.hideAllShow();
            openDoor();
            setTimeout(() => {
                RODIN.Avatar.active.animation.start('exit');
                RODIN.Avatar.active.once(RODIN.CONST.ANIMATION_COMPLETE, () => {
                    hideRoom();
                })
            }, openDoor.duration - 1000);

            this.current++;
            return;
        }

        this.current++;
        this.callbacks[this.current]();
        // todo: Analitika log anel

        this.lastMovedTimestamp = Date.now();
    }

    moveForward() {
        RODIN.Avatar.active.animation.start('moveforward');
    }

    hideAllShow(index = -1) {
        for (let i = 0; i < this.steps.length; i++) {
            this.steps[i].visible = i === index;
        }
    }

    // fadeIn(index) {
    //     setTimeout(() => {
    //         console.log(this.steps[index]._threeObject.children);
    //         for (let i = 0; i < this.steps[index]._threeObject.children.length; i++) {
    //             this.steps[index]._threeObject.children[i].animation.add(fadeInAnimation);
    //             this.steps[index]._threeObject.children[i].material.transparent = true;
    //             this.steps[index]._threeObject.children[i].animation.start('fadeIn');
    //         }
    //     }, 1000);
    // }

    fade(index) {
        this.steps[index].animation.add(fadeAnimation);
        setTimeout(() => {
            this.steps[index]._threeObject.children[0].material.transparent = true;
            this.steps[index].animation.start('fade');
            this.steps[index].once(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
                this.next();
                this.steps[index]._threeObject.children[0].material.transparent = false;
            });
        }, moveforwardAnimation.duration() + 2000);
    }

    initTexts(){
        for (let i = 0; i< this.steps.length; i++){
            this.steps[i].addToScene();
        }
        step9.addToScene();
    }
}

export const steps = new Steps();
