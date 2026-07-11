"use client";

import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Card, Col, Descriptions, Form, Input, InputNumber, Row, Skeleton, Space, Typography } from "antd";
import { MailOutlined, PhoneOutlined, SaveOutlined, UserOutlined } from "@ant-design/icons";
import { getCurrentUser, updateCurrentUser } from "../../../../public/API/users";

const { Title, Text } = Typography;

export default function ProfilePage() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const profileQuery = useQuery({ queryKey: ["current-user"], queryFn: getCurrentUser });
  const updateMutation = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["current-user"] }),
  });
  const user = profileQuery.data;

  useEffect(() => {
    if (user) form.setFieldsValue({ name: user.name, phone: user.phone, age: user.age });
  }, [form, user]);

  if (profileQuery.isLoading) return <Skeleton active />;
  if (!user) return <Text type="danger">Unable to load your profile.</Text>;
  const initials = user.name?.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "TP";

  return <div style={{ maxWidth: 980, margin: "0 auto" }}>
    <div className="animate-fade-in"><Title level={2} className="gradient-text" style={{ marginBottom: 4 }}>My Profile</Title><Text style={{ color: "var(--text-dim)" }}>Manage the details associated with your Task Pilot account.</Text></div>
    <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
      <Col xs={24} md={9}><Card className="glass-card" variant="borderless"><Space direction="vertical" align="center" size={14} style={{ width: "100%" }}><Avatar size={104} icon={<UserOutlined />} style={{ background: "var(--primary-gradient)", fontSize: 32 }}>{initials}</Avatar><div style={{ textAlign: "center" }}><Title level={3} style={{ marginBottom: 0 }}>{user.name}</Title><Text type="secondary">{user.email}</Text></div></Space><Descriptions column={1} size="small" style={{ marginTop: 24 }} items={[{ key: "email", label: <><MailOutlined /> Email</>, children: user.email }, { key: "phone", label: <><PhoneOutlined /> Phone</>, children: user.phone || "Not added" }]} /></Card></Col>
      <Col xs={24} md={15}><Card className="glass-card" variant="borderless" title="Personal details"><Form form={form} layout="vertical" onFinish={(values) => updateMutation.mutate(values)}><Form.Item name="name" label="Full name" rules={[{ required: true, message: "Enter your name" }]}><Input size="large" /></Form.Item><Form.Item label="Email"><Input size="large" value={user.email} disabled /></Form.Item><Form.Item name="phone" label="Phone number"><Input size="large" placeholder="Add your phone number" /></Form.Item><Form.Item name="age" label="Age"><InputNumber min={1} max={150} size="large" style={{ width: "100%" }} /></Form.Item>{updateMutation.error ? <Text type="danger">{updateMutation.error.message || "Unable to update profile."}</Text> : null}<Form.Item style={{ marginBottom: 0, marginTop: 24 }}><Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={updateMutation.isPending}>Save changes</Button></Form.Item></Form></Card></Col>
    </Row>
  </div>;
}
