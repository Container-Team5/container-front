import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import axios from "axios";
import {Table} from "antd";

const PaletteTab = forwardRef((props, ref) => {

    const [pallete, setPallete] = useState([]);

    useEffect(()=>{
        getPalleteData()
    },[])

    useImperativeHandle(ref, () => ({
        async search(searchParam){
            let result = (await axios.get(`http://localhost:8080/palette`,{
                params: searchParam,
                headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`,},
            })).data
            setPallete(result)
        }
    }));
    const columns = [
        {title: '팔레트ID', dataIndex: 'paletteId', key: 'palleteId',},
        {title: '상품명', dataIndex: 'paletteName', key: 'paletteName',},
        {title: '수량(개)', dataIndex: 'quantity', key: 'quantity',},
        {title: '가로(m)', dataIndex: 'width', key: 'width',},
        {title: '세로(m)', dataIndex: 'length', key: 'length',},
        {title: '높이(m)', dataIndex: 'height', key: 'height',},
        {title: '부피(m^3)', dataIndex: 'volume', key: 'volume',},
        {title: '무게(kg)', dataIndex: 'weight', key: 'weight',},
        {title: '출고마감시간', dataIndex: 'deadLine', key: 'deadLine',},
    ];

    const getPalleteData = async ()=>{
        let result = (await axios.get("http://localhost:8080/palette",
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`,},
            }
        )).data
        setPallete(result)
    }

    return (
        <div>
            <Table dataSource={pallete} columns={columns} pagination={false}/>
        </div>
    )
})

export default PaletteTab