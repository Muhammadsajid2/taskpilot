"use client";

import { Form, Input, Button, Card, Typography, Grid, Flex } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import useLogin from "./hooks/useLogin";

const { Title, Link } = Typography;
const { useBreakpoint } = Grid;

export default function LoginForm() {
  const screens = useBreakpoint();
  const { onFinish } = useLogin();

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  return (
    <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
      <Card
        style={{
          width: 400,
          minHeight: screens.md ? "" : "100vh",
          padding: 24,
        }}
      >
        <Flex vertical justify="center">
          <Flex>
            <Title level={3}>Task Pilot</Title>
          </Flex>
          <Form
            {...layout}
            name="login_form"
            layout="vertical"
            // onFinish={onFinish}
            style={{ marginTop: 24 }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your email"
                allowClear
                size="large"
                style={{ width: "280px" }}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                allowClear
                size="large"
                style={{ width: "280px" }}
              />
            </Form.Item>
            <Form.Item>
              <Link href="#">Forgot Password?</Link>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                size="large"
                style={{ width: "280px" }}
              >
                Log In
              </Button>
            </Form.Item>
            <Form.Item>
              <div style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                Don&apos;t have an account? <Link href="#">Sign Up</Link>
              </div>
            </Form.Item>
          </Form>
        </Flex>
      </Card>
    </Flex>
  );
}
