"use client";

import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Button,
  Space,
  Typography,
  theme,
  Grid,
} from "antd";
import {
  DashboardOutlined,
  ProjectOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FolderOutlined,
  TagsOutlined,
  VideoCameraOutlined,
  WalletOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeMode } from "./ThemeProvider";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();
  const isMobile = screens.xs;
  const { themeMode, toggleTheme } = useThemeMode();
  const isDark = themeMode === "dark";

  const pathname = usePathname();
  const {
    token: { colorBgContainer, colorTextBase },
  } = theme.useToken();

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile, pathname]); // Auto-collapse when pathname changes on mobile

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: "/tasks",
      icon: <ProjectOutlined />,
      label: <Link href="/tasks">Tasks</Link>,
    },
    {
      key: "/category",
      icon: <FolderOutlined />,
      label: <Link href="/category">Category</Link>,
    },
    {
      key: "/sub-category",
      icon: <TagsOutlined />,
      label: <Link href="/sub-category">Sub Category</Link>,
    },
    {
      key: "/videos",
      icon: <VideoCameraOutlined />,
      label: <Link href="/videos">Videos</Link>,
    },
    {
      key: "/khata",
      icon: <WalletOutlined />,
      label: <Link href="/khata">Khata</Link>,
    },
  ];

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => {
        window.location.href = "/profile";
      },
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      },
    },
  ];

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={isMobile ? 0 : 80}
        theme={isDark ? "dark" : "light"}
        className="glass-card"
        style={{
          borderRight: "1px solid var(--glass-border)",
          position: isMobile ? "fixed" : "relative",
          height: "100vh",
          zIndex: 1001,
          background: "var(--sidebar-bg)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 16px",
          }}
        >
          <Title
            level={4}
            style={{
              color: "var(--sidebar-text)",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            {collapsed ? "TP" : "Task Pilot"}
          </Title>
        </div>
        <Menu
          theme={isDark ? "dark" : "light"}
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ background: "transparent", borderRight: 0 }}
        />
      </Sider>
      <Layout
        style={{
          transition: "all 0.2s",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--glass-border)",
            flex: "0 0 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                color: colorTextBase,
              }}
            />
            {isMobile && collapsed && (
              <Title
                level={4}
                style={{ margin: "0 0 0 16px", color: "var(--primary)" }}
              >
                Task Pilot
              </Title>
            )}
          </div>
          <Space size={16}>
            <Button
              type="text"
              shape="circle"
              size="large"
              icon={isDark ? <SunOutlined /> : <MoonOutlined />}
              onClick={toggleTheme}
              style={{ color: colorTextBase }}
            />
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{ cursor: "pointer", backgroundColor: "var(--primary)" }}
              />
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: "0",
            padding: isMobile ? 12 : 24,
            background: "transparent",
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
