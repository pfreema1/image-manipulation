import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import glslify from 'glslify';
import Tweakpane from 'tweakpane';
import fullScreenTriFrag from '../../shaders/fullScreenTri.frag';
import fullScreenTriVert from '../../shaders/fullScreenTri.vert';
import OrbitControls from 'three-orbitcontrols';
import TweenMax from 'TweenMax';
import CanvasTexture from '../CanvasTexture';

function remap(t, old_min, old_max, new_min, new_max) {
	let old_range = old_max - old_min;
	let normalizedT = t - old_min;
	let normalizedVal = normalizedT / old_range;
	let new_range = new_max - new_min;
	let newVal = normalizedVal * new_range + new_min;
	return newVal;
}

export default class WebGLView {
	constructor(app) {
		this.app = app;
		this.PARAMS = {
			rotSpeed: 0.05
		};

		this.init();

	}

	async init() {
		this.initThree();
		this.initBgScene();
		// this.initObject();
		// this.initLights();
		// this.initTweakPane();
		// await this.loadTextMesh();
		await this.loadTextImage();
		this.initMouseMoveListen();
		this.initCanvasTexture();
		this.initRenderTri();
	}

	loadTextImage() {
		return new Promise((res, rej) => {
			let textureLoader = new THREE.TextureLoader();

			textureLoader.load('./text-image.png', (texture) => {
				this.textImageTexture = texture;
				res();
			});
		});
	}

	initMouseMoveListen() {
		this.mouse = new THREE.Vector2();
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		window.addEventListener('mousemove', ({ clientX, clientY }) => {
			this.mouse.x = clientX; //(clientX / this.width) * 2 - 1;
			this.mouse.y = clientY; //-(clientY / this.height) * 2 + 1;

			this.canvasTexture.addTouch(this.mouse);
		});
	}

	initCanvasTexture() {
		this.canvasTexture = new CanvasTexture();
	}

	initTweakPane() {
		this.pane = new Tweakpane();

		this.pane
			.addInput(this.PARAMS, 'rotSpeed', {
				min: 0.0,
				max: 0.5
			})
			.on('change', value => {

			});
	}

	initThree() {
		this.scene = new THREE.Scene();

		this.camera = new THREE.OrthographicCamera();

		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		this.renderer.autoClear = true;

		this.clock = new THREE.Clock();
	}

	loadTextMesh() {
		return new Promise((res, rej) => {
			let loader = new GLTFLoader();

			loader.load('./bbali.glb', object => {
				object;
				this.textMesh = object.scene.children[0];
				console.log(this.textMesh);
				this.textMesh.add(new THREE.AxesHelper());
				this.bgScene.add(this.textMesh);

				res();
			});
		});
	}

	returnRenderTriGeometry() {
		const geometry = new THREE.BufferGeometry();

		// triangle in clip space coords
		const vertices = new Float32Array([-1.0, -1.0, 3.0, -1.0, -1.0, 3.0]);

		geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 2));

		return geometry;
	}

	initRenderTri() {
		// mostly taken from here: https://medium.com/@luruke/simple-postprocessing-in-three-js-91936ecadfb7

		this.resize();
		const geometry = this.returnRenderTriGeometry();

		const resolution = new THREE.Vector2();
		this.renderer.getDrawingBufferSize(resolution);

		this.RenderTriTarget = new THREE.WebGLRenderTarget(
			resolution.x,
			resolution.y,
			{
				format: THREE.RGBFormat,
				stencilBuffer: false,
				depthBuffer: true
			}
		);

		this.triMaterial = new THREE.RawShaderMaterial({
			fragmentShader: glslify(fullScreenTriFrag),
			vertexShader: glslify(fullScreenTriVert),
			uniforms: {
				uScene: {
					type: 't',
					value: this.canvasTexture.texture//this.bgRenderTarget.texture
				},
				uTextImage: {
					type: 't',
					value: this.textImageTexture
				},
				uResolution: { value: resolution },
				uTime: {
					value: 0.0
				}
			}
		});

		let renderTri = new THREE.Mesh(geometry, this.triMaterial);
		renderTri.frustumCulled = false;
		this.scene.add(renderTri);
	}

	initBgScene() {
		this.bgRenderTarget = new THREE.WebGLRenderTarget(
			window.innerWidth,
			window.innerHeight
		);
		this.bgCamera = new THREE.PerspectiveCamera(
			50,
			window.innerWidth / window.innerHeight,
			0.01,
			100
		);
		this.controls = new OrbitControls(this.bgCamera, this.renderer.domElement);

		this.bgCamera.position.z = 3;
		this.controls.update();

		this.bgScene = new THREE.Scene();
	}

	initLights() {
		this.pointLight = new THREE.PointLight(0xff0000, 1, 100);
		this.pointLight.position.set(0, 0, 50);
		this.bgScene.add(this.pointLight);
	}

	initObject() {
		let geo = new THREE.TetrahedronBufferGeometry(10, 0);
		let mat = new THREE.MeshPhysicalMaterial({
			roughness: 0.5,
			metalness: 0.3,
			reflectivity: 1,
			clearcoat: 1
		});
		this.tetra = new THREE.Mesh(geo, mat);
		console.log('tetra:  ', this.tetra);

		// this.bgScene.add(this.tetra);
	}

	resize() {
		if (!this.renderer) return;
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.fovHeight =
			2 *
			Math.tan((this.camera.fov * Math.PI) / 180 / 2) *
			this.camera.position.z;
		this.fovWidth = this.fovHeight * this.camera.aspect;

		this.renderer.setSize(window.innerWidth, window.innerHeight);

		if (this.trackball) this.trackball.handleResize();
	}

	updateTetra() {
		this.tetra.rotation.y += this.PARAMS.rotSpeed;
	}

	updateTextMesh() {
		this.textMesh.rotation.y += this.PARAMS.rotSpeed;
	}

	update() {
		const delta = this.clock.getDelta();
		const time = performance.now() * 0.0005;

		this.controls.update();

		if (this.triMaterial) {
			this.triMaterial.uniforms.uTime.value = time;
		}

		if (this.tetra) {
			this.updateTetra();
		}

		if (this.textMesh) {
			this.updateTextMesh();
		}

		if (this.canvasTexture) {
			this.canvasTexture.update();
		}

		if (this.trackball) this.trackball.update();
	}

	draw() {
		this.renderer.setRenderTarget(this.bgRenderTarget);
		this.renderer.render(this.bgScene, this.bgCamera);
		this.renderer.setRenderTarget(null);

		this.renderer.render(this.scene, this.camera);

	}
}
