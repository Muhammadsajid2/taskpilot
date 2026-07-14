"use client";

import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Col, Form, Input, Radio, Row, Select, Space, Table, Tag, Typography } from "antd";
import { NotificationOutlined, SendOutlined } from "@ant-design/icons";
import { getNotificationCampaigns, getPushDevices, sendPushNotification } from "../../../../public/API/pushNotifications";

const { Title, Text } = Typography;

export default function NotificationManagement() {
  const [form] = Form.useForm();
  const targetType = Form.useWatch("targetType", form) || "all";
  const queryClient = useQueryClient();
  const devicesQuery = useQuery({ queryKey: ["push-devices"], queryFn: getPushDevices });
  const campaignsQuery = useQuery({ queryKey: ["notification-campaigns"], queryFn: getNotificationCampaigns });
  const sendMutation = useMutation({
    mutationFn: sendPushNotification,
    onSuccess: async () => {
      form.resetFields();
      form.setFieldValue("targetType", "all");
      await queryClient.invalidateQueries({ queryKey: ["notification-campaigns"] });
    },
  });
  const deviceOptions = useMemo(() => (devicesQuery.data || []).filter((device) => device.enabled).map((device) => ({ value: device._id, label: `${device.deviceName || device.deviceId} (${device.platform})` })), [devicesQuery.data]);
  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Audience", key: "audience", render: (_, item) => <Tag color={item.targetType === "all" ? "blue" : item.targetType === "devices" ? "purple" : "green"}>{item.targetType === "all" ? "All devices" : item.topic || "Selected devices"}</Tag> },
    { title: "Sent", key: "sent", render: (_, item) => item.targetType === "devices" ? `${item.sentCount} sent, ${item.failureCount} failed` : "Submitted to Firebase" },
    { title: "Created", dataIndex: "createdAt", render: (value) => new Intl.DateTimeFormat("en-PK", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) },
  ];

  return <div style={{ maxWidth: 1280, margin: "0 auto" }}>
    <div className="animate-fade-in"><Title level={2} className="gradient-text" style={{ marginBottom: 4 }}>Push Notifications</Title><Text style={{ color: "var(--text-dim)" }}>Send a Firebase notification to every phone, a topic, or selected devices.</Text></div>
    <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
      <Col xs={24} lg={12}><Card className="glass-card" variant="borderless" title={<Space><NotificationOutlined /> Create notification</Space>}><Form form={form} layout="vertical" initialValues={{ targetType: "all" }} onFinish={(values) => sendMutation.mutate(values)}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: "Enter a notification title" }]}><Input maxLength={120} placeholder="New live stream" /></Form.Item>
        <Form.Item name="body" label="Message" rules={[{ required: true, message: "Enter a message" }]}><Input.TextArea rows={4} maxLength={1000} placeholder="A new cricket stream is now available." /></Form.Item>
        <Form.Item name="targetType" label="Send to"><Radio.Group optionType="button" buttonStyle="solid" options={[{ label: "All devices", value: "all" }, { label: "Topic", value: "topic" }, { label: "Specific devices", value: "devices" }]} /></Form.Item>
        {targetType === "topic" ? <Form.Item name="topic" label="FCM topic" rules={[{ required: true, message: "Enter a topic" }]} extra="Example: cricket, live_streams, or category_abc123"><Input placeholder="cricket" /></Form.Item> : null}
        {targetType === "devices" ? <Form.Item name="deviceIds" label="Devices" rules={[{ required: true, message: "Select at least one device" }]}><Select mode="multiple" loading={devicesQuery.isLoading} options={deviceOptions} placeholder="Select registered phones" /></Form.Item> : null}
        <Form.Item name="imageUrl" label="Image URL"><Input placeholder="Optional notification image" /></Form.Item>
        <Form.Item name={["data", "screen"]} label="Open screen"><Input placeholder="Optional: home, videos, category" /></Form.Item>
        {sendMutation.error ? <Text type="danger">{sendMutation.error.message || "Unable to send notification."}</Text> : null}
        <Button type="primary" htmlType="submit" icon={<SendOutlined />} loading={sendMutation.isPending}>Send notification</Button>
      </Form></Card></Col>
      <Col xs={24} lg={12}><Card className="glass-card" variant="borderless" title="Registered devices"><Table rowKey="_id" size="small" loading={devicesQuery.isLoading} dataSource={devicesQuery.data || []} pagination={{ pageSize: 6 }} columns={[{ title: "Device", key: "device", render: (_, item) => item.deviceName || item.deviceId }, { title: "Platform", dataIndex: "platform" }, { title: "Status", dataIndex: "enabled", render: (enabled) => <Tag color={enabled ? "green" : "default"}>{enabled ? "Active" : "Disabled"}</Tag> }, { title: "Last seen", dataIndex: "lastSeenAt", render: (value) => new Date(value).toLocaleDateString() }]} /></Card></Col>
    </Row>
    <Card className="glass-card" variant="borderless" title="Notification history" style={{ marginTop: 24 }}><Table rowKey="_id" loading={campaignsQuery.isLoading} dataSource={campaignsQuery.data || []} columns={columns} pagination={{ pageSize: 10 }} scroll={{ x: 800 }} /></Card>
  </div>;
}
