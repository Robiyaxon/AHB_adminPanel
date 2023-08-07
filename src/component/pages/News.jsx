import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";
import { BreadcrumbHelpers, FieldHelpers } from "../../utility/Helpers";
import { Content } from "antd/lib/layout/layout";
import AddBoxIcon from "@mui/icons-material/AddBox";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../redux/actions/readAction";
import { updateAction } from "../../redux/actions/updateAction";
import { deleteAction } from "../../redux/actions/deleteAction";
import {
  CREATE_NEWS,
  DELETE_NEWS,
  GET_NEWS,
  UPDATE_NEWS,
} from "../../redux/actions/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const News = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.newsReducer);
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedEditID, setselectedEditID] = useState(null);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [uz_title, setUz_title] = useState("");
  const [uz_text, setUz_text] = useState("");
  const [uz_text_2, setUz_text_2] = useState("");
  const [uz_text_3, setUz_text_3] = useState("");
  const [img, setImg] = useState(null);
  const [img_2, setImg_2] = useState(null);
  const [img_3, setImg_3] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAction("api/news", GET_NEWS));
  }, []);

  if (!data) {
    return <h1>Waiting...</h1>;
  }
  const onChange = async (e) => {
    setUz_title(e.target.form[3].value);
    setUz_text(e.target.form[4].value);
    setUz_text_2(e.target.form[5].value);
    setUz_text_3(e.target.form[6].value);

    setImg(e.target.files[0]);
  };
  const onChange_2 = async (e) => {
    setUz_title(e.target.form[3].value);
    setUz_text(e.target.form[4].value);
    setUz_text_2(e.target.form[5].value);
    setUz_text_3(e.target.form[6].value);

    setImg_2(e.target.files[0]);
  };
  const onChange_3 = async (e) => {
    setUz_title(e.target.form[3].value);
    setUz_text(e.target.form[4].value);
    setUz_text_2(e.target.form[5].value);
    setUz_text_3(e.target.form[6].value);

    setImg_3(e.target.files[0]);
  };
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
    setUz_title(id.uz_title);
    setUz_text(id.uz_text);
    setUz_text_2(id.uz_text_2);
    setUz_text_3(id.uz_text_3);
    setImg(id.img);
    setImg_2(id.img_2);
    setImg_3(id.img_3);
    console.log(img)
  };
  const createHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setCreateVisible(false);

        const formData = new FormData();
        formData.append("img", img, img.name);
        formData.append("img_2", img_2, img_2.name);
        formData.append("img_3", img_3, img_3.name);

        formData.append("uz_title", values.uz_title);
        formData.append("uz_text", values.uz_text);
        formData.append("uz_text_2", values.uz_text_2);
        formData.append("uz_text_3", values.uz_text_3);
        axios
          .post("https://oliytalim.pythonanywhere.com/api/news/", formData, {
            headers: {
              Authorization: `Token 2fa0d2a67200eb75c181d7cef3e5ca5e9ae73f1b`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            axios
              .get(
                process.env.REACT_APP_API_URL ||
                  "https://oliytalim.pythonanywhere.com/api/news/",
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token 2fa0d2a67200eb75c181d7cef3e5ca5e9ae73f1b`,
                  },
                }
              )
              .then(function (res) {
                dispatch({
                  type: CREATE_NEWS,
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

        const formData = new FormData();
        if (!img.name) {
          console.log(img);
        } else formData.append("img", img, img.name);
        if (!img_2.name) {
          console.log(img_2);
        } else formData.append("img_2", img_2, img_2.name);
        if (!img_3.name) {
          console.log(img_3);
        } else formData.append("img_3", img_3, img_3?.name);

        formData.append("uz_title", values.uz_title);
        formData.append("uz_text", values.uz_text);
        formData.append("uz_text_2", values.uz_text_2);
        formData.append("uz_text_3", values.uz_text_3);
        dispatch(
          updateAction("api/news", UPDATE_NEWS, selectedEditID.id, formData)
        ).catch((err) => {
          console.log(err);
        });
      })

      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(deleteAction("api/news/", DELETE_NEWS, selectedID));
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      dispatch(getAction("api/news/", GET_NEWS));
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
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Sarlavha", dataIndex: "uz_title", key: "uz_title" },
    { title: "Ma'lumot 1", dataIndex: "uz_text", key: "uz_text" },
    { title: "Ma'lumot 2", dataIndex: "uz_text_2", key: "uz_text_2" },
    { title: "Ma'lumot 3", dataIndex: "uz_text_3", key: "uz_text_3" },
    {
      title: "img",
      dataIndex: "img",
      key: "img",
      render: (text) => (
        <img
          style={{
            width: "100%",
          }}
          src={"https://oliytalim.pythonanywhere.com/" + text}
        />
      ),
    },
    {
      title: "img 2",
      dataIndex: "img_2",
      key: "img_2",
      render: (text) => (
        <img
          style={{
            width: "100%",
          }}
          src={"https://oliytalim.pythonanywhere.com/" + text}
        />
      ),
    },
    {
      title: "img 3",
      dataIndex: "img_3",
      key: "img_3",
      render: (text) => (
        <img
          style={{
            width: "100%",
          }}
          src={"https://oliytalim.pythonanywhere.com/" + text}
        />
      ),
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
              fields={[
                {
                  name: ["uz_title"],
                  value: uz_title,
                },
                {
                  name: ["uz_text"],
                  value: uz_text,
                },
                {
                  name: ["uz_text_2"],
                  value: uz_text_2,
                },
                {
                  name: ["uz_text_3"],
                  value: uz_text_3,
                },
                {
                  name: ["img"],
                  value: "",
                },
                {
                  name: ["img_2"],
                  value: "",
                },
                {
                  name: ["img_3"],
                  value: "",
                },
              ]}
            >
              <input type="file" name="img" onChange={onChange} />

              <input type="file" name="img_2" onChange={onChange_2} />
              <input type="file" name="img_3" onChange={onChange_3} />

              <FieldHelpers
                label="Nomi"
                name="uz_title"
                message="Iltimos Nomi qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Ma'lumot"
                name="uz_text"
                message="Iltimos Ma'lumot qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Ma'lumot 2"
                name="uz_text_2"
                message="Iltimos Ma'lumot 2 qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Ma'lumot 3"
                name="uz_text_3"
                message="Iltimos Ma'lumot 3 qatorini yo'ldiring!"
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
                  name: ["uz_title"],
                  value: uz_title,
                },
                {
                  name: ["uz_text"],
                  value: uz_text,
                },
                {
                  name: ["uz_text_2"],
                  value: uz_text_2,
                },
                {
                  name: ["uz_text_3"],
                  value: uz_text_3,
                },
                {
                  name: ["img"],
                  value: img,
                },
                {
                  name: ["img_2"],
                  value: img_2,
                },
                {
                  name: ["img_3"],
                  value: img_3,
                },
              ]}
            >
              <input type="file" name="img" onChange={onChange} />
              <input type="file" name="img_2" onChange={onChange_2} />
              <input type="file" name="img_3" onChange={onChange_3} />

              <FieldHelpers
                label="Nomi"
                name="uz_title"
                message="Iltimos Nomi qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Ma'lumot"
                name="uz_text"
                message="Iltimos Ma'lumot qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Ma'lumot 2"
                name="uz_text_2"
                message="Iltimos Ma'lumot 2 qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Ma'lumot 3"
                name="uz_text_3"
                message="Iltimos Ma'lumot 3 qatorini yo'ldiring!"
              />
            </Form>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <BreadcrumbHelpers to={"home"} from={"news"} />

        <Table columns={columns} dataSource={data.local} />
      </Content>
    </>
  );
};
