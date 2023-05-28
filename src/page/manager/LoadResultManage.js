import {Anchor, Layout, Table, Tabs} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Search from "antd/es/input/Search";
import './DataManage.css';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import SetPallet from "./SetPallet";
import './LoadResultManage.css';




function App() {
    const canvasRef = useRef(null);
    const containerSize = { width: 6.1, height: 2.4, depth: 2.6 };
    const palletEx = { width: containerSize.width / 2, height: 0.2, depth: containerSize.depth };
    const palletTypeA = { id: 'typeA', width: 1.1, height: 0.15, depth: 1.1 };
    const [palletState, setPalletState] = useState(0);
    const [pallet, setPallet] = useState(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const [pallets, setPallets] = useState([]);

    const camera = new THREE.PerspectiveCamera(50, 1.6, 0.1, 1000);

    let count=0;

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = canvas.parentElement;
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        scene.background = new THREE.Color(0xFFFFFF);

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });

        rendererRef.current = renderer;

        renderer.setPixelRatio(window.devicePixelRatio);

        renderer.setSize(container.clientWidth, container.clientHeight);

        const controls = new OrbitControls(camera, renderer.domElement);
        camera.position.x = -1;
        camera.position.y = 3;
        camera.position.z = 25;
        sceneRef.current.camera = camera;

        const containerCube = createCube(containerSize.width, containerSize.height, containerSize.depth);
        scene.add(containerCube);
        containerCube.position.set(0, 0, 0);

        const palletExCube = createCube(palletEx.width, palletEx.height, palletEx.depth);
        scene.add(palletExCube);
        palletExCube.position.set(0, 0, 0);





        canvas.addEventListener('click', onClick1);

        const addButton = document.getElementById('addButton');
        addButton.addEventListener('click', onClick1);

        const delButton=document.getElementById('delButton');
        delButton.addEventListener('click', onClick2);



        animate();





    }, []);


    const animate = function () {
        requestAnimationFrame(animate);
        rendererRef.current.render(sceneRef.current, sceneRef.current.camera);

    };

    const onClick1 = () => {
        const newPallet = createCube(palletTypeA.width, palletTypeA.height, palletTypeA.depth);
        sceneRef.current.add(newPallet);
        newPallet.position.set(Math.random()*10, Math.random()*10, Math.random()*10);
        setPallets(prevPallets => [...prevPallets, newPallet]);


    };

    const onClick2 = () => {

        if (pallets.length > 0) {
            // Remove the last cube from the scene
            const removedPallet = pallets.pop();
            sceneRef.current.remove(removedPallet);

            // Update the cubes state
            setPallets([...pallets]);
        }
    };


    return (
        <div style={{ display: 'flex', height: '100%' }}>
      <span style={{ width: '1200px', border: '1px solid #CCC' }}>
        <canvas ref={canvasRef} style={{ width: '70%' }} />
      </span>
            <div style={{ width: '480px', height: '100%', border: '1px solid #CCC' }}>
                <div style={{ height: '50%', border: '1px solid #CCC' }}></div>
                <div style={{ height: '50%', border: '1px solid #CCC', display: 'flex', flexWrap: 'wrap' }}>
                    <button id="addButton" className='containerButton' onClick={onClick1} style={{ position: 'relative', top: '40px', left: '50px' }}>추가</button>
                    <button id='delButton' className='containerButton' onClick={onClick2} style={{ position: 'relative', top: '40px', marginLeft: '120px' }}>삭제</button>
                    <button className='containerButton' style={{ position: 'relative', top: '20px', left: '50px', marginRight: '60px' }}>최적화</button>
                    <button className='containerButton' onClick={onClick4} style={{ position: 'relative', top: '20px', left: '60px' }}>선택</button>
                </div>
            </div>
        </div>
    );
}
function createCube(width, height, depth) {
    const vertices = [
        [0, height * 2, depth * 2],
        [width * 2, height * 2, depth * 2],
        [width * 2, height * 2, 0],
        [0, height * 2, 0],
        [0, 0, depth * 2],
        [width * 2, 0, depth * 2],
        [width * 2, 0, 0],
        [0, 0, 0],
    ];

    const indices = [
        0, 1, 1, 2, 2, 3, 3, 0,
        4, 5, 5, 6, 6, 7, 7, 4,
        0, 4, 1, 5, 2, 6, 3, 7,
    ];

    const geometry = new THREE.BufferGeometry();
    const positionNumComponents = 3;
    const positions = new Float32Array(vertices.flat());
    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, positionNumComponents)
    );
    geometry.setIndex(indices);

    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const cube = new THREE.LineSegments(geometry, material);

    return cube;
}

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    backgroundColor: '#fff',


};
const siderStyle = {
    textAlign: 'right',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#fff',
    borderRight: "1px solid #CCC",
    height: '580px',
    border: '1px solid black'
};

const onSearch = (value) => {
    console.log(value)
};

const onClick4 = (value) => {
    console.log(value);
    window.open("/SetPallet", "a", "width=1200, height=600, left=100, top=50"); // 팝업 띄우기
};

const LoadResultManage = (props) => {

    return (
        <form>
            <div style={ { display: 'flex', width: '1900px', height: '600px', border: '2px solid blue'} }>
                <Sider style={siderStyle}>
                    <Search className="search" placeholder="input search text" onSearch={onSearch} enterButton />
                    <div style={{ height: '50px', backgroundColor: '#E1E1E1', textAlign: 'center', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▼ 컨테이너 조회</div>
                </Sider>
                <Content style={contentStyle}>
                    <div style={
                        { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80px', textAlign: 'center', border: '1px solid black' }
                    }>▼ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;선택하신 컨테이너 및 팔레트 실시간 현황</div>
                    <div style={{ display: 'flex', height: '500px', border: '5px solid black' }}>
                        <p style={ { display: 'flex', width: '70%', height: '97%', border: "1px solid #CCC" } }> {App()} </p>
                    </div>
                </Content>
            </div>
            <div>
                <div style={{ height: '60px', border: '1px solid black', display: 'flex', flexDirection: 'row', backgroundColor: '#E1E1E1' }}>
                    <div style={{ width: '10%', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        ▼ 컨테이너 조회</div>
                    <div style={{ width: '10%', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▼ 팔레트 조회</div>
                    <div style={{ width: '80%', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▼ 팔레트 실제 정보</div>
                </div>
                <div style={{ height: '80%', border: '1px solid #CCC', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '10%', border: '1px solid #CCC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
                    <div style={{ width: '10%', border: '1px solid #CCC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
                    <div style={{ width: '80%', border: '1px solid #CCC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p>{  }</p>
                    </div>
                </div>
            </div>

        </form>
    )
}

export default LoadResultManage;