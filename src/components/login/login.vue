<template>
  <div class="container">
    <canvas ref="threeCanvas"></canvas>
    <div class="form-container">
      <div class="form-content">
        <h2>欢迎您的到来</h2>
        <form @submit.prevent="handleLogin" autocomplete="off">
          <div class="input-group">
            <label for="username">用户名</label>
            <div class="input-wrapper">
              <input
                id="username"
                v-model="username"
                type="text"
                placeholder="输入用户名"
                required
                :disabled="loading"
              />
            </div>
          </div>

          <div class="input-group">
            <label for="password">密码</label>
            <div class="input-wrapper">
              <input
                id="password"
                v-model="password"
                type="password"
                placeholder="输入您的密码"
                required
                :disabled="loading"
                @input="validatePassword"
              />
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
          >
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </form>

        <div class="form-footer">
          <p>没有账号，去注册！<router-link to="/signIn">注册</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sky } from "three/examples/jsm/objects/Sky";
import { Water } from "three/examples/jsm/objects/Water";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";
import { useRouter } from "vue-router";
import { login } from '@/api/auth';
import { ElMessage } from 'element-plus';
import { uploadAvatar } from '@/api/file';

const threeCanvas = ref(null);
const username = ref("");
const password = ref("");
const loading = ref(false);
const router = useRouter();

// const handleLogin = async () => {
//   await router.push('/main/charitable-projects/platform-charity');
// };

const handleLogin = async () => {
  if (!username.value || !password.value) {
    ElMessage.warning('请输入用户名和密码');
    return;
  }

  try {
    loading.value = true;
    const response = await login(username.value, password.value);
    
    if (response.data?.token) {
      ElMessage.success('登录成功');
      // 使用 await 等待路由跳转完成
      await router.push('/main/charitable-projects/platform-charity');
      // 触发全局事件，通知需要更新用户信息的组件
      window.dispatchEvent(new Event('user-logged-in'));
    } else {
      throw new Error('登录失败：未收到有效的认证信息');
    }
  } catch (error) {
    console.error('Login failed:', error);
    ElMessage.error(error.response?.data?.message || '登录失败，请检查用户名和密码');
  } finally {
    loading.value = false;
  }
};

const validatePassword = () => {
  // 添加密码验证逻辑
};

// Three.js initialization code
onMounted(() => {
  let scene, camera, renderer, controls, water, sun, sky;

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      20000
    );
    camera.position.set(30, 30, 100);

    renderer = new THREE.WebGLRenderer({
      canvas: threeCanvas.value, // Access canvas through ref
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 40;
    controls.maxDistance = 200;
    controls.maxPolarAngle = Math.PI * 0.495;

    sun = new THREE.Vector3();

    // Sky
    sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const skyUniforms = sky.material.uniforms;
    skyUniforms["turbidity"].value = 10;
    skyUniforms["rayleigh"].value = 2;
    skyUniforms["mieCoefficient"].value = 0.005;
    skyUniforms["mieDirectionalG"].value = 0.8;

    // Water
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/waternormals.jpg",
        function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
      ),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined,
    });
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    // Update sun position
    const parameters = {
      elevation: 2,
      azimuth: 180,
    };

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    function updateSun() {
      const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
      const theta = THREE.MathUtils.degToRad(parameters.azimuth);
      sun.setFromSphericalCoords(1, phi, theta);
      sky.material.uniforms["sunPosition"].value.copy(sun);
      water.material.uniforms["sunDirection"].value.copy(sun).normalize();
      scene.environment = pmremGenerator.fromScene(sky).texture;
    }

    updateSun();

    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
    water.material.uniforms["time"].value += 1.0 / 60.0;
    controls.update();
    renderer.render(scene, camera);
  }

  init();
  animate();
});
</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

canvas {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.form-content {
  padding: 40px;
  width: 85%;
}

h2 {
  margin: 0 0 10px;
  color: #333;
  font-size: 28px;
  font-weight: 700;
}

p {
  margin: 0 0 30px;
  color: #666;
  font-size: 16px;
}

form {
  margin-top: 15%;

}

.input-group {
  margin-bottom: 20px;
  width: 95%;
}

.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.icon {
  margin-left: 10px;
  font-size: 18px;
  flex-shrink: 0; 
  margin-left: 10px; 
  font-size: 18px; 
}

.green-check {
  color: green;
}

.red-cross {
  color: red;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  background: rgba(255, 255, 255, 0.5);
}

input:focus {
  outline: none;
  background: white;;
}

input:not(:placeholder-shown) {
    background-color: #f8f9fa; /* 可选：改变背景颜色 */
}

/* input:valid {

} */

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
    background-color: #fff !important;
    color: #333 !important;
    box-shadow: 0 0 0px 1000px white inset !important; /* 消除默认的黄色阴影 */
    -webkit-text-fill-color: #333 !important; /* 文字颜色 */
    transition: background-color 5000s ease-in-out 0s; /* 防止闪烁 */
}


button {
  width: 95%;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: white;
}

.form-footer {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.form-footer a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.3s;
}

.form-footer a:hover {
  color: white;
}
</style>
