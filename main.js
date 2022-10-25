import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';

// DOM Cursor

new kursor({
    type: 4,
    removeDefaultCursor: true,

    color: '#FEFEFE'
})



const container = document.querySelector('.stroke-circle')

const sizes = {
     width: '330',
     height: '330'
}

const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 65, sizes.width / sizes.height, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer({
                antilias: true,
                alpha: true
            });
			renderer.setSize( sizes.width,  sizes.height );
			document.querySelector('.creater-image-container').appendChild( renderer.domElement );

            const shadermaterial = new THREE.ShaderMaterial( {

                uniforms: {
            
                    time: { value: 1.0 },
                    resolution: { value: new THREE.Vector2() }
            
                },
            
                vertexShader:  `
                varying vec2 uUV;

                    void main(){
                         gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                         uUV = uv;
                    }
                 `,
            
                fragmentShader: `
                varying vec2 uUV;
                void main(){
                    gl_FragColor = vec4(0.1,0.0,uUV.y,1.0);
               }
                `,

                transparent: true,
                
            
            } );

			const geometry = new THREE.BoxGeometry( 1, 1, 1,6,6,6 );
			const material = new THREE.MeshBasicMaterial( {wireframe: true, color: '#3139F1' } );
			const cube = new THREE.Mesh( geometry, shadermaterial );
			scene.add( cube );

            const spheregeometry = new THREE.SphereGeometry(1,20,20);
            const sphere = new THREE.Mesh(spheregeometry,shadermaterial)
            scene.add(sphere)

            sphere.scale.set(0,0,0)

			camera.position.z = 2.6;

            let time = 0;
			function animate() {
				requestAnimationFrame( animate );

				cube.rotation.y += 0.01;
				cube.rotation.x += 0.01;



                time += 0.02
                let value = Math.sin(time)

				// cube.scale.set( value,value,value )

               
                // sphere.scale.set( value,value,value )


				renderer.render( scene, camera );
			};

			animate();







            