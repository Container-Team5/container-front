import {Anchor, Layout, Table, Tabs} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Search from "antd/es/input/Search";
import './DataManage.css';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import './LoadResultManage.css';
import SetPallet from "./SetPallet";
import {WebGLRenderList as cubeControls} from "three/src/renderers/webgl/WebGLRenderLists";
import { TransformControls } from "three/addons/controls/TransformControls";


function LoadResultManage() {
    const containerSize = { width: 6.1, height: 2.6, depth: 2.44 };
    const palletEx = { width: containerSize.width / 2, height: 0.2, depth: containerSize.depth };
    const palletTypeA = { id: 'typeA', width: 1.1, height: 0.9, depth: 1.1 };
    const palletTypeB = { id: 'typeB', width: 1.2, height: 0.15, depth: 1.2 };
    const mountRef = useRef(null);
    const [scene, setScene] = useState(null);
    const [renderer, setRenderer] = useState(null);
    const [camera, setCamera] = useState(null);
    const [controls, setControls] = useState(null);
    const [pallets, setPallets] = useState([]);


    useEffect(() => {
        const scene = new THREE.Scene();
        setScene(scene);
        scene.background = new THREE.Color(0xFFFFFF);

        const renderer = new THREE.WebGLRenderer();
        setRenderer(renderer);

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);



        camera.position.set(8, 8, 8);
        camera.lookAt(new THREE.Vector3(1, 0, 2));
        setCamera(camera);

        /*const controls = new OrbitControls(camera, renderer.domElement);
        setControls(controls);*/


        const mount = mountRef.current;
        mount.appendChild(renderer.domElement);
        renderer.setSize(mount.clientWidth, mount.clientHeight);

        const animate = function () {
            requestAnimationFrame(animate);
            /*controls.update();*/
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            const width = mount.clientWidth;
            const height = mount.clientHeight;

            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);



        const containerCube = createCube(containerSize.width, containerSize.height, containerSize.depth);
        scene.add(containerCube);
        containerCube.position.set(0, 0, 0);


        return () => {
            window.removeEventListener('resize', handleResize);
            mount.removeChild(renderer.domElement);
        };

    }, []);

    const moveButton = document.getElementById('moveButton');
    const deleteButton=document.getElementById('deleteButton');


    function addPalletA() {
        const geometry = new THREE.BoxGeometry(palletTypeA.width, palletTypeA.height, palletTypeA.depth);
        const material = new THREE.MeshBasicMaterial({ color: 'skyblue' });
        const cube = new THREE.Mesh(geometry, material);

        const offsetX = palletTypeA.width / 2;
        const offsetY = palletTypeA.height / 2;
        const offsetZ = palletTypeA.depth / 2;

        const minX = offsetX;
        const maxX = containerSize.width - offsetX;
        const minZ = offsetZ;
        const maxZ = containerSize.depth - offsetZ;


        const randomX = Math.random() * (maxX - minX) + minX;
        const randomZ = Math.random() * (maxZ - minZ) + minZ;

        cube.position.set(randomX, offsetY, randomZ);
        scene.add(cube);


        const controls = new TransformControls(camera, renderer.domElement);
        cube.controls=controls;
        controls.attach(cube);
        scene.add(controls);


        controls.setMode('translate');
        controls.setSpace('local');
        controls.showY = !controls.showY;


        moveButton.addEventListener('click', () => {
            if (controls.enabled) {
                controls.detach();
                controls.enabled = false;
            } else {
                controls.attach(cube);
                controls.enabled = true;
            }
        });

        setPallets(pallets => [...pallets, cube]);
        controls.visible = false;


    }

    function addPalletB() {
        const geometry = new THREE.BoxGeometry(palletTypeB.width, palletTypeB.height, palletTypeB.depth);
        const material = new THREE.MeshBasicMaterial({ color: 'yellow' });
        const cube = new THREE.Mesh(geometry, material);

        const offsetX = palletTypeB.width / 2;
        const offsetY = palletTypeB.height / 2;
        const offsetZ = palletTypeB.depth / 2;

        const minX = offsetX;
        const maxX = containerSize.width - offsetX;
        const minZ = offsetZ;
        const maxZ = containerSize.depth - offsetZ;

        const randomX = Math.random() * (maxX - minX) + minX;
        const randomZ = Math.random() * (maxZ - minZ) + minZ;

        cube.position.set(randomX, offsetY, randomZ);
        scene.add(cube);


        const controls = new TransformControls(camera, renderer.domElement);
        cube.controls=controls;
        controls.attach(cube);
        scene.add(controls);
        controls.showY = !controls.showY;


        controls.setMode('translate');
        controls.setSpace('local');


        moveButton.addEventListener('click', () => {
            if (controls.enabled) {
                controls.detach();
                controls.enabled = false;
            } else {
                controls.attach(cube);
                controls.enabled = true;
            }
        });

        setPallets(pallets => [...pallets, cube]);
        controls.visible = false;

    }

    function onClick2() {
        if (pallets.length > 0) {
            const lastCube = pallets[pallets.length - 1];
            const controls = lastCube.controls;

            if (controls) {
                controls.visible=false;
                controls.detach();
                controls.dispose();
                scene.remove(controls);
            }
            scene.remove(lastCube);
            setPallets(pallets => pallets.filter(cube => cube !== lastCube));
        }
    }
    const onClick1 = () => {
        /*const newWindow = window.open("/MovePallet", "a", "width=700, height=400, left=100, top=50");

        newWindow.onload = () => {
            const buttons = newWindow.document.querySelectorAll("button");


        };*/
    };


    const onClick4 = () => {
        const newWindow = window.open("/SetPallet", "_blank", "width=700, height=400, left=100, top=50");

        newWindow.onload = () => {
            const buttons = newWindow.document.querySelectorAll("button");

            const handleClick = (event) => {
                const buttonId = event.target.id;

                if (buttonId === 'palletTypeA') {
                    addPalletA();
                }
                else if (buttonId === 'palletTypeB') {
                    addPalletB();
                }
                else if (buttonId==='setPalletWindowquit') {
                    newWindow.close();
                }
            };

            buttons.forEach((button) => {
                button.addEventListener("click", handleClick);
            });

            newWindow.onbeforeunload = () => {
                buttons.forEach((button) => {
                    button.removeEventListener("click", handleClick);
                });
            };
        };
    };

    /*const onClick4 = () => {
        const newWindow = window.open("/SetPallet", "a", "width=700, height=400, left=100, top=50");

        newWindow.onload = () => {
            const buttons = newWindow.document.querySelectorAll("button");

            buttons.forEach((button) => {
                button.addEventListener("click", (event) => {
                    const buttonId = event.target.id;

                    if (buttonId === 'palletTypeA') {
                        addPalletA();

                    } else if (buttonId === 'palletTypeB') {
                        addPalletB();

                    }
                });
            });
        };
    };*/

    /*<SetPallet className='containerButton' ButtonA={onClick1} ButtonB={onClick2} style={{ position: 'relative', top:'20px', left:'60px' }}>추가</SetPallet>*/


    return (

        <div style={ { display: 'flex', width: '1900px', height: '600px', border: '2px solid blue'} }>

            <Content style={contentStyle}>
                <div style={
                    { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80px', textAlign: 'center', border: '1px solid black' }
                }>▼ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;선택하신 컨테이너 및 팔레트 실시간 현황</div>
                <div style={{ display: 'flex', height: '500px', border: '1px solid black' }}>
                    <div ref={mountRef} style={ { display: 'flex', width: '70%', height: '97%', border: "1px solid #CCC" } }></div>
                    <span style={ { width: '30%', height: '100%', textAlign: 'left', border: '1px solid #CCC' } }>
                            <div style={{ height: '100%', border: '1px solid #CCC', display: 'flex', flexWrap: 'wrap' }}>
                                <button className='containerButton' id='moveButton' onClick={onClick1} style={{ position: 'relative', top:'60px', left:'150px' }}>이동</button>
                                <button className='containerButton' id='deleteButton' onClick={onClick2} style={{ position: 'relative', top:'210px', left:'-120px' }}>삭제</button>
                                <button className='containerButton' onClick={onClick4} style={{ position: 'relative', top:'120px', left:'150px' }}>추가</button>
                            </div>
                       </span>
                </div>
                <div style={{ position: 'absolute', width: '1900px', left: '0px', top: '740px', border: '1px solid red'}}>
                    <div style={{ width: '100%', border: '1px solid green'}}>
                        <div style={{ height: '60px', border: '1px solid black', display: 'flex', flexDirection: 'row', backgroundColor: '#E1E1E1' }}>
                            <div style={{ left: '100px', width: '15%', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                ▼ 컨테이너 조회</div>
                            <div style={{ width: '15%', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▼ 팔레트 조회</div>
                            <div style={{ width: '70%', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▼ 팔레트 실제 정보</div>
                        </div>
                        <div style={{ height: '80%', border: '1px solid #CCC', display: 'flex', flexDirection: 'row' }}>
                            <div style={{ width: '15%', border: '1px solid #CCC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
                            <div style={{ width: '15%', border: '1px solid #CCC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
                            <div style={{ width: '70%', border: '1px solid #CCC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <p>{  }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>

        </div>


    );
}
function createCube(width, height, depth) {
    const vertices = [
        [0, height, depth],
        [width, height, depth],
        [width, height, 0],
        [0, height, 0],
        [0, 0, depth],
        [width, 0, depth],
        [width, 0, 0],
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

/*const LoadResultManage = (props) => {

    /*return (
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
                        <div style={ { display: 'flex', width: '70%', height: '97%', border: "1px solid #CCC" } }> {App()} </div>
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
}*/

export default LoadResultManage;