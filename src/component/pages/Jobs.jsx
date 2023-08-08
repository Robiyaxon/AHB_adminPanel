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
  CREATE_JOBS,
  DELETE_JOBS,
  GET_JOBS,
  UPDATE_JOBS,
} from "../../redux/actions/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const Jobs = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.jobsReducer);
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedEditID, setselectedEditID] = useState(null);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [require, setRequire] = useState('')
  const [contact, setContact] = useState('')
  const [salary, setSalary] = useState('')
  const [deadline, setDeadline] = useState('')

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAction("api/ishlar", GET_JOBS));
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
    setName(id.nomi);
    setAddress(id.manzil);
    setContact(id.contact);
    setSalary(id.maosh);
    setRequire(id.talablar);
    setDeadline(id.mudat);
  };
  data.sort(function(a, b) {
    return a.id - b.id;
  });
  data.reverse();
  const createHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setCreateVisible(false);
        axios
          .post(
              "https://otfiv-andijon-admin.uz/" + "api/ishlar/",
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
                  "https://otfiv-andijon-admin.uz/" + "api/ishlar/",
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token 2fa0d2a67200eb75c181d7cef3e5ca5e9ae73f1b`,
                  },
                }
              )
              .then(function (res) {
                dispatch({
                  type: CREATE_JOBS,
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
          updateAction("api/ishlar", UPDATE_JOBS, selectedEditID.id, values)
        );
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(deleteAction("api/ishlar", DELETE_JOBS, selectedID));
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      dispatch(getAction("api/ishlar", GET_JOBS));
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
    { title: "Nomi", dataIndex: "nomi", key: "nomi" },
    { title: "Manzil", dataIndex: "manzil", key: "manzil" },
    { title: "Talablar", dataIndex: "talablar", key: "talablar" },
    { title: "Maosh", dataIndex: "maosh", key: "maosh" },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    { title: "Muddat", dataIndex: "mudat", key: "mudat" },
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
                label="Nomi"
                name="nomi"
                message="Iltimos Nomi qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Manzil"
                name="manzil"
                message="Iltimos Manzil qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Talablar"
                name="talablar"
                message="Iltimos Talablar qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Maosh"
                name="maosh"
                message="Iltimos Maosh qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Contact"
                name="contact"
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
                  value: name,
                },
                {
                  name: ["manzil"],
                  value: address,
                },
                {
                  name: ["talablar"],
                  value: require,
                },
                {
                  name: ["contact"],
                  value: contact,
                },
                {
                  name: ["maosh"],
                  value: salary,
                },
                {
                  name: ["mudat"],
                  value: deadline,
                },
              ]}
            >
              <FieldHelpers
                label="Nomi"
                name="nomi"
                message="Iltimos Nomi qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Manzil"
                name="manzil"
                message="Iltimos Manzil qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Talablar"
                name="talablar"
                message="Iltimos Talablar qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Maosh"
                name="maosh"
                message="Iltimos Maosh qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Contact"
                name="contact"
                message="Iltimos Contact haqida qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Muddat"
                name="mudat"
                message="Iltimos Muddat haqida qatorini yo'ldiring!"
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
        <BreadcrumbHelpers to={"home"} from={"ishlar"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
