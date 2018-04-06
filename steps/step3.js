import * as RODIN from 'rodin/main';

import {StepSculpt} from "./StepSculpt.js"

export const step3 = new StepSculpt();
step3.init = () => {
    step3.position.z = -7.5;

    const text = new RODIN.Text3D({
        text: 'Now, enabling all the web developers,',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Regular.ttf',
        fontSize: 0.05,
    });
    text.on(RODIN.CONST.READY, (e) => {
        text.center();
        text.position.y = 0.08;
        step3.add(text);
    });

    const text1 = new RODIN.Text3D({
        text: '50M+',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Bold.ttf',
        fontSize: 0.05,
    });
    text1.on(RODIN.CONST.READY, (e) => {
        step3.add(text1);

        text1._threeObject.geometry.computeBoundingBox();

        const maxX = text1._threeObject.geometry.boundingBox.max.x;
        const minX = text1._threeObject.geometry.boundingBox.min.x;

        const boldTxt1 = new RODIN.Text3D({
            text: 'of them, the tools needed to build apps',
            color: 0xFFFFFF,
            font: './fonts/Roboto-Regular.ttf',
            fontSize: 0.05,
        });
        boldTxt1.on(RODIN.CONST.READY, (e) => {
            step3.add(boldTxt1);
            boldTxt1._threeObject.geometry.computeBoundingBox();

            const maxXB = boldTxt1._threeObject.geometry.boundingBox.max.x;
            const minXB = boldTxt1._threeObject.geometry.boundingBox.min.x;
            const boldTxt1Width = (maxXB + minXB);

            text1.position.x = -((maxX - minX) + boldTxt1Width) / 2 - 0.015;
            text1.position.y = -0.025;
            boldTxt1.position.x = ((maxX - minX) - boldTxt1Width) / 2 + 0.015;
            boldTxt1.position.y = -0.025;
        });
    });

    const text2 = new RODIN.Text3D({
        text: 'like this in',
        color: 0xFFFFFF,
        font: './fonts/Roboto-Regular.ttf',
        fontSize: 0.05,
    });
    text2.on(RODIN.CONST.READY, (e) => {
        step3.add(text2);
        text2._threeObject.geometry.computeBoundingBox();

        const maxX = text2._threeObject.geometry.boundingBox.max.x;
        const minX = text2._threeObject.geometry.boundingBox.min.x;

        const boldTxt1 = new RODIN.Text3D({
            text: 'under 10 min.',
            color: 0xFFFFFF,
            font: './fonts/Roboto-Bold.ttf',
            fontSize: 0.05,
        });
        boldTxt1.on(RODIN.CONST.READY, (e) => {
            step3.add(boldTxt1);
            boldTxt1._threeObject.geometry.computeBoundingBox();

            const maxXB = boldTxt1._threeObject.geometry.boundingBox.max.x;
            const minXB = boldTxt1._threeObject.geometry.boundingBox.min.x;
            const boldTxt1Width = (maxXB + minXB);

            text2.position.x = -((maxX - minX) + boldTxt1Width ) / 2 - 0.015;
            text2.position.y = -0.105;
            boldTxt1.position.x = ((maxX - minX) - boldTxt1Width ) / 2 + 0.015;
            boldTxt1.position.y = -0.105;

        });
    });
}