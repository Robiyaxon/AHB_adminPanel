import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Select, Table } from "antd";
import { BreadcrumbHelpers, FieldHelpers } from "../../utility/Helpers";
import { Content } from "antd/lib/layout/layout";
import AddBoxIcon from "@mui/icons-material/AddBox";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../redux/actions/readAction";
import { updateAction } from "../../redux/actions/updateAction";
import { deleteAction } from "../../redux/actions/deleteAction";
import { createAction } from "../../redux/actions/createAction";
import {
  CREATE_APPLICATION,
  DELETE_APPLICATION,
  GET_APPLICATION,
  UPDATE_APPLICATION,
} from "../../redux/actions/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";

export const AddPatient = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.applicationReducer);

  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedEditID, setselectedEditID] = useState(null);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();
  // const [data2, setData] = useState("");
  useEffect(() => {
    dispatch(getAction("api/ariza/", CREATE_APPLICATION));

    // axios
    //   .get(process.env.REACT_APP_API_URL + "user/history/all")
    //   .then(function (response) {
    //     setData(response.data.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }, []);
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
  };
  const createHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setCreateVisible(false);
        dispatch(createAction("api/ariza/", CREATE_APPLICATION, values));
        // axios
        // .post(process.env.REACT_APP_API_URL + "api/ariza/", values)
        // .then((res) => {
        //   axios
        //   .get(process.env.REACT_APP_API_URL + "user/history/all")
        //   .then(function (response) {
        //     setData(response.data.data);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        // })
        // .catch((err) => {
        //   console.log(err);
        // });
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
          updateAction(
            "api/ariza/",
            UPDATE_APPLICATION,
            selectedEditID.id,
            values
          )
        );
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(deleteAction("api/ariza", DELETE_APPLICATION, selectedID));
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      dispatch(getAction("api/ariza", GET_APPLICATION));
    }, 1000);
  };

  const createHandleCancel = () => {
    setCreateVisible(false);
  };
  const editHandleCancel = () => {
    setCreateVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", contact: "contact" },
    { title: "Ism", dataIndex: "ism", key: "ism", contact: "contact" },
    {
      title: "Familiya",
      dataIndex: "familiya",
      key: "familiya",
    },
    { title: "Yosh", dataIndex: "yoshi", key: "yoshi" },
    { title: "Staj", dataIndex: "staj", key: "staj"},
    { title: "Ish", dataIndex: "ish", key: "ish" },
    {
      title: "Ishchi haqida",
      dataIndex: "ishchi_haqida",
      key: "ishchi_haqida",
     
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
     
    },
    {
      title: (
        <>
          ---
          {/* <Button type="primary" onClick={showCreateModal}>
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
                label="Ism"
                name="ism"
                message="Iltimos Ism qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Familiya"
                name="familiya"
                message="Iltimos Familiya qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Yosh"
                name="yosh"
                message="Iltimos Yosh qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Staj"
                name="staj"
                message="Iltimos Staj qatorini yo'ldiring!"
              />
              <Form.Item
                name="select"
                label="Ish"
                rules={[
                  {
                    required: true,
                    message: "Iltimos Ish qatorini yo'ldiring!",
                  },
                ]}
              >
                <Select placeholder="Please select a country">
                  <Option value="1">1</Option>
                </Select>
              </Form.Item>

        
              <FieldHelpers
                label="Ishchi haiqda"
                name="ishchi_haqida"
                message="Iltimos Ishchi haqida qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="CV"
                name="cv"
                message="Iltimos CV haqida qatorini yo'ldiring!"
              />
            </Form>
          </Modal> */}
        </>
      ),
      dataIndex: "",
      key: "x",
      render: (text) => (
        <>
          <Button type="danger" onClick={(e) => showModal(text.id)}>
            <DeleteOutlined />
          </Button>
          {/* <Button type="primary" onClick={(e) => showEditModal(text)}>
            <EditOutlined />
          </Button> */}
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
          {/* <Modal
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
            >
              <FieldHelpers
                label="Nom Uz"
                name="name"
                message="Iltimos Nom Uz qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Nom Ru"
                name="nameRu"
                message="Iltimos Nom Ru qatorini yo'ldiring!"
              />
            </Form>
          </Modal> */}
        </>
      ),
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <BreadcrumbHelpers to={"home"} from={"arizalar"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
