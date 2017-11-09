import * as RODIN from 'rodin/main';

const mainScene = RODIN.Scene.scenes.filter(i => i.name === 'Main')[0];

export class StepSculpt extends RODIN.Sculpt {
    constructor() {
        super();

        this.position.y = 1.4;
    }
    addToScene() {
        mainScene.add(this);
    }

    init() {
        console.warn('init is not overrided');
    }
}