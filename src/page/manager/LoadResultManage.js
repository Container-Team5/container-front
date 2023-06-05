import {Anchor, Badge, Dropdown, Layout, Space, Table, Tabs} from "antd";
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
import {DownOutlined} from "@ant-design/icons";


const LoadResultManage = () => {
    const containerSize = { width: 2.4, height: 2.4, depth: 5.9 };
    const palletEx = { width: containerSize.width / 2, height: 0.2, depth: containerSize.depth };
    const palletTypeA = { id: 'typeA', width: 1.1, height: 0.8, depth: 1.1 };
    const palletTypeB = { id: 'typeB', width: 1.1, height: 1.0, depth: 1.1};
    const palletTypeC = { id: 'typeC', width: 1.1, height: 1.5, depth: 1.1};
    const mountRef = useRef(null);
    const [scene, setScene] = useState(null);
    const [renderer, setRenderer] = useState(null);
    const [camera, setCamera] = useState(null);
    const [controls, setControls] = useState(null);
    const [pallets, setPallets] = useState([]);
    const [tablePallets, setTablePallets] = useState(new Map());


    const getContainerData = async ()=>{
        let result = (await axios.get("http://localhost:8080/container",
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`,},
            })).data
        console.log(result)
        setContainers(result)
    }

    const [containers, setContainers] = useState([
        // {containerSearch: '1', paletteSearch: '1', paletteInfo: '아이시스 2L 6개묶음, 20, 2023-05-31 22:30, 2023-06-02 14:30', },
        // {containerSearch: '', paletteSearch: '2', paletteInfo: '대림선 야채 김자반볶음 1+1 기획, 500, 2023-05-31 22:30, 2023-06-03 15:30', },
        // {containerSearch: '', paletteSearch: '3', paletteInfo: '삼성갤럭시Z플립3, 100, 2023-05-31 22:30 2023-06-03 16:40',},
    ]);

    const columns = [
        {title: '▼  컨테이너 ID', dataIndex: 'containerId', key: 'containerId',},
        // {title: '▼  팔레트 조회', dataIndex: 'paletteSearch', key: 'paletteSearch',},
        // {title: '▼  팔레트 실제 정보 (상품명, 주문개수, 주문일자, 출고마감시간)', dataIndex: 'paletteInfo', key: 'paletteInfo',},

    ];

    useEffect(() => {
        getContainerData()
        const scene = new THREE.Scene();
        setScene(scene);
        scene.background = new THREE.Color(0xFFFFFF);

        const renderer = new THREE.WebGLRenderer();
        setRenderer(renderer);

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enabled = false;
        scene.add(orbitControls);
        const moveContainerButton = document.getElementById('moveContainerButton');
        moveContainerButton.addEventListener('click', () => {
            if (orbitControls) {
                orbitControls.enabled = !orbitControls.enabled;
            }
        });

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

    function addPalletC() {
        const geometry = new THREE.BoxGeometry(palletTypeC.width, palletTypeC.height, palletTypeC.depth);
        const material = new THREE.MeshBasicMaterial({ color: 'pink' });
        const cube = new THREE.Mesh(geometry, material);

        const offsetX = palletTypeC.width / 2;
        const offsetY = palletTypeC.height / 2;
        const offsetZ = palletTypeC.depth / 2;

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

    const onClick3=()=> {

    }

    function sleep(sec) {
        return new Promise(resolve => setTimeout(resolve, sec * 1000));
    }
    const onClick4 = () => {
        const newWindow = window.open("/SetPallet", "_blank", "width=700, height=400, left=100, top=50");
        console.log(newWindow)

        newWindow.addEventListener('load', async () => {
                const buttons = await newWindow.document.getElementsByClassName("containerButton");
                await sleep(1)

                const handleClick = (event) => {
                    const buttonId = event.target.id;

                    if (buttonId === 'palletTypeA') {
                        addPalletA();
                    }
                    else if (buttonId === 'palletTypeB') {
                        addPalletB();
                    }
                    else if (buttonId === 'palletTypeC') {
                        addPalletC();
                    }
                    else if (buttonId==='setPalletWindowquit') {
                        newWindow.close();
                    }
                };

                Array.from(buttons).forEach((button) => {
                    console.log("handleClickMapping")
                    button.addEventListener("click", handleClick);
                });

                newWindow.onbeforeunload = () => {
                    Array.from(buttons).forEach((button) => {
                        console.log("unmapping handleClick")
                        button.removeEventListener("click", handleClick);
                    });
                };
            }
        )
    };


    const expandedRowRender =  (record, index) => {
        const columns = [
            {
                title: '팔레트ID',
                dataIndex: 'paletteId',
                key: 'paletteId',
            },
            {
                title: '상품명',
                dataIndex: 'paletteName',
                key: 'paletteName',
            },
            {
                title: '주문개수',
                dataIndex: 'quantity',
                key: 'quantity',
            },
            {
                title: '출고마감시간',
                dataIndex: 'deadLine',
                key: 'deadLine',
            },
        ];

        return <Table columns={columns} dataSource={tablePallets.get(record.containerId)} pagination={false} />;
    };

    const onExpand = (expanded, record) =>{
        axios.get(`http://localhost:8080/palette?containerId=${record.containerId}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`,},
            })
            .then(res => {
                setTablePallets((prev) => new Map(prev).set(record.containerId, res.data));
                }
            )

    }

    return (

        <div style={ { display: 'flex', width: '100%', height: '600px', border: '2px solid blue'} }>

            <Content style={contentStyle}>
                <div style={
                    { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80px', textAlign: 'center', border: '1px solid black' }
                }>▼ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;컨테이너 내 팔레트 실시간 적재 현황</div>
                <div style={{ display: 'flex', height: '500px', border: '1px solid black' }}>
                    <div ref={mountRef} style={ { display: 'flex', width: '100%', height: '97%', border: "1px solid #CCC" } }></div>
                    <span style={ { width: '100%', height: '100%', textAlign: 'left', border: '1px solid #CCC' } }>
                            <div style={{ height: '100%', border: '1px solid #CCC', display: 'flex', flexWrap: 'wrap' }}>
                                <button className='containerButton' id='moveButton' onClick={onClick1} style={{ position: 'relative', top: '100px', left: '80px',}}>이동</button>
                                <button className='containerButton' id='deleteButton' onClick={onClick2} style={{ position: 'relative', top: '100px', left: '160px',}}>삭제</button>
                                 <button className='containerButton' id='moveContainerButton' onClick={onClick3} style={{ position: 'relative', top: '300px', left: '-220px',}}>컨테이너 이동</button>
                                <button className='containerButton' onClick={onClick4} style={{ position: 'relative', top: '52px', left : '310px',}}>추가</button>
                            </div>
                       </span>
                </div>
                <div style={{ position: 'absolute', width: '100%', left: '0px', top: '740px', border: '1px solid red'}}>
                    <Table
                        columns={columns}
                        expandable={{
                            expandedRowRender,
                            onExpand,
                            defaultExpandedRowKeys: ['0'],
                        }}
                        dataSource={containers}
                    />
                        {/*<div>*/}
                        {/*    <Table dataSource={loads} columns={columns} pagination={false}/>*/}
                        {/*</div>*/}

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

export default LoadResultManage;