import * as RODIN from 'rodin/main';

const fadeAnimation = new RODIN.AnimationClip("fadeAnimation", {
    material: {
        opacity: {from: 0, to: 1.0}
    }
});
fadeAnimation.duration(2000);

const fadeOutAnimation = new RODIN.AnimationClip("fadeOutAnimation", {
    material: {
        opacity: {from: 1.0, to: 0}
    }
});
fadeOutAnimation.duration(2000);

export class LookingDirection extends RODIN.Sculpt {
    constructor(texts) {
        super();

        const material = new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 0, transparent: true});
        this.texts = texts;

        this.arrowLookLeft = null;
        this.arrowLookRight = null;
        this.massege = null;

        this.angleBorderRight = 0;
        this.angleBorderLeft = 0;

        this.check = alpha => alpha > this.angleBorderRight && alpha < this.angleBorderLeft;

        for (let i = 0; i < this.texts.length; i++) {
            if (this.texts[i] === '<') {
                this.arrowLookLeft = this.texts[i];

                this.angleBorderRight = -2 * Math.PI / 3;
                this.angleBorderLeft = -Math.PI / 3;
            }

            if (this.texts[i] === '>') {
                this.arrowLookRight = this.texts[i];

                this.angleBorderRight = Math.PI / 3;
                this.angleBorderLeft = 2 * Math.PI / 3;

                if (this.arrowLookLeft) {
                    this.check = alpha => Math.abs(alpha) > 2 * Math.PI / 3;
                }
            }

            if (['<', '>'].indexOf(this.texts[i]) === -1) {
                this.massege = this.texts[i];
            }
        }

        if (this.massege) {
            this.text = new RODIN.Text3D({
                text: this.massege,
                font: './fonts/Roboto-Bold.ttf',
                fontSize: 0.03,
                align: 'center',
                lineHeight: 0.05,
                material: material
            });
            this.text.on(RODIN.CONST.READY, () => {
                this.add(this.text);
                this.text.center();
                this.text.animation.add(fadeAnimation, fadeOutAnimation);
                this.looked = false;

                this.deltaX = 0.04;

                let arrowL = null;
                let arrowR = null;

                if (this.arrowLookLeft) {
                    arrowL = new RODIN.Text3D({
                        text: this.arrowLookLeft,
                        font: './fonts/Roboto-Bold.ttf',
                        fontSize: 0.03,
                        material: material
                    });

                    arrowL.on(RODIN.CONST.READY, (e) => {
                        this.add(e.target);
                        e.target.center();
                        e.target.position.x = -(this.getWidth(this.text) / 2 + this.deltaX);

                        const moveRightAnimation = new RODIN.AnimationClip("moveRightAnimation", {
                            position: {
                                x: e.target.position.x - 0.04
                            }
                        });
                        moveRightAnimation.easing(RODIN.AnimationClip.EASING.Sinusoidal.InOut);
                        moveRightAnimation.duration(800);
                        const moveLeftAnimation = new RODIN.AnimationClip("moveLeftAnimation", {
                            position: {
                                x: e.target.position.x
                            }
                        });
                        moveLeftAnimation.easing(RODIN.AnimationClip.EASING.Sinusoidal.InOut);
                        moveLeftAnimation.duration(800);

                        e.target.animation.add(moveRightAnimation, moveLeftAnimation);
                        e.target.animation.start('moveRightAnimation');
                    });
                    arrowL.on(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
                        if (e.animation === 'moveLeftAnimation') {
                            e.target.animation.start('moveRightAnimation');
                        }
                        if (e.animation === 'moveRightAnimation') {
                            e.target.animation.start('moveLeftAnimation');
                        }
                    });
                }
                if (this.arrowLookRight) {
                    arrowR = new RODIN.Text3D({
                        text: this.arrowLookRight,
                        font: './fonts/Roboto-Bold.ttf',
                        fontSize: 0.03,
                        material: material
                    });
                    arrowR.on(RODIN.CONST.READY, (e) => {
                        this.add(e.target);
                        e.target.center();
                        e.target.position.x = (this.getWidth(this.text) / 2 + this.deltaX);

                        const moveRightAnimation = new RODIN.AnimationClip("moveRightAnimation", {
                            position: {
                                x: e.target.position.x
                            }
                        });
                        moveRightAnimation.easing(RODIN.AnimationClip.EASING.Sinusoidal.InOut);
                        moveRightAnimation.duration(800);
                        const moveLeftAnimation = new RODIN.AnimationClip("moveLeftAnimation", {
                            position: {
                                x: e.target.position.x + 0.04
                            }
                        });
                        moveLeftAnimation.easing(RODIN.AnimationClip.EASING.Sinusoidal.InOut);
                        moveLeftAnimation.duration(800);

                        e.target.animation.add(moveRightAnimation, moveLeftAnimation);
                        e.target.animation.start('moveLeftAnimation');
                    });
                    arrowR.on(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
                        if (e.animation === 'moveLeftAnimation') {
                            e.target.animation.start('moveRightAnimation');
                        }
                        if (e.animation === 'moveRightAnimation') {
                            e.target.animation.start('moveLeftAnimation');
                        }
                    });
                }
            });

            this.text.on(RODIN.CONST.UPDATE, e => {
                if (this.looked && !this.check(this.lookDirection())) {
                    this.text.animation.stop('fadeAnimation', false);
                    this.text.animation.start('fadeOutAnimation');
                    this.looked = false;
                }
                if (!this.looked && this.check(this.lookDirection())) {
                    this.text.animation.stop('fadeOutAnimation', false);
                    this.text.animation.start('fadeAnimation');
                    this.looked = true;
                }
            });
        }
    }

    getWidth(text){
        text._threeObject.geometry.computeBoundingBox();
        const maxT = text._threeObject.geometry.boundingBox.max.x;
        const minT = text._threeObject.geometry.boundingBox.min.x;
        return maxT + Math.abs(minT);
    }

    lookDirection() {
        const dir = RODIN.Avatar.HMDCamera.worldDirection;
        let angle = Math.atan(dir.x / dir.z);
        if (dir.z > 0) {
            if (dir.x > 0) {
                angle = -Math.PI + angle;
            } else {
                angle = Math.PI + angle;
            }
        }
        return angle;
    }
}