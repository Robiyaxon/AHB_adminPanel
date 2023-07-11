import React from "react";
import "antd/dist/antd.css";
import { Button, Layout, Menu, Result } from "antd";
import { ContactsOutlined } from "@ant-design/icons";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Routes, Route, NavLink } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { List } from "../list/List";
import { AddPatient } from "../news/AddPatient";
import { Jobs } from "../news/Jobs";
import { Assessment } from "../news/Assessment";

const { Header, Sider } = Layout;
function LogOut(params) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <div className="headerDesc">
        <div>
          <img className="logoIcon" src={logo} alt="Rasm Yo`q" />
        </div>
        <div className="btnLogOut">
          <Button type="danger" onClick={logoutHandler}>
            Chiqish
          </Button>
        </div>
      </div>
    </Header>
  );
}

export class Sidebar extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          width={"250"}
        >
          <div className="logo">
            {!collapsed ? (
              <>
                <AdminPanelSettingsIcon /> OTM Admin
              </>
            ) : (
              <AdminPanelSettingsIcon />
            )}
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<ContactsOutlined />}>
              <NavLink to={"jobs"}>Ishlar</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<NewspaperIcon />}>
              <NavLink to={"application"}>Arizalar</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<NewspaperIcon />}>
              <NavLink to={"assessment"}>Baholash</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <LogOut />
          <Routes>
            <Route index element={<Jobs />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="application" element={<AddPatient />} />
            <Route path="assessment" element={<Assessment />} />
            <Route
              path="*"
              element={
                <Result
                  status="404"
                  title="404"
                  subTitle="Kechirasiz, siz tashrif buyurgan sahifa mavjud emas."
                  extra={
                    <NavLink to={"/"}>
                      <Button type="primary">Orqaga qaytish</Button>
                    </NavLink>
                  }
                />
              }
            />
          </Routes>
        </Layout>
      </Layout>
    );
  }
}
