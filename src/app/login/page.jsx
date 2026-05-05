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
      style={{ minHeight: "100dvh", padding: "16px" }}
    >
      <div
        className="glass-card animate-slide-up"
        style={{ width: "100%", maxWidth: "400px", padding: "16px 16px" }}
      >
        <Flex vertical align="center" gap={2} style={{ marginBottom: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "var(--primary-gradient)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "4px",
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            }}
          >
            <Title level={4} style={{ margin: 0, color: "white" }}>
              TP
            </Title>
          </div>
          <Title level={3} className="gradient-text" style={{ margin: 0 }}>
            Welcome Back
          </Title>
          <Text type="secondary">Sign in to continue to Task Pilot</Text>
        </Flex>

        <Form
          name="login_form"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          style={{ marginBottom: "0" }}
        >
          <Form.Item
            label={
              <Text style={{ color: "var(--text-dim)", fontSize: "12px" }}>
                Email
              </Text>
            }
            name="email"
            style={{ marginBottom: "12px" }}
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
                <Text style={{ color: "var(--text-dim)", fontSize: "12px" }}>
                  Password
                </Text>
                <Link
                  href="#"
                  style={{ fontSize: "11px", color: "var(--primary)" }}
                >
                  Forgot?
                </Link>
              </Flex>
            }
            name="password"
            style={{ marginBottom: "16px" }}
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "var(--text-dim)" }} />}
              placeholder="••••••••"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "8px" }}>
            <Button
              type="primary"
              block
              htmlType="submit"
              size="large"
              loading={isUserLoginLoading}
              style={{
                height: "42px",
                fontWeight: 600,
                marginTop: "0px",
                background: "linear-gradient(to right, #3b82f6, #2563eb)",
                border: "none",
              }}
            >
              Log In
            </Button>
          </Form.Item>
        </Form>

        <Divider
          plain
          style={{ borderColor: "rgba(255,255,255,0.1)", margin: "8px 0" }}
        >
          <Text style={{ color: "#64748b", fontSize: "12px" }}>
            OR CONTINUE WITH
          </Text>
        </Divider>

        <Flex gap={8}>
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

        <Flex justify="center" style={{ marginTop: "12px" }}>
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
