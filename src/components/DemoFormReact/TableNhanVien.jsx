import React from 'react'
import { Space, Table, Tag } from 'antd';
import ButtonCustom from './ButtonCustom';


const TableNhanVien = ({ arrNhanVien, handleDeleteNhanVien, getinfoNhanVien }) => {
    const columns = [
        {
            //tieu de cac cot
            title: 'MSNV',
            //giup xac ding thuoc tinh se goi toi de lay data
            dataIndex: 'msnv',
            //dinh danh cot dang su dung
            key: 'msnv',
            //quyet dinh cau truc jsx hien thi, co 3 tham so text(giup xac dinh noi dung), record(giup xac dinh du lieu), index(giup xac dinh vi tri)
            //   render: (text, record, index) => <a>{text}</a>,
        },
        {
            title: 'Ho Ten',
            dataIndex: 'hoten',
            key: 'hoten',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            key: 'gioitinh',
            dataIndex: 'gioitinh',
            render: (text, record, index) => {
                return <Tag color={text == 'Nam' ? 'green' : 'geekblue'}>{text}</Tag>;
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => {
                return <>
                    <div className='space-x-2'>
                        <ButtonCustom content={'Delete'} bgColor={'bg-red-500'} onClick={() => handleDeleteNhanVien(record.msnv)}/>
                        <ButtonCustom content={'Edit'} bgColor={'bg-blue-500'} onClick={() => getinfoNhanVien(record)}/>
                    </div>
                </>
            }
        },
    ];
    return (
        <div className='mt-10'>
            <Table columns={columns} dataSource={arrNhanVien} rowKey="msnv" />
        </div>
    )
}

export default TableNhanVien