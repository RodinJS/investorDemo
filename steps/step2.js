import * as RODIN from 'rodin/main';

import {StepSculpt} from "./StepSculpt.js"

export const step2 = new StepSculpt();
step2.init = () => {
    step2.position.z = -4.5;

    const cardboard = new RODIN.Plane(0.5, 0.25, new THREE.MeshBasicMaterial({
        transparent: true,
        map: RODIN.Loader.loadTexture('img/cardboard.png')
    }));
    cardboard.position.y = 0.22;
    step2.add(cardboard);
/*
I started out manufacturing vr cardboard boxes. In fact, I partnered with Google three years ago and made about 2 million of them.
(btw we just built this experience for you guys today and didn’t have time to send out headsets).
 */
    const text = new RODIN.Text3D({
        text: 'I started out manufacturing vr cardboard boxes.',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Regular.ttf',
        fontSize: 0.05,
    });
    text.on(RODIN.CONST.READY, (e) => {
        text.center();
        text.position.y = 0.0;
        step2.add(text);
    });

    const text1 = new RODIN.Text3D({
        text: 'In fact, I partnered with  ',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Regular.ttf',
        fontSize: 0.05,
    });
    text1.on(RODIN.CONST.READY, (e) => {
        step2.add(text1);

        text1._threeObject.geometry.computeBoundingBox();

        const maxX = text1._threeObject.geometry.boundingBox.max.x;
        const minX = text1._threeObject.geometry.boundingBox.min.x;

        const boldTxt1 = new RODIN.Text3D({
            text: 'Google',
            color: 0xFFFFFF,
            font: './fonts/Roboto-Bold.ttf',
            fontSize: 0.05,
        });
        boldTxt1.on(RODIN.CONST.READY, (e) => {
            step2.add(boldTxt1);
            boldTxt1._threeObject.geometry.computeBoundingBox();

            const maxXB = boldTxt1._threeObject.geometry.boundingBox.max.x;
            const minXB = boldTxt1._threeObject.geometry.boundingBox.min.x;
            const boldTxt1Width = (maxXB + minXB);

            text1.position.x = -((maxX - minX) + boldTxt1Width) / 2 - 0.015;
            text1.position.y = -0.105;
            boldTxt1.position.x = ((maxX - minX) - boldTxt1Width) / 2 + 0.015;
            boldTxt1.position.y = -0.105;
        });
    });

    const text2 = new RODIN.Text3D({
        text: 'three years ago and made about ',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Regular.ttf',
        fontSize: 0.05,
    });
    text2.on(RODIN.CONST.READY, (e) => {
        step2.add(text2);
        text2._threeObject.geometry.computeBoundingBox();

        const maxX = text2._threeObject.geometry.boundingBox.max.x;
        const minX = text2._threeObject.geometry.boundingBox.min.x;

        const boldTxt1 = new RODIN.Text3D({
            text: ' 2 million ',
            color: 0xFFFFFF,
            font: './fonts/Roboto-Bold.ttf',
            fontSize: 0.05,
        });
        boldTxt1.on(RODIN.CONST.READY, (e) => {
            step2.add(boldTxt1);
            boldTxt1._threeObject.geometry.computeBoundingBox();

            const maxXB = boldTxt1._threeObject.geometry.boundingBox.max.x;
            const minXB = boldTxt1._threeObject.geometry.boundingBox.min.x;
            const boldTxt1Width = (maxXB + minXB);

            const slimTxt1 = new RODIN.Text3D({
                text: ' of them.',
                color: 0xFFFFFF,
                font: './fonts/Roboto-Regular.ttf',
                fontSize: 0.05,
            });
            slimTxt1.on(RODIN.CONST.READY, (e) => {
                step2.add(slimTxt1);
                slimTxt1._threeObject.geometry.computeBoundingBox();

                const maxXS = slimTxt1._threeObject.geometry.boundingBox.max.x;
                const minXS = slimTxt1._threeObject.geometry.boundingBox.min.x;
                const slimTxt1Width = (maxXS + minXS);

                text2.position.x = -((maxX - minX) + boldTxt1Width + slimTxt1Width) / 2 - 0.015;
                text2.position.y = -0.185;
                boldTxt1.position.x = ((maxX - minX) - boldTxt1Width - slimTxt1Width) / 2 + 0.015;
                boldTxt1.position.y = -0.185;
                slimTxt1.position.x = ((maxX - minX) - boldTxt1Width + slimTxt1Width) / 2 + 0.015;
                slimTxt1.position.y = -0.185;
            });
            const footer = new RODIN.Text3D({
                text: '(btw we just built this experience for you guys today\nand didn’t have time to send out headsets)',
                color: 0xFFFFFF,
                font: './fonts/Roboto-Regular.ttf',
                lineHeight: 0.05,
                fontSize: 0.03,
                align: "center"
            });
            footer.on(RODIN.CONST.READY, (e) => {
                footer.center();
                footer.position.y = -0.28;
                step2.add(footer);
            });
        });
    });
}