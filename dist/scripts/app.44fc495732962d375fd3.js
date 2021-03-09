(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{319:function(e,t,i){"use strict";i.r(t);var n=i(313),a=i(314),r=i.n(a),s=i(315),o=i.n(s),h=i(316),u=i.n(h),c=i(317),l=i.n(c),d=function(e,t,i,n){return i*Math.sin(e/n*(Math.PI/2))+t};function f(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var v=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.maxAge=120,this.radius=300,this.trail=[],this.spots=[],this.numSpots=30,this.initTexture(),this.initSpots()}var t,i,a;return t=e,(i=[{key:"initTexture",value:function(){this.canvas=document.createElement("canvas"),this.canvas.width=this.width=window.innerWidth,this.canvas.height=this.height=window.innerHeight,this.ctx=this.canvas.getContext("2d"),this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.texture=new n.Texture(this.canvas),this.canvas.id="canvasTexture",this.canvas.style.width=this.canvas.style.height="".concat(this.canvas.width,"px")}},{key:"initSpots",value:function(){for(var e=0;e<this.numSpots;e++){var t={x:Math.random()*this.width,y:Math.random()*this.height,radius:300*Math.random()+50};t.gradient=this.ctx.createRadialGradient(t.x,t.y,.25*t.radius,t.x,t.y,t.radius),t.gradient.addColorStop(0,"rgba(255, 255, 255, 0.5"),t.gradient.addColorStop(1,"rgba(0, 0, 0, 0.0)"),this.spots.push(t)}}},{key:"update",value:function(e){var t=this;this.clear(),this.trail.forEach((function(e,i){e.age++,e.age>t.maxAge&&t.trail.splice(i,1)})),this.drawBorder(),this.drawSpots(),this.trail.forEach((function(e,i){t.drawTouch(e)})),this.texture.needsUpdate=!0}},{key:"clear",value:function(){this.ctx.fillStyle="white",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}},{key:"addTouch",value:function(e){var t=0,i=this.trail[this.trail.length-1];if(i){var n=i.x-e.x,a=i.y-e.y,r=n*n+a*a;t=Math.min(1e4*r,1)}this.trail.push({x:e.x,y:e.y,age:0,force:t})}},{key:"drawTouch",value:function(e){var t={x:e.x,y:e.y},i=1;i=e.age<.3*this.maxAge?d(e.age/(.3*this.maxAge),0,1,1):d(1-(e.age-.3*this.maxAge)/(.7*this.maxAge),0,1,1),i*=e.force;var n=this.radius*i,a=this.ctx.createRadialGradient(t.x,t.y,.25*n,t.x,t.y,n);a.addColorStop(0,"rgba(255, 255, 255, 0.2)"),a.addColorStop(1,"rgba(0, 0, 0, 0.0)"),this.ctx.beginPath(),this.ctx.fillStyle=a,this.ctx.arc(t.x,t.y,n,0,2*Math.PI),this.ctx.fill()}},{key:"drawSpots",value:function(){for(var e=0;e<this.numSpots;e++){var t=this.spots[e];this.ctx.beginPath(),this.ctx.fillStyle=t.gradient,this.ctx.arc(t.x,t.y,t.radius,0,2*Math.PI),this.ctx.fill()}}},{key:"drawBorder",value:function(){var e=this.ctx.createRadialGradient(this.width/2,this.height/2,.5*this.height,this.width/2,this.height/2,.9*this.height);e.addColorStop(0,"black"),e.addColorStop(1,"white"),this.ctx.fillStyle=e,this.ctx.fillRect(0,0,this.width,this.height)}}])&&f(t.prototype,i),a&&f(t,a),e}();function g(e,t,i,n,a,r,s){try{var o=e[r](s),h=o.value}catch(e){return void i(e)}o.done?t(h):Promise.resolve(h).then(n,a)}function w(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.app=t,this.PARAMS={rotSpeed:.05},this.init()}var t,i,a,s,h;return t=e,(i=[{key:"init",value:(s=regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.initThree(),this.initBgScene(),e.next=4,this.loadTextImage();case 4:this.initMouseMoveListen(),this.initCanvasTexture(),this.initRenderTri();case 7:case"end":return e.stop()}}),e,this)})),h=function(){var e=this,t=arguments;return new Promise((function(i,n){var a=s.apply(e,t);function r(e){g(a,i,n,r,o,"next",e)}function o(e){g(a,i,n,r,o,"throw",e)}r(void 0)}))},function(){return h.apply(this,arguments)})},{key:"loadTextImage",value:function(){var e=this;return new Promise((function(t,i){(new n.TextureLoader).load("./text-image.png",(function(i){e.textImageTexture=i,t()}))}))}},{key:"initMouseMoveListen",value:function(){var e=this;this.mouse=new n.Vector2,this.width=window.innerWidth,this.height=window.innerHeight,window.addEventListener("mousemove",(function(t){var i=t.clientX,n=t.clientY;e.mouse.x=i,e.mouse.y=n,e.canvasTexture.addTouch(e.mouse)}))}},{key:"initCanvasTexture",value:function(){this.canvasTexture=new v}},{key:"initTweakPane",value:function(){this.pane=new u.a,this.pane.addInput(this.PARAMS,"rotSpeed",{min:0,max:.5}).on("change",(function(e){}))}},{key:"initThree",value:function(){this.scene=new n.Scene,this.camera=new n.OrthographicCamera,this.renderer=new n.WebGLRenderer({antialias:!0,alpha:!0}),this.renderer.autoClear=!0,this.clock=new n.Clock}},{key:"loadTextMesh",value:function(){var e=this;return new Promise((function(t,i){(new r.a).load("./bbali.glb",(function(i){e.textMesh=i.scene.children[0],console.log(e.textMesh),e.textMesh.add(new n.AxesHelper),e.bgScene.add(e.textMesh),t()}))}))}},{key:"returnRenderTriGeometry",value:function(){var e=new n.BufferGeometry,t=new Float32Array([-1,-1,3,-1,-1,3]);return e.addAttribute("position",new n.BufferAttribute(t,2)),e}},{key:"initRenderTri",value:function(){this.resize();var e=this.returnRenderTriGeometry(),t=new n.Vector2;this.renderer.getDrawingBufferSize(t),this.RenderTriTarget=new n.WebGLRenderTarget(t.x,t.y,{format:n.RGBFormat,stencilBuffer:!1,depthBuffer:!0}),this.triMaterial=new n.RawShaderMaterial({fragmentShader:o()("precision highp float;\n#define GLSLIFY 1\nuniform sampler2D uScene;\nuniform sampler2D uTextImage;\nuniform vec2 uResolution;\nuniform float uTime;\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / uResolution.xy;\n    vec4 color = texture2D(uScene, uv);\n    vec4 textImageColor = texture2D(uTextImage, uv);\n\n    vec4 refractColor1 = texture2D(uTextImage, uv + (color.r * 0.009 * sin(uTime * 0.5) * 1.3));\n    vec4 refractColor2 = texture2D(uTextImage, uv + (color.r * 0.013 * sin(uTime * 0.5) * 1.3));\n    vec4 refractColor3 = texture2D(uTextImage, uv + (color.r * 0.017 * sin(uTime * 0.5) * 1.3));\n\n    color = vec4(refractColor1.r, refractColor2.g, refractColor3.b, 1.0);\n\n    \n    gl_FragColor = vec4(color);\n}"),vertexShader:o()("precision highp float;\n#define GLSLIFY 1\nattribute vec2 position;\n\nvoid main() {\n    // Look ma! no projection matrix multiplication,\n    // because we pass the values directly in clip space coordinates.\n    gl_Position = vec4(position, 1.0, 1.0);\n}"),uniforms:{uScene:{type:"t",value:this.canvasTexture.texture},uTextImage:{type:"t",value:this.textImageTexture},uResolution:{value:t},uTime:{value:0}}});var i=new n.Mesh(e,this.triMaterial);i.frustumCulled=!1,this.scene.add(i)}},{key:"initBgScene",value:function(){this.bgRenderTarget=new n.WebGLRenderTarget(window.innerWidth,window.innerHeight),this.bgCamera=new n.PerspectiveCamera(50,window.innerWidth/window.innerHeight,.01,100),this.controls=new l.a(this.bgCamera,this.renderer.domElement),this.bgCamera.position.z=3,this.controls.update(),this.bgScene=new n.Scene}},{key:"initLights",value:function(){this.pointLight=new n.PointLight(16711680,1,100),this.pointLight.position.set(0,0,50),this.bgScene.add(this.pointLight)}},{key:"initObject",value:function(){var e=new n.TetrahedronBufferGeometry(10,0),t=new n.MeshPhysicalMaterial({roughness:.5,metalness:.3,reflectivity:1,clearcoat:1});this.tetra=new n.Mesh(e,t),console.log("tetra:  ",this.tetra)}},{key:"resize",value:function(){this.renderer&&(this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.fovHeight=2*Math.tan(this.camera.fov*Math.PI/180/2)*this.camera.position.z,this.fovWidth=this.fovHeight*this.camera.aspect,this.renderer.setSize(window.innerWidth,window.innerHeight),this.trackball&&this.trackball.handleResize())}},{key:"updateTetra",value:function(){this.tetra.rotation.y+=this.PARAMS.rotSpeed}},{key:"updateTextMesh",value:function(){this.textMesh.rotation.y+=this.PARAMS.rotSpeed}},{key:"update",value:function(){this.clock.getDelta();var e=5e-4*performance.now();this.controls.update(),this.triMaterial&&(this.triMaterial.uniforms.uTime.value=e),this.tetra&&this.updateTetra(),this.textMesh&&this.updateTextMesh(),this.canvasTexture&&this.canvasTexture.update(),this.trackball&&this.trackball.update()}},{key:"draw",value:function(){this.renderer.setRenderTarget(this.bgRenderTarget),this.renderer.render(this.bgScene,this.bgCamera),this.renderer.setRenderTarget(null),this.renderer.render(this.scene,this.camera)}}])&&w(t.prototype,i),a&&w(t,a),e}();function m(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}i.d(t,"default",(function(){return x}));var x=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i,n;return t=e,(i=[{key:"init",value:function(){this.initWebGL(),this.addListeners(),this.animate(),this.resize()}},{key:"initWebGL",value:function(){this.webgl=new p(this),document.querySelector(".container").appendChild(this.webgl.renderer.domElement)}},{key:"addListeners",value:function(){this.handlerAnimate=this.animate.bind(this),window.addEventListener("resize",this.resize.bind(this)),window.addEventListener("keyup",this.keyup.bind(this))}},{key:"animate",value:function(){this.update(),this.draw(),this.raf=requestAnimationFrame(this.handlerAnimate)}},{key:"update",value:function(){this.webgl&&this.webgl.update()}},{key:"draw",value:function(){this.webgl&&this.webgl.draw()}},{key:"resize",value:function(){this.webgl&&this.webgl.resize()}},{key:"keyup",value:function(e){82==e.keyCode&&this.webgl.trackball&&this.webgl.trackball.reset()}}])&&m(t.prototype,i),n&&m(t,n),e}()}}]);