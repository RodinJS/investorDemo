import * as RODIN from 'rodin/main';

RODIN.Scene.renderer.shadowMap.enabled = true;
const milkyway = new RODIN.Sphere(50, 720, 4, new THREE.MeshBasicMaterial({map: RODIN.Loader.loadTexture('./img/milkyway.jpg'),}));
milkyway.scale.z = -1;
milkyway.rotation.y = Math.PI / 2;
const sunR = 3;
const earthR = .4;

///////////////////////////////////PLANET/////////////////////////////////////

const earthmat = new THREE.MeshPhongMaterial({
    bumpScale: 0.03,
    specular: 0x888888,
    shininess: 10,
    map: RODIN.Loader.loadTexture('./img/earthmap1k.jpg'),
    bumpMap: RODIN.Loader.loadTexture('./img/earthbump1k.jpg'),
    specularMap: RODIN.Loader.loadTexture('./img/earthspec1k.jpg')
});

const earth = new RODIN.Sphere(earthR, 32, 32, earthmat);

earth._threeObject.receiveShadow = true;
earth._threeObject.castShadow = true;

//////////////////////////////////////////////////////////////////////////////
milkyway.position.set(0, 1.6, -25);


const sun_fragmentShader = `uniform float time;
uniform vec2 resolution;
uniform float fogDensity;
uniform vec3 fogColor;
uniform sampler2D texture1;
uniform sampler2D texture2;
varying vec2 vUv;
void main( void ) {

				vec2 position = - 1.0 + 2.0 * vUv;
				vec4 noise = texture2D( texture1, vUv );
				vec2 T1 = vUv + vec2( 1.5, - 1.5 ) * time * 0.02;
				vec2 T2 = vUv + vec2( - 0.5, 2.0 ) * time * 0.01;
				T1.x += noise.x * 2.0;
				T1.y += noise.y * 2.0;
				T2.x -= noise.y * 0.2;
				T2.y += noise.z * 0.2;
				float p = texture2D( texture1, T1 * 2.0 ).a;
				vec4 color = texture2D( texture2, T2 * 2.0 );
				vec4 temp = color * ( vec4( p, p, p, p ) * 0.7 ) + ( color * color + 0.3 );
				if( temp.r > 1.0 ) { temp.bg += clamp( temp.r - 1.5, 0.0, 100.0 ); }
				if( temp.g > 1.0 ) { temp.rb += temp.g - 1.0; }
				if( temp.b > 1.0 ) { temp.rg += temp.b - 1.0; }
				gl_FragColor = temp;
				float depth = gl_FragCoord.z / gl_FragCoord.w;
				const float LOG2 = 1.442695;
				float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
				fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );
				gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
}`;

const sun_vertexShader = `uniform vec2 uvScale;
	varying vec2 vUv;
	void main()
	{
		vUv = uvScale * uv;
		vec4 mvPosition = modelViewMatrix * vec4( position, 1 );
		gl_Position = projectionMatrix * mvPosition;
	}`;




const glow_fragmentShader = `uniform vec3 glowColor;
varying float intensity;
void main() 
{
	vec3 glow = glowColor * intensity;
    gl_FragColor = vec4( glow, 1.0 );
}`;
const glow_vertexShader = `uniform vec3 viewVector;
uniform float c;
uniform float p;
varying float intensity;
void main() 
{
    vec3 vNormal = normalize( normalMatrix * normal );
	vec3 vNormel = normalize( normalMatrix * viewVector );
	intensity = pow( c - dot(vNormal, vNormel), p );
	
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`;

let sun_uniforms = {
    fogDensity: {value: 0.0},
    fogColor: {value: new THREE.Vector3(0, 0, 0)},
    time: {value: 1.0},
    resolution: {value: new THREE.Vector2()},
    uvScale: {value: new THREE.Vector2(1.0, 1.0)},
    texture1: {value: RODIN.Loader.loadTexture('shaders/lava.png')},
    texture2: {value: RODIN.Loader.loadTexture('shaders/lavatile3.jpg')}
};

sun_uniforms.texture1.value.wrapS = sun_uniforms.texture1.value.wrapT = THREE.RepeatWrapping;
sun_uniforms.texture2.value.wrapS = sun_uniforms.texture2.value.wrapT = THREE.RepeatWrapping;


