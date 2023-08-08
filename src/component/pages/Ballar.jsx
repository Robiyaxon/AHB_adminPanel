import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "antd";
import { BreadcrumbHelpers, FieldHelpers } from "../../utility/Helpers";
import { Content } from "antd/lib/layout/layout";
import AddBoxIcon from "@mui/icons-material/AddBox";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../redux/actions/readAction";
import { updateAction } from "../../redux/actions/updateAction";
import { deleteAction } from "../../redux/actions/deleteAction";
import {
  CREATE_BALLAR,
  DELETE_BALLAR,
  GET_BALLAR,
  UPDATE_BALLAR,
} from "../../redux/actions/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const Ballash = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.BallarReduser);
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedEditID, setselectedEditID] = useState(null);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [umumiy, setUmumiy] = useState('')
  const [nomi, setNomi] = useState('')
  const [oquv_ishlari, setOquv_ishlari] = useState('')
  const [yoshlar, setYoshlar] = useState('')
  const [ishlab_chiqarish, setIshlab] = useState('')
  const [moliyaviy, setMoliyaviy] = useState('')
  const [xojalik, setHojalik] = useState('')
  const [talim_sifati, setTalim] = useState('')
  const [ijro_intizomi, setIjro] = useState('')
  const [jazo, setJazo] = useState('')

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAction("api/ballash", GET_BALLAR));
  }, []);

  function sort_by_id() {
    return function (elem1, elem2) {
      const math1 = elem1.umumiy / 100
      const math2 = elem2.umumiy / 100
      const math1_2 = parseInt(elem1.kelganligi * math1)
      const math2_2 = parseInt(elem2.kelganligi * math2)
      if (math1_2 < math2_2) {
        return -1;
      } else if (math1_2 > math2_2) {
        return 1;
      } else {
        return 0;
      }
    };
  }
  data.sort(sort_by_id())

  const showModal = (id) => {
    setVisible(true);
    setSelectedID(id);
  };
  const showCreateModal = () => {
    setCreateVisible(true);
  };
  const showEditModal = (id) => {
    setEditVisible(true);
    setselectedEditID(id);
    setUmumiy(id.umumiy);
    setNomi(id.nomi);
    setOquv_ishlari(id.oquv_ishlari);
    setYoshlar(id.yoshlar);
    setIshlab(id.ishlab_chiqarish);
    setMoliyaviy(id.moliyaviy);
    setHojalik(id.xojalik);
    setTalim(id.talim_sifati);
    setIjro(id.ijro_intizomi);
    setJazo(id.jazo);
  };
  const createHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setCreateVisible(false);
        axios
          .post(
              "https://otfiv-andijon-admin.uz/" + "api/ballash/",
            values,
            {
              headers: {
                Authorization: `Token 2fa0d2a67200eb75c181d7cef3e5ca5e9ae73f1b`,
              },
            }
          )
          .then((res) => {
            axios
              .get(
                process.env.REACT_APP_API_URL ||
                "https://otfiv-andijon-admin.uz/" + "api/ballash/",
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token 2fa0d2a67200eb75c181d7cef3e5ca5e9ae73f1b`,
                  },
                }
              )
              .then(function (res) {
                dispatch({
                  type: CREATE_BALLAR,
                  payload: res.data,
                });
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch((err) => {
            console.log(err);
          });
        // dispatch(createAction("api/ishlar/", CREATE_JOBS, values));
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const editHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setEditVisible(false);
        dispatch(
          updateAction("api/ballash", UPDATE_BALLAR, selectedEditID.id, values)
        );
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(deleteAction("api/ballash", DELETE_BALLAR, selectedID));
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      dispatch(getAction("api/ballash", GET_BALLAR));
    }, 1000);
  };

  const createHandleCancel = () => {
    setCreateVisible(false);
  };
  const editHandleCancel = () => {
    setEditVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Muassasa nomi", dataIndex: "nomi", key: "nomi" },
    { title: "O`quv ishlari", dataIndex: "oquv_ishlari", key: "oquv_ishlari" },
    { title: "Yoshlar masalalari", dataIndex: "yoshlar", key: "yoshlar" },
    { title: "Ishlab chiqarish ta`limi", dataIndex: "ishlab_chiqarish", key: "ishlab_chiqarish" },
    { title: "Moliyaviy ishalari", dataIndex: "moliyaviy", key: "moliyaviy" },
    { title: "Xojalik ishlari", dataIndex: "xojalik", key: "xojalik" },
    { title: "Ta`lim sifatini nazorat qilish", dataIndex: "talim_sifati", key: "talim_sifati" },
    { title: "Ijro intizomi", dataIndex: "ijro_intizomi", key: "ijro_intizomi" },
    { title: "Aniqlangan qoida buzarliklar", dataIndex: "jazo", key: "jazo" },
    {
      title: "1 oyda  to`plangan   umumiy ball",
      key: "umumiy",
      dataIndex: "",
      render: (text) => {
        const math = text.umumiy / 100;
console.log(parseInt(text.umumiy * math))
        return <p>{parseInt(text.umumiy * math)} ball</p>;
      },
    },
    {
      title: "Baholash turi",
      key: "Color",
      dataIndex: "",
      render: (text) => {
        return <p>red</p>;
      },
    },
    {
      title: (
        <>
          <Button type="primary" onClick={showCreateModal}>
            <AddBoxIcon />
          </Button>
          <Modal
            title={"Yaratish"}
            visible={createVisible}
            onOk={createHandleOk}
            onCancel={createHandleCancel}
            okText={"yaratish"}
            cancelText={"bekor qilish"}
            htmlType="submit"
          >
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                modifier: "public",
              }}
            >
              <FieldHelpers
                label="Muassasa nomi"
                name="nomi"
                message="Iltimos Nomi qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="O`quv ishlari bo`yicha"
                name="oquv_ishlari"
                message="Iltimos Manzil qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Yoshlar masalalari bo`yicha"
                name="yoshlar"
                message="Iltimos Talablar qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Ishlab chiqarish ta`limi"
                name="ishlab_chiqarish"
                message="Iltimos Maosh qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Moliyaviy ishalari bo`yicha"
                name="moliyaviy"
                message="Iltimos Contact haqida qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Xo`jalik ishlari bo`yicha"
                name="xojalik"
                message="Iltimos Contact haqida qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Ta`lim sifatini nazorat qilish bo`yicha"
                name="talim_sifati"
                message="Iltimos Contact haqida qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Ijro intizomi bo`yicha"
                name="ijro_intizomi"
                message="Iltimos Contact haqida qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Aniqlangan qoida buzarliklar "
                name="jazo"
                message="Iltimos Contact haqida qatorini yo'ldiring!"
              />
            </Form>
          </Modal>
        </>
      ),
      dataIndex: "",
      key: "x",
      render: (text) => (
        <>
          <Button type="danger" onClick={(e) => showModal(text.id)}>
            <DeleteOutlined />
          </Button>
          <Button type="primary" onClick={(e) => showEditModal(text)}>
            <EditOutlined />
          </Button>
          <Modal
            title={"O'chirish"}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText={"o'chirish"}
            okType={"danger"}
            cancelText={"bekor qilish"}
          >
            <h2>Haqiqatan ham bu ma'lumotni o'chirib tashlamoqchimisiz?</h2>
            <p>
              Agar siz ushbu ma'lumotlarni o'chirib tashlasangiz, qayta
              tiklanmaydi
            </p>
          </Modal>
          <Modal
            title={"Tahrirlash"}
            visible={editVisible}
            onOk={editHandleOk}
            onCancel={editHandleCancel}
            okText={"tahrirlash"}
            cancelText={"bekor qilish"}
          >
            <Form
              form={form}
              layout="vertical"
              name="name"
              initialValues={{
                modifier: "public",
              }}
              fields={[
                {
                  name: ["nomi"],
                  value: nomi,
                },
                {
                  name: ["oquv_ishlari"],
                  value: oquv_ishlari,
                },
                {
                  name: ["yoshlar"],
                  value: yoshlar,
                },
                {
                  name: ["ishlab_chiqarish"],
                  value: ishlab_chiqarish,
                },
                {
                  name: ["moliyaviy"],
                  value: moliyaviy,
                },
                {
                  name: ["xojalik"],
                  value: xojalik,
                },
                {
                  name: ["talim_sifati"],
                  value: talim_sifati,
                },
                {
                  name: ["ijro_intizomi"],
                  value: ijro_intizomi,
                },
                {
                  name: ["jazo"],
                  value: jazo,
                }
              ]}
            >
               <FieldHelpers
                label="Muassasa nomi"
                name="nomi"
                message="Iltimos Nomi qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="O`quv ishlari bo`yicha"
                name="oquv_ishlari"
                message="Iltimos Manzil qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Yoshlar masalalari bo`yicha"
                name="yoshlar"
                message="Iltimos Talablar qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Ishlab chiqarish ta`limi"
                name="ishlab_chiqarish"
                message="Iltimos Maosh qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Moliyaviy ishalari bo`yicha"
                name="moliyaviy"
                message="Iltimos Contact haqida qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Xo`jalik ishlari bo`yicha"
                name="xojalik"
                message="Iltimos Contact haqida qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Ta`lim sifatini nazorat qilish bo`yicha"
                name="talim_sifati"
                message="Iltimos Contact haqida qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Ijro intizomi bo`yicha"
                name="ijro_intizomi"
                message="Iltimos Contact haqida qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Aniqlangan qoida buzarliklar "
                name="jazo"
                message="Iltimos Contact haqida qatorini yo'ldiring!"/>
            </Form>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <BreadcrumbHelpers to={"home"} from={"ishlar"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
