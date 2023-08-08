import React from "react";
import { useDispatch } from "react-redux";
import { Button, Layout, Menu, Result } from "antd";
import { ContactsOutlined } from "@ant-design/icons";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Routes, Route, NavLink } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { logout } from "../../redux/actions/authAction";
import { Application } from "../pages/Application";
import { Assessment } from "../pages/Assessment";
import { Jobs } from "../pages/Jobs";
import { News } from "../pages/News";

import logo from "../../assets/logo.png";

import "antd/dist/antd.css";
import { Regions } from "../pages/Regions";
import { Ballash } from "../pages/Ballar";

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
              <NavLink to={"assessment"}>Davomat</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<NewspaperIcon />}>
              <NavLink to={"news"}>Yangiliklar</NavLink>
            </Menu.Item>
            <Menu.Item key="5" icon={<NewspaperIcon />}>
              <NavLink to={"regions"}>Hududlar</NavLink>
            </Menu.Item>
            <Menu.Item key="6" icon={<NewspaperIcon />}>
              <NavLink to={"reyting"}>Muassa Reytingi</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <LogOut />
          <Routes>
            <Route index element={<Jobs />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="application" element={<Application />} />
            <Route path="assessment" element={<Assessment />} />
            <Route path="news" element={<News />} />
            <Route path="regions" element={<Regions />} />
            <Route path="reyting" element={<Ballash />} />
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
