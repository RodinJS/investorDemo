import * as RODIN from 'rodin/main';
import {steps} from "./steps/Steps.js"
import {LookingDirection} from './LookingDirection.js'

export class Next extends RODIN.Plane {
    constructor() {
        super(2, 1, new THREE.MeshBasicMaterial({transparent: true, opacity: 0.0}));
        this.position.set(0, 1.4, -1.51);

        this.on(RODIN.CONST.GAMEPAD_BUTTON_UP, () => {
            steps.requestNext()
        });

        this.lookRight = new LookingDirection(['Look right', '>']);
        this.lookRight.rotation.y = Math.PI / 2;
        this.lookRight.position.x = -1.5;
        this.lookRight.position.z = 1.5;
        this.add(this.lookRight);

        this.lookLeft = new LookingDirection(['<', 'Look left']);
        this.lookLeft.rotation.y = -Math.PI / 2;
        this.lookLeft.position.x = 1.5;
        this.lookLeft.position.z = 1.5;
        this.add(this.lookLeft);

        this.lookForward = new LookingDirection(['<', 'Look behind you\nit\'s much more interesting there', '>']);
        this.lookForward.rotation.y = Math.PI;
        this.lookForward.position.z = 3;
        this.add(this.lookForward);
    }
    initSteps(){
        steps.initTexts();
    }
}