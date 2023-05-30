import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import styles from "../../page/manager/DataManage.css";
import React from "react";
import './LoadResultManage.css';

const SetPallet = (/*{ ButtonA, ButtonB }*/) => {
    const palletTypeA={ id:'typeA', width: 1.1, height: 0.95, depth:1.1};


    return (
        <div>
            <div style={{ height: '420px', border: '1px solid #CCC', display: 'flex', flexWrap: 'wrap' }}>
                <table border='1px solid black' style={ { width: '540px', height:'240px', position:'relative', top:'30px', left:'30px', border:'1px solid black'} }>
                    <tr className='tl'>
                        <th>Pallet Type</th>
                        <th>가로 길이</th>
                        <th>높이 길이</th>
                        <th>세로 길이</th>
                        <th>제한 적재량</th>
                    </tr>
                    <tr className='tl' align='middle'>
                        <td><button id='palletTypeA' type='submit' className='containerButton'>Pallet Type A</button></td>
                        <td>1.1</td>
                        <td>0.95</td>
                        <td>1.1</td>
                        <td>unknown</td>
                    </tr>
                    <tr className='tl' align='middle'>
                        <td><button id='palletTypeB' type='submit' className='containerButton'>Pallet Type B</button></td>
                        <td>1.2</td>
                        <td>0.95</td>
                        <td>1.2</td>
                        <td>unknown</td>
                    </tr>

                </table>
                <button id='setPalletWindowquit' className='containerButton' style={{ position:'relative', left:'45px' }}>Quit</button>

            </div>
        </div>
    );
};

export default SetPallet;