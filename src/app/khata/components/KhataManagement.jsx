"use client";

import Link from "next/link";
import { Button, Card, Flex, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Table, Tag, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useKhataManagement from "../hooks/useKhataManagement";

const { Title, Text } = Typography;
const money = (amount, currency = "PKR") => new Intl.NumberFormat("en-PK", { style: "currency", currency }).format((amount || 0) / 100);

export default function KhataManagement() {
  const page = useKhataManagement();
  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Participants", dataIndex: "participants", render: (participants) => participants.map((item) => item.name).join(" and ") },
    { title: "Balance", key: "balance", render: (_, record) => record.summary?.outstandingBalance ? `${record.summary.owing?.name} owes ${record.summary.receiver?.name} ${money(record.summary.outstandingBalance, record.currency)}` : "Khata is settled" },
    { title: "Status", dataIndex: "status", render: (status) => <Tag color={status === "settled" ? "green" : "blue"}>{status}</Tag> },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <Space>
        <Link href={`/khata/${record._id}`}><Button>Open Ledger</Button></Link>
        <Popconfirm
          title="Delete this Khata?"
          description="It will be removed from your active list, but financial history will be kept."
          okText="Delete"
          okButtonProps={{ danger: true, loading: page.isDeleting }}
          onConfirm={() => page.deleteKhata(record._id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      </Space>,
    },
  ];

  return <div style={{ maxWidth: 1280, margin: "0 auto" }}>
    <Flex justify="space-between" align="center" gap={16} wrap="wrap" className="animate-fade-in">
      <div><Title level={2} className="gradient-text" style={{ margin: 0 }}>Khata</Title><Text style={{ color: "var(--text-dim)" }}>A shared, two-person ledger with live balances.</Text></div>
      <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => page.setOpen(true)}>Create Khata</Button>
    </Flex>
    <Card className="glass-card animate-slide-up" variant="borderless" style={{ marginTop: 24 }}>
      <Table rowKey="_id" dataSource={page.khatas} columns={columns} loading={page.isLoading} pagination={false} locale={{ emptyText: "Create your first shared Khata." }} scroll={{ x: 900 }} />
    </Card>
    <Modal title="Create Khata" open={page.open} onCancel={() => page.setOpen(false)} onOk={() => page.form.submit()} confirmLoading={page.isSaving} okText="Create">
      <Form form={page.form} layout="vertical" onFinish={page.createKhata} initialValues={{ currency: "PKR", openingBalanceDirection: "creatorOwesParticipant" }}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: "Enter a title" }]}><Input placeholder="e.g. Home expenses" /></Form.Item>
        <Form.Item name="description" label="Description"><Input.TextArea rows={3} placeholder="Optional note" /></Form.Item>
        <Form.Item name="secondParticipantId" label="Second participant" rules={[{ required: true, message: "Select a participant" }]}><Select showSearch optionFilterProp="label" loading={page.participantsLoading} options={page.participants} placeholder="Select a user" /></Form.Item>
        <Form.Item name="currency" label="Currency" rules={[{ required: true }]}><Select options={[{ value: "PKR", label: "PKR - Pakistani Rupee" }, { value: "USD", label: "USD - US Dollar" }]} /></Form.Item>
        <Form.Item name="openingBalance" label="Opening balance"><InputNumber min={0} precision={2} style={{ width: "100%" }} placeholder="0.00" /></Form.Item>
        <Form.Item name="openingBalanceDirection" label="Opening balance direction"><Select options={[{ value: "creatorOwesParticipant", label: "I owe the other participant" }, { value: "participantOwesCreator", label: "The other participant owes me" }]} /></Form.Item>
        {page.error ? <Text type="danger">{page.error.message || "Unable to create Khata."}</Text> : null}
      </Form>
    </Modal>
  </div>;
}
