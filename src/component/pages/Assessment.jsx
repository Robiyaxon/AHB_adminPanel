import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Content } from "antd/lib/layout/layout";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";

import { getAction } from "../../redux/actions/readAction";
import { updateAction } from "../../redux/actions/updateAction";
import { deleteAction } from "../../redux/actions/deleteAction";
import { BreadcrumbHelpers, FieldHelpers } from "../../utility/Helpers";
import {
  CREATE_ASSESSMENT,
  DELETE_ASSESSMENT,
  GET_ASSESSMENT,
  UPDATE_ASSESSMENT,
} from "../../redux/actions/types";

export const Assessment = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.assessmentReducer);
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedEditID, setselectedEditID] = useState(null);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [needToCome, setNeedToCome] = useState(0);

  const [form] = Form.useForm();

  function sort_by_id() {
    return function (elem1, elem2) {
      const math1 = elem1.kelishi_kerak / 100
      const math2 = elem2.kelishi_kerak / 100
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


  useEffect(() => {
    dispatch(getAction("api/baholash", GET_ASSESSMENT));
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
    setName(id.OTM_nomi);
    setAddress(id.biriktirilgan_masul);
    setNeedToCome(id.kelishi_kerak);
  };
  const createHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setCreateVisible(false);
        axios
          .post(
            "https://otfiv-andijon-admin.uz/" + "api/baholash/",
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
                  "https://otfiv-andijon-admin.uz/" + "api/baholash/",
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token 2fa0d2a67200eb75c181d7cef3e5ca5e9ae73f1b`,
                  },
                }
              )
              .then(function (res) {
                dispatch({
                  type: CREATE_ASSESSMENT,
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
        dispatch(
          updateAction(
            "api/baholash",
            UPDATE_ASSESSMENT,
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
    dispatch(deleteAction("api/baholash", DELETE_ASSESSMENT, selectedID));
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      dispatch(getAction("api/baholash", GET_ASSESSMENT));
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
    { title: "OTM_nomi", dataIndex: "OTM_nomi", key: "OTM_nomi" },
    {
      title: "biriktirilgan_masul",
      dataIndex: "biriktirilgan_masul",
      key: "biriktirilgan_masul",
    },
    { title: "kelganligi", dataIndex: "kelganligi", key: "kelganligi" },
    {
      title: "Kelishi kerak",
      dataIndex: "kelishi_kerak",
      key: "kelishi_kerak",
    },
    {
      title: "foiz",
      key: "kelishi_kerak",
      dataIndex: "",
      render: (text) => {
        const math = text.kelishi_kerak / 100;
        return <p>{parseInt(text.kelganligi * math)}</p>;
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
                label="OTM_nomi"
                name="OTM_nomi"
                message="Iltimos OTM_nomi qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Biriktirilgan_masul"
                name="biriktirilgan_masul"
                message="Iltimos Biriktirilgan_masul qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Kelishi kerak"
                name="kelishi_kerak"
                message="Iltimos Kelishi kerak qatorini yo'ldiring!"
              />
            </Form>
          </Modal>
        </>
      ),
      dataIndex: "",
      key: "x",
      render: (text) => (
        <>
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
                  name: ["OTM_nomi"],
                  value: name,
                },
                {
                  name: ["biriktirilgan_masul"],
                  value: address,
                },
                {
                  name: ["kelishi_kerak"],
                  value: needToCome,
                },
              ]}
            >
              <FieldHelpers
                label="OTM_nomi"
                name="OTM_nomi"
                message="Iltimos OTM_nomi qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Biriktirilgan_masul"
                name="biriktirilgan_masul"
                message="Iltimos Biriktirilgan_masul qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Kelishi kerak"
                name="kelishi_kerak"
                message="Iltimos Kelishi kerak qatorini yo'ldiring!"
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
        <BreadcrumbHelpers to={"home"} from={"baholash"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
