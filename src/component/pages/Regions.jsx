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
  CREATE_REGIONS,
  DELETE_NEWS,
  DELETE_REGIONS,
  GET_NEWS,
  GET_REGIONS,
  UPDATE_NEWS,
  UPDATE_REGIONS,
} from "../../redux/actions/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const Regions = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.regionsReducer);
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedEditID, setselectedEditID] = useState(null);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [population, setPopulation] = useState("");
  const [area, setArea] = useState("");
  const [project_num, setProject_num] = useState("");
  const [job_num, setJob_num] = useState("");
  const [img, setImg] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAction("api/hududlar", GET_REGIONS));
  }, []);

  if (!data) {
    return <h1>Waiting...</h1>;
  }
  const onChange = async (e) => {
    setAddress(e.target.form[1].value);
    setPopulation(e.target.form[2].value);
    setArea(e.target.form[3].value);
    setProject_num(e.target.form[4].value);
    setJob_num(e.target.form[5].value);

    setImg(e.target.files[0]);
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
    setAddress(id.manzil);
    setPopulation(id.aholi);
    setArea(id.maydoni);
    setProject_num(id.loyhalar_soni);
    setJob_num(id.ish_joyi_soni);
    setImg(id.img);
  };
  const createHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setCreateVisible(false);

        const formData = new FormData();
        formData.append("img", img, img.name);

        formData.append("manzil", values.manzil);
        formData.append("aholi", values.aholi);
        formData.append("maydoni", values.maydoni);
        formData.append("loyhalar_soni", values.loyhalar_soni);
        formData.append("ish_joyi_soni", values.ish_joyi_soni);
        axios
          .post(
            "https://otfiv-andijon-admin.uz/api/hududlar/",
            formData,
            {
              headers: {
                Authorization: `Token 2fa0d2a67200eb75c181d7cef3e5ca5e9ae73f1b`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            axios
              .get(
                process.env.REACT_APP_API_URL ||
                  "https://otfiv-andijon-admin.uz/api/hududlar/",
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token 2fa0d2a67200eb75c181d7cef3e5ca5e9ae73f1b`,
                  },
                }
              )
              .then(function (res) {
                dispatch({
                  type: CREATE_REGIONS,
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

        formData.append("manzil", values.manzil);
        formData.append("aholi", values.aholi);
        formData.append("maydoni", values.maydoni);
        formData.append("loyhalar_soni", values.loyhalar_soni);
        formData.append("ish_joyi_soni", values.ish_joyi_soni);
        dispatch(
          updateAction(
            "api/hududlar",
            UPDATE_REGIONS,
            selectedEditID.id,
            formData
          )
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
    dispatch(deleteAction("api/hududlar/", DELETE_REGIONS, selectedID));
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      dispatch(getAction("api/hududlar/", GET_REGIONS));
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
    { title: "Manzil", dataIndex: "manzil", key: "manzil" },
    { title: "Aholi", dataIndex: "aholi", key: "aholi" },
    { title: "Maydoni", dataIndex: "maydoni", key: "maydoni" },
    {
      title: "Loyhalar soni",
      dataIndex: "loyhalar_soni",
      key: "loyhalar_soni",
    },
    {
      title: "Ish joyi soni",
      dataIndex: "ish_joyi_soni",
      key: "ish_joyi_soni",
    },
    {
      title: "img",
      dataIndex: "img",
      key: "img",
      render: (text) => {
        return(
        <img
        className={"img_news"}
          src={text}
        />
      )},
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
                  name: ["manzil"],
                  value: address,
                },
                {
                  name: ["aholi"],
                  value: population,
                },
                {
                  name: ["maydoni"],
                  value: area,
                },
                {
                  name: ["loyhalar_soni"],
                  value: project_num,
                },
                {
                  name: ["ish_joyi_soni"],
                  value: job_num,
                },
                {
                  name: ["img"],
                  value: "",
                },
              ]}
            >
              <input className="input_img_file" type="file" name="img" onChange={onChange} />

              <FieldHelpers
                label="Manzil"
                name="manzil"
                message="Iltimos Manzil qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Aholi"
                name="aholi"
                message="Iltimos Aholi qatorini yo'ldiring!"
                children=' '
              />
              <FieldHelpers
                label="Maydoni"
                name="maydoni"
                message="Iltimos Maydoni qatorini yo'ldiring!"
                children=" "
              />
              <FieldHelpers
                label="Loyihalar soni"
                name="loyhalar_soni"
                message="Iltimos Loyihalar soni qatorini yo'ldiring!"
                children=" "
              />
              <FieldHelpers
                label="Ish joyi soni"
                name="ish_joyi_soni"
                message="Iltimos Ish joyi soni qatorini yo'ldiring!"
                children=" "
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
                  name: ["manzil"],
                  value: address,
                },
                {
                  name: ["aholi"],
                  value: population,
                },
                {
                  name: ["maydoni"],
                  value: area,
                },
                {
                  name: ["loyhalar_soni"],
                  value: project_num,
                },
                {
                  name: ["ish_joyi_soni"],
                  value: job_num,
                },
                {
                  name: ["img"],
                  value: img,
                },
              ]}
            >
              <input className="input_img_file" type="file" name="img" onChange={onChange} />

              <FieldHelpers
                label="Manzil"
                name="manzil"
                message="Iltimos Manzil qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Aholi"
                name="aholi"
                message="Iltimos Aholi qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Maydoni"
                name="maydoni"
                message="Iltimos Maydoni qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Loyihalar soni"
                name="loyhalar_soni"
                message="Iltimos Loyihalar soni qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Ish joyi soni"
                name="ish_joyi_soni"
                message="Iltimos Ish joyi soni qatorini yo'ldiring!"
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
        <BreadcrumbHelpers to={"home"} from={"Regions"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
