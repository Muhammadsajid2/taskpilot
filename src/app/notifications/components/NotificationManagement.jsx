"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Col, Form, Input, Radio, Row, Select, Space, Table, Tag, Tooltip, Typography } from "antd";
import { NotificationOutlined, SendOutlined } from "@ant-design/icons";
import { getNotificationCampaigns, getPushDevices, sendPushNotification } from "../../../../public/API/pushNotifications";

const { Title, Text } = Typography;
const DEVICE_PAGE_SIZE = 6;
const CAMPAIGN_PAGE_SIZE = 10;
const TABLE_SCROLL_HEIGHT = 420;

const shorten = (value, start = 14, end = 8) => !value || value.length <= start + end + 1 ? value : `${value.slice(0, start)}…${value.slice(-end)}`;
const formatDate = (value) => value ? new Intl.DateTimeFormat("en-PK", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "—";
const getPaginatedData = (response) => {
  // `request` normally returns the API body, but some deployments wrap it in
  // an additional `data` object. Unwrap that envelope before handing rows to AntD.
  const payload = Array.isArray(response?.data) || Array.isArray(response)
    ? response
    : response?.data ?? response?.result ?? response?.payload;
  const rows = Array.isArray(payload) ? payload : payload?.data;

  return {
    data: Array.isArray(rows) ? rows : [],
    total: payload?.total ?? response?.total ?? (Array.isArray(rows) ? rows.length : 0),
  };
};

export default function NotificationManagement() {
  const [form] = Form.useForm();
  const [devicePagination, setDevicePagination] = useState({ current: 1, pageSize: DEVICE_PAGE_SIZE });
  const [campaignPagination, setCampaignPagination] = useState({ current: 1, pageSize: CAMPAIGN_PAGE_SIZE });
  const targetType = Form.useWatch("targetType", form) || "all";
  const queryClient = useQueryClient();
  const devicesQuery = useQuery({
    queryKey: ["push-devices", devicePagination.current, devicePagination.pageSize],
    queryFn: () => getPushDevices({ page: devicePagination.current, size: devicePagination.pageSize }),
  });
  const campaignsQuery = useQuery({
    queryKey: ["notification-campaigns", campaignPagination.current, campaignPagination.pageSize],
    queryFn: () => getNotificationCampaigns({ page: campaignPagination.current, size: campaignPagination.pageSize }),
  });
  const { data: devices, total: deviceTotal } = getPaginatedData(devicesQuery.data);
  const { data: campaigns, total: campaignTotal } = getPaginatedData(campaignsQuery.data);

  const sendMutation = useMutation({
    mutationFn: sendPushNotification,
    onSuccess: async () => {
      form.resetFields();
      form.setFieldValue("targetType", "all");
      await queryClient.invalidateQueries({ queryKey: ["notification-campaigns"] });
    },
  });

  const deviceOptions = useMemo(
    () => devices.filter((device) => device.enabled).map((device) => ({
      value: device._id,
      label: `${shorten(device.deviceName || device.deviceId || "Unknown device", 18, 6)} (${device.platform})`,
    })),
    [devices],
  );

  const updateDevicePagination = (current, pageSize) => setDevicePagination((previous) => ({
    current: pageSize !== previous.pageSize ? 1 : current,
    pageSize,
  }));
  const updateCampaignPagination = (current, pageSize) => setCampaignPagination((previous) => ({
    current: pageSize !== previous.pageSize ? 1 : current,
    pageSize,
  }));

  const deviceColumns = [
    {
      title: "Device",
      key: "device",
      width: 250,
      render: (_, device) => {
        const identifier = device.deviceName || device.deviceId || "Unknown device";
        return <Tooltip title={identifier}><Text ellipsis style={{ display: "block", maxWidth: 220 }}>{shorten(identifier)}</Text></Tooltip>;
      },
    },
    { title: "Platform", dataIndex: "platform", width: 96, render: (platform) => <Tag>{platform || "—"}</Tag> },
    { title: "Status", dataIndex: "enabled", width: 88, render: (enabled) => <Tag color={enabled ? "green" : "default"}>{enabled ? "Active" : "Disabled"}</Tag> },
    { title: "Last seen", dataIndex: "lastSeenAt", width: 130, render: (value) => <Text style={{ whiteSpace: "nowrap" }}>{formatDate(value)}</Text> },
  ];

  const campaignColumns = [
    { title: "Title", dataIndex: "title", width: 240, ellipsis: true },
    {
      title: "Audience",
      key: "audience",
      width: 180,
      render: (_, item) => <Tag color={item.targetType === "all" ? "blue" : item.targetType === "devices" ? "purple" : "green"}>{item.targetType === "all" ? "All devices" : item.topic || "Selected devices"}</Tag>,
    },
    { title: "Sent", key: "sent", width: 160, render: (_, item) => item.targetType === "devices" ? `${item.sentCount} sent, ${item.failureCount} failed` : "Submitted to Firebase" },
    { title: "Created", dataIndex: "createdAt", width: 190, render: formatDate },
  ];

  return <div style={{ maxWidth: 1280, margin: "0 auto" }}>
    <div className="animate-fade-in"><Title level={2} className="gradient-text" style={{ marginBottom: 4 }}>Push Notifications</Title><Text style={{ color: "var(--text-dim)" }}>Send a Firebase notification to every phone, a topic, or selected devices.</Text></div>
    <Row gutter={[24, 24]} align="stretch" style={{ marginTop: 24 }}>
      <Col xs={24} lg={12} style={{ display: "flex" }}><Card className="glass-card" variant="borderless" title={<Space><NotificationOutlined /> Create notification</Space>} style={{ width: "100%", height: "100%" }}><Form form={form} layout="vertical" initialValues={{ targetType: "all" }} onFinish={(values) => sendMutation.mutate(values)}>
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
      <Col xs={24} lg={12} style={{ display: "flex" }}><Card className="glass-card" variant="borderless" title="Registered devices" style={{ width: "100%", height: "100%" }}><Table className="notification-table" rowKey="_id" size="middle" loading={devicesQuery.isLoading} dataSource={devices} columns={deviceColumns} tableLayout="fixed" scroll={{ x: 564, y: TABLE_SCROLL_HEIGHT }} pagination={{ ...devicePagination, total: deviceTotal, showSizeChanger: true, pageSizeOptions: ["6", "10", "20", "50", "100"], showQuickJumper: false, hideOnSinglePage: false, position: ["bottomCenter"], onChange: updateDevicePagination }} /></Card></Col>
    </Row>
    <Card className="glass-card" variant="borderless" title="Notification history" style={{ marginTop: 24 }}><Table className="notification-table" rowKey="_id" size="middle" loading={campaignsQuery.isLoading} dataSource={campaigns} columns={campaignColumns} tableLayout="fixed" scroll={{ x: 770, y: TABLE_SCROLL_HEIGHT }} pagination={{ ...campaignPagination, total: campaignTotal, showSizeChanger: true, pageSizeOptions: ["10", "20", "50", "100"], showQuickJumper: false, hideOnSinglePage: false, position: ["bottomCenter"], onChange: updateCampaignPagination }} /></Card>
  </div>;
}
