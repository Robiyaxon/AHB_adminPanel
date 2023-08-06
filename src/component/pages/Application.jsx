import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Content } from "antd/lib/layout/layout";
import { DeleteOutlined } from "@ant-design/icons";

import { getAction } from "../../redux/actions/readAction";
import { deleteAction } from "../../redux/actions/deleteAction";
import { BreadcrumbHelpers } from "../../utility/Helpers";
import {
  DELETE_APPLICATION,
  GET_APPLICATION,
} from "../../redux/actions/types";

export const Application = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.applicationReducer);
  const [selectedID, setSelectedID] = useState(null);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);


  useEffect(() => {
    dispatch(getAction("api/ariza/", GET_APPLICATION));
  }, []);

  const showModal = (id) => {
    setVisible(true);
    setSelectedID(id);
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
    { title: "Staj", dataIndex: "staj", key: "staj" },
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
      title: <>---</>,
      dataIndex: "",
      key: "x",
      render: (text) => (
        <>
          <Button type="danger" onClick={(e) => showModal(text.id)}>
            <DeleteOutlined />
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
