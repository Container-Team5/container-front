import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import axios from "axios";
import {Table} from "antd";

const ContainerTab = forwardRef((props, ref) => {
    const [containers, setContainers] = useState([]);

    const getContainerData = async ()=>{
        let result = (await axios.get("http://localhost:8080/container",
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`,},
            })).data
        setContainers(result)
    }

    useEffect(()=>{
        getContainerData()
    },[])


    useImperativeHandle(ref, () => ({
        async search(searchParam){
            let result = (await axios.get(`http://localhost:8080/container`, {
                params: searchParam,
                headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`,},
            })).data
            setContainers(result)
        }
    }));

    const columns = [
        {title: '컨테이너ID', dataIndex: 'containerId', key: 'containerId',},
        {title: '가로(m)', dataIndex: 'width', key: 'width',},
        {title: '세로(m)', dataIndex: 'length', key: 'length',},
        {title: '높이(m)', dataIndex: 'height', key: 'height',},
        {title: '부피(m^3)', dataIndex: 'volume', key: 'volume',},
        {title: '무게(kg)', dataIndex: 'weight', key: 'weight',},
        {title: '무게제한(kg)', dataIndex: 'weightLimit', key: 'weightLimit',},
        {title: '출고마감시간', dataIndex: 'releaseDate', key: 'releaseDate',},
    ];

    return (
        <div>
            <Table dataSource={containers} columns={columns} pagination={false}/>
        </div>
    )
})

export default ContainerTab