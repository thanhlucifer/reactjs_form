import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import InputCustom from './InputCustom'
import { DatePicker } from 'antd';
import ButtonCustom from './ButtonCustom';
import TableNhanVien from './TableNhanVien';
import * as Yup from 'yup';
import { NotificationContext } from "../../App";

const DemoFormReact = () => {
    // const [value, setValue] = useState({
    //     hoten: "",
    //     email: ""
    // })
    // const handleChange = (e) => {
    //     const id = e.target.id
    //     setValue({...value, [id]: e.target.value})
    // }
    //mssv, hoten, email, matkhau, namsinh, gioitinh, so dien thoai, 
    //form nhap du lieu nguoi dung thuan, ,table cua antd 
    const [arrNhanVien, setArrNhanVien] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const { handleSubmit, handleChange, values, setFieldValue, errors, handleBlur, touched, setValues, resetForm } = useFormik({
        initialValues: {
            hoten: "",
            msnv: "",
            email: "",
            matkhau: "",
            ngaysinh: "",
            gioitinh: "",
            sodienthoai: "",
        },
        //su kien onsubmit duoc thuc thi khi form bat dau chay su kien submit, param values la tham so dai dien cho field trong form
        onSubmit: (values, { resetForm }) => {
            // Check if MSNV already exists
            const isExistingMSNV = arrNhanVien.some(nv => nv.msnv === values.msnv);
            if (isExistingMSNV) {
                valueContext.handleNotification("error", "MSNV đã tồn tại");
                return;
            }
            setArrNhanVien([...arrNhanVien, values])
            valueContext.handleNotification("success", "Them nhan vien thanh cong");
            resetForm();
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Vui long nhap email").email("Email khong hop le"),
            msnv: Yup.string().required("Vui long nhap msnv").min(4, "Vui long nhap toi thieu 4 ky tu").max(8, "Vui long nhap toi da 8 ky tu").matches(/^[0-9]+$/, "Vui long nhap so"),
            sodienthoai: Yup.string().required("Vui long nhap sdt").matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Vui long nhap sdt hop le"),
            matkhau: Yup.string().required("Vui long nhap mat khau").matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/, "Mat khau khong hop le"),
            hoten: Yup.string().required("Vui long nhap ho ten").matches(/^[a-zA-Z\s]+$/, "Ho ten phai chua cac ky tu thuong"),
            gioitinh: Yup.string().required("Vui long chon gioi tinh"),
            ngaysinh: Yup.string().required("Vui long chon ngay sinh"),
        })

    })
    const valueContext = useContext(NotificationContext)
    const deleteNhanVien = (msnv) => {
        const newArrNhanVien = [...arrNhanVien]
        const index = newArrNhanVien.findIndex(nhanvien => nhanvien.msnv === msnv)
        if (index !== -1) {
            newArrNhanVien.splice(index, 1)
            setArrNhanVien(newArrNhanVien)
            valueContext.handleNotification("success", "Xoa nhan vien thanh cong")
        } else {
            valueContext.handleNotification("error", "Xoa nhan vien that bai")

        }

    }

    const getinfoNhanVien = (record) => {
        // Sử dụng phương thức setValues của Formik để cập nhật form với dữ liệu của nhân viên
        setValues({
            msnv: record.msnv,
            hoten: record.hoten,
            email: record.email,
            matkhau: record.matkhau,
            ngaysinh: record.ngaysinh,
            gioitinh: record.gioitinh,
            sodienthoai: record.sodienthoai,
        });
    };

    const updateNhanVien = () => {
        if (!Object.keys(errors).length && Object.keys(touched).length) {
            const index = arrNhanVien.findIndex(nv => nv.msnv === values.msnv);
            if (index !== -1) {
                const newArrNhanVien = [...arrNhanVien];
                newArrNhanVien[index] = values;
                setArrNhanVien(newArrNhanVien);
                resetForm();
                valueContext.handleNotification("success", "Cap nhat nhan vien thanh cong");
            } else {
                valueContext.handleNotification("error", "Cap nhat nhan vien that bai");
            }
        } else {
            valueContext.handleNotification("error", "Vui long dien day du thong tin hop le");
        }
    };


    //tim kiem nhan vien loc theo ten
    const searchNhanVien = (value) => {
        setSearchTerm(value.toLowerCase());
    };

    
    const filteredNhanVien = arrNhanVien.filter(nv =>
        nv.hoten.toLowerCase().includes(searchTerm)
    );



    return (
        <>
            <div className='container pt-10 m-auto'>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-5'>
                        <InputCustom
                            lablecontent={"MSNV"}
                            id={"msnv"}
                            placeholder={"Vui long nhap MSNV"}
                            name={'msnv'}
                            onChange={handleChange}
                            value={values.msnv}
                            onBlur={handleBlur}
                            error={errors.msnv} touched={touched.msnv} />
                        <InputCustom
                            lablecontent={"Ho ten"}
                            id={"hoten"}
                            placeholder={"Vui long nhap ho ten"}
                            name={'hoten'}
                            onChange={handleChange}
                            value={values.hoten}
                            onBlur={handleBlur} error={errors.hoten} touched={touched.hoten} />
                        <InputCustom
                            lablecontent={"Email"}
                            id={"email"}
                            placeholder={"Vui long nhap Email"}
                            name={'email'}
                            onChange={handleChange}
                            value={values.email} onBlur={handleBlur}
                            error={errors.email} touched={touched.email} />

                        <InputCustom
                            lablecontent={"So dien thoai"}
                            id={"sodienthoai"}
                            placeholder={"Vui long nhap so dien thoai"}
                            name={'sodienthoai'}
                            onChange={handleChange}
                            value={values.sodienthoai}
                            onBlur={handleBlur}
                            error={errors.sodienthoai} touched={touched.sodienthoai} />
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Ngay sinh</label>
                            <DatePicker className='!w-full'
                                format="DD/MM/YYYY"
                                onChange={(date, dateString) => setFieldValue('ngaysinh', dateString)}
                            />
                            {errors.ngaysinh && touched.ngaysinh ? <p className='text-red-500'>{errors.ngaysinh}</p> : null}
                        </div>
                        <div>
                            <div>
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Gioi tinh</label>
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={values.gioitinh}
                                    onChange={handleChange}
                                    name={'gioitinh'}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Vui long chon gioi tinh</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nu">Nu</option>
                                </select>
                                {errors.gioitinh && touched.gioitinh ? <p className='text-red-500'>{errors.gioitinh}</p> : null}
                            </div>
                        </div>
                        <InputCustom
                            lablecontent={"Mat khau"}
                            id={"matkhau"}
                            placeholder={"Vui long nhap mat khau"}
                            name={'matkhau'}
                            onChange={handleChange}
                            value={values.matkhau}
                            onBlur={handleBlur}
                            error={errors.matkhau} touched={touched.matkhau} />
                        <div className='grid grid-cols-3 gap-5'>
                            <ButtonCustom content={"Them nhan vien "} bgColor={"bg-blue-500"} type={"submit"} />
                            <ButtonCustom content={"Reset Form "} bgColor={"bg-black"} onClick={resetForm} />
                            <ButtonCustom content={"Update "} bgColor={"bg-yellow-500"} onClick={updateNhanVien} />
                        </div>
                    </div>
                    {/* <InputCustom lablecontent={"Họ Tên"} id={"hoten"} placeholder={"vui long nhap họ tên"} required name={'hoten'} onChange={handleChange} value={values.hoten} /> */}

                </form>
                <div className='pt-5'>
                    <InputCustom
                        lablecontent={"Tìm kiếm theo tên "}
                        id={"search"}
                        placeholder={"Nhập tên nhân viên"}
                        value={searchTerm}
                        onChange={(e) => searchNhanVien(e.target.value)}
                    />
                </div>
            </div>
            <TableNhanVien arrNhanVien={filteredNhanVien} handleDeleteNhanVien={deleteNhanVien} getinfoNhanVien={getinfoNhanVien} />
        </>

    )
}

export default DemoFormReact