"use client";

import { Form, Input, Button, Typography, Flex, Divider, theme } from "antd";
import {
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import useLogin from "./hooks/useLogin";
import Link from "next/link";

const { Title, Text } = Typography;

export default function LoginForm() {
  const { onFinish, isUserLoginLoading } = useLogin();

  return (
    <Flex
      justify="center"
      align="center"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <div
        className="glass-card animate-slide-up"
        style={{ width: "100%", maxWidth: "420px", padding: "40px" }}
      >
        <Flex vertical align="center" gap={8} style={{ marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "var(--primary-gradient)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "12px",
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            }}
          >
            <Title level={4} style={{ margin: 0, color: "white" }}>
              TP
            </Title>
          </div>
          <Title level={2} className="gradient-text" style={{ margin: 0 }}>
            Welcome Back
          </Title>
          <Text type="secondary">Sign in to continue to Task Pilot</Text>
        </Flex>

        <Form
          name="login_form"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            label={<Text style={{ color: "var(--text-dim)" }}>Email</Text>}
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "var(--text-dim)" }} />}
              placeholder="name@company.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={
              <Flex justify="space-between" style={{ width: "100%" }}>
                <Text style={{ color: "var(--text-dim)" }}>Password</Text>
                <Link
                  href="#"
                  style={{ fontSize: "12px", color: "var(--primary)" }}
                >
                  Forgot password?
                </Link>
              </Flex>
            }
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "var(--text-dim)" }} />}
              placeholder="••••••••"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              block
              htmlType="submit"
              size="large"
              loading={isUserLoginLoading}
              style={{
                height: "48px",
                fontWeight: 600,
                marginTop: "8px",
                background: "linear-gradient(to right, #3b82f6, #2563eb)",
                border: "none",
              }}
            >
              Log In
            </Button>
          </Form.Item>
        </Form>

        <Divider plain style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <Text style={{ color: "#64748b", fontSize: "12px" }}>
            OR CONTINUE WITH
          </Text>
        </Divider>

        <Flex gap={12}>
          <Button
            block
            icon={<GoogleOutlined />}
            size="large"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Google
          </Button>
          <Button
            block
            icon={<GithubOutlined />}
            size="large"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            GitHub
          </Button>
        </Flex>

        <Flex justify="center" style={{ marginTop: "32px" }}>
          <Text style={{ color: "var(--text-dim)" }}>
            Don't have an account?{" "}
            <Link
              href="/signup"
              style={{ color: "var(--primary)", fontWeight: 600 }}
            >
              Sign up
            </Link>
          </Text>
        </Flex>
      </div>
    </Flex>
  );
}