var sunGLowMat = new THREE.ShaderMaterial(
    {
        uniforms:
            {
                "c": {type: "f", value: 0.5},
                "p": {type: "f", value: 6},
                glowColor: {type: "c", value: new THREE.Color(0xFEB54F)},
                viewVector: {type: "v3", value: RODIN.Avatar.active.position}
            },
        vertexShader: glow_vertexShader,
        fragmentShader: glow_fragmentShader,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
const atmoMat = new THREE.ShaderMaterial(
    {
        uniforms:
            {
                "c": {type: "f", value: 0.5},
                "p": {type: "f", value: 6},
                glowColor: {type: "c", value: new THREE.Color(0x2DAEF2)},
                viewVector: {type: "v3", value: RODIN.Avatar.active.position}
            },
        vertexShader: glow_vertexShader,
        fragmentShader: glow_fragmentShader,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });

const sunGlowGeo = new THREE.IcosahedronGeometry(sunR * 1.6, 2);
const glow = new RODIN.Sculpt(new THREE.Mesh(sunGlowGeo, sunGLowMat));
const atmosphere = new RODIN.Sphere(earthR * 1.08, 32, 32, atmoMat);
const sky = new RODIN.Sphere(earthR * 1.01, 32, 32, new THREE.MeshPhongMaterial(
    {
        map: RODIN.Loader.loadTexture('./img/earthcloudmap.jpg'),
        alphaMap: RODIN.Loader.loadTexture('./img/earthcloudmaptrans.jpg'),
        side: THREE.DoubleSide,
        transparent: true
    }));

const sun = new RODIN.Sphere(sunR, 32, 32, new THREE.ShaderMaterial({
    uniforms: sun_uniforms,
    vertexShader: sun_vertexShader,
    fragmentShader: sun_fragmentShader
}));
let ambient = null;
RODIN.Scene.active._scene.children.forEach(function (s) {
    if (s.type == "AmbientLight")
        ambient = s;
});
ambient.intensity = 2;

for (let vi = 0; vi < sunGlowGeo.vertices.length; vi ++) {
    const r = 0.95 - Math.random() / 16;
    sunGlowGeo.vertices[vi].x *= r;
    sunGlowGeo.vertices[vi].y *= r;
    sunGlowGeo.vertices[vi].z *= r;
}
sunGlowGeo.verticesNeedUpdate = true;


export const initSpace = function () {
    const avatarpos = new THREE.Vector3(0,0,-36);
    RODIN.Scene.add(milkyway);
    RODIN.Scene.add(sun);
    RODIN.Scene.add(glow);
    RODIN.Scene.add(earth);
    RODIN.Scene.add(atmosphere);
    RODIN.Scene.add(sky);

    sun.position.set(15, 0, avatarpos.z);
    glow.position.set(15, 0, avatarpos.z);
    earth.position.set(-1, 0.4, sun.position.z + 3);
    sun.rotation.y = Math.PI / 2;
    sky.position.copy(earth.position);
    atmosphere.position.copy(earth.position);

    sun.on(RODIN.CONST.UPDATE, () => {
        sun.material.uniforms.time.value += 0.4 * RODIN.Time.delta * 0.001;
    });
    glow.on(RODIN.CONST.UPDATE, (e) => {
        // e.target.geometry.rotateX(0.001);
        e.target.geometry.rotateY(0.0012);
        e.target.geometry.rotateZ(0.0016);
        const p = RODIN.Avatar.active.position;
        e.target.material.uniforms.viewVector.value =
            new THREE.Vector3().subVectors(new THREE.Vector3(p.x, p.y + 1.6, p.z), e.target.position);
    });
    atmosphere.on(RODIN.CONST.UPDATE, (e) => {
        const p = RODIN.Avatar.active.position;
        e.target.material.uniforms.viewVector.value =
            new THREE.Vector3().subVectors(new THREE.Vector3(p.x, p.y + 1.6, p.z), e.target.position);
    });
    earth.on(RODIN.CONST.UPDATE, () => {
        earth.rotation.y += RODIN.Time.delta * 0.00005;
        sky.rotation.y += RODIN.Time.delta * 0.0001;
    });




    const l = new THREE.SpotLight(0xffffff, 1, 0, 10, 2);
    l.position.copy(sun._threeObject.position);
    l.target = earth._threeObject;
    l.castShadow = true;
    let light = new RODIN.Sculpt(l);			//default; light shining from top

    RODIN.Scene.add(light);
};
let dim = function () {
    if (ambient.intensity > 0) {
        ambient.intensity -= 0.025;
    }
    else {
        sun.removeEventListener(RODIN.CONST.UPDATE, dim)
    }
}

export const dimLights = function () {
    sun.on(RODIN.CONST.UPDATE, dim);
}