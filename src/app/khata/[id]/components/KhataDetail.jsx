"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Col, DatePicker, Descriptions, Divider, Flex, Form, Input, InputNumber, Modal, Popconfirm, Row, Select, Space, Statistic, Table, Tag, Timeline, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { archiveKhata, archiveKhataTransaction, createKhataTransaction, getKhata, getKhataActivities, getKhataTransactions, updateKhataTransaction } from "../../../../../public/API/khata";

const { Title, Text } = Typography;
const money = (amount, currency = "PKR") => new Intl.NumberFormat("en-PK", { style: "currency", currency }).format((amount || 0) / 100);
const toMinor = (value) => Math.round(Number(value || 0) * 100);

export default function KhataDetail() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const queryClient = useQueryClient();
  const khataQuery = useQuery({ queryKey: ["khata", id], queryFn: () => getKhata(id), enabled: Boolean(id) });
  const transactionsQuery = useQuery({ queryKey: ["khata", id, "transactions"], queryFn: () => getKhataTransactions(id), enabled: Boolean(id) });
  const activitiesQuery = useQuery({ queryKey: ["khata", id, "activities"], queryFn: () => getKhataActivities(id), enabled: Boolean(id) });
  const khata = khataQuery.data;
  const type = Form.useWatch("type", form);
  const splitType = Form.useWatch("splitType", form);
  const splitMode = Form.useWatch("splitMode", form);
  const refresh = async () => { await queryClient.invalidateQueries({ queryKey: ["khatas"] }); await queryClient.invalidateQueries({ queryKey: ["khata", id] }); };
  const transactionMutation = useMutation({
    mutationFn: (values) => {
      const payload = { ...values, amount: toMinor(values.amount), transactionDate: values.transactionDate?.toISOString() || new Date().toISOString() };
      delete payload.splitMode;
      if (values.type === "expense" && values.splitType === "custom") {
        const [first, second] = khata.participants;
        payload.splitDetails = [
          { participant: first.userId, [values.splitMode === "percentage" ? "percentage" : "amount"]: values.firstSplit },
          { participant: second.userId, [values.splitMode === "percentage" ? "percentage" : "amount"]: values.secondSplit },
        ];
        if (values.splitMode !== "percentage") payload.splitDetails = payload.splitDetails.map((split) => ({ ...split, amount: toMinor(split.amount) }));
      }
      delete payload.firstSplit;
      delete payload.secondSplit;
      return editing ? updateKhataTransaction(id, editing._id, payload) : createKhataTransaction(id, payload);
    },
    onSuccess: async () => { await refresh(); await queryClient.invalidateQueries({ queryKey: ["khata", id, "transactions"] }); await queryClient.invalidateQueries({ queryKey: ["khata", id, "activities"] }); form.resetFields(); setEditing(null); setOpen(false); },
  });
  const archiveTransactionMutation = useMutation({ mutationFn: (transactionId) => archiveKhataTransaction(id, transactionId), onSuccess: async () => { await refresh(); await queryClient.invalidateQueries({ queryKey: ["khata", id, "transactions"] }); await queryClient.invalidateQueries({ queryKey: ["khata", id, "activities"] }); } });
  const archiveKhataMutation = useMutation({ mutationFn: () => archiveKhata(id), onSuccess: refresh });
  const participantOptions = (khata?.participants || []).map((participant) => ({ value: participant.userId, label: participant.name }));
  const openCreate = () => { setEditing(null); form.resetFields(); form.setFieldsValue({ type: "expense", splitType: "equal", splitMode: "amount", transactionDate: dayjs(), paidBy: khata?.participants?.[0]?.userId }); setOpen(true); };
  const openEdit = (record) => { setEditing(record); form.setFieldsValue({ ...record, amount: record.amount / 100, transactionDate: dayjs(record.transactionDate), splitMode: record.splitDetails?.some((split) => split.percentage !== undefined) ? "percentage" : "amount", firstSplit: record.splitDetails?.[0]?.percentage ?? (record.splitDetails?.[0]?.amount || 0) / 100, secondSplit: record.splitDetails?.[1]?.percentage ?? (record.splitDetails?.[1]?.amount || 0) / 100 }); setOpen(true); };
  const columns = [
    { title: "Date", dataIndex: "transactionDate", render: (date) => dayjs(date).format("DD MMM YYYY") },
    { title: "Type", dataIndex: "type", render: (value) => <Tag color={value === "settlement" ? "green" : value === "expense" ? "blue" : "gold"}>{value}</Tag> },
    { title: "Amount", dataIndex: "amount", render: (value) => money(value, khata?.currency) },
    { title: "Paid by", dataIndex: "paidBy", render: (value) => khata?.participants?.find((participant) => participant.userId === value)?.name || "-" },
    { title: "Received by", dataIndex: "paidTo", render: (value) => khata?.participants?.find((participant) => participant.userId === value)?.name || "-" },
    { title: "Description", dataIndex: "description", render: (value) => value || "-" },
    { title: "Action", render: (_, record) => <Space><Button onClick={() => openEdit(record)}>Edit</Button><Popconfirm title="Archive this transaction?" onConfirm={() => archiveTransactionMutation.mutate(record._id)}><Button danger loading={archiveTransactionMutation.isPending}>Archive</Button></Popconfirm></Space> },
  ];

  if (khataQuery.isLoading) return <Card loading />;
  if (!khata) return <Text type="danger">Khata was not found.</Text>;
  const summary = khata.summary;
  const balanceText = summary.outstandingBalance ? `${summary.owing.name} owes ${summary.receiver.name} ${money(summary.outstandingBalance, khata.currency)}` : "Khata is settled.";

  return <div style={{ maxWidth: 1280, margin: "0 auto" }}>
    <Flex justify="space-between" align="center" wrap="wrap" gap={16} className="animate-fade-in"><div><Title level={2} className="gradient-text" style={{ margin: 0 }}>{khata.title}</Title><Text style={{ color: "var(--text-dim)" }}>{khata.description || "Shared ledger"}</Text></div><Space><Popconfirm title="Delete this Khata?" description="It will be removed from your active list, but financial history will be kept." onConfirm={() => archiveKhataMutation.mutate()}><Button danger loading={archiveKhataMutation.isPending}>Delete Khata</Button></Popconfirm><Button type="primary" icon={<PlusOutlined />} onClick={openCreate} disabled={khata.archived}>Add Transaction</Button></Space></Flex>
    <Card className="glass-card" style={{ marginTop: 24 }}><Descriptions size="small" column={{ xs: 1, sm: 2, lg: 4 }} items={[{ key: "participants", label: "Participants", children: khata.participants.map((participant) => participant.name).join(" and ") }, { key: "currency", label: "Currency", children: khata.currency }, { key: "status", label: "Status", children: <Tag color={khata.status === "settled" ? "green" : "blue"}>{khata.status}</Tag> }, { key: "balance", label: "Current balance", children: <Text strong>{balanceText}</Text> }]} /></Card>
    <Row gutter={[16, 16]} style={{ marginTop: 8 }}>{summary.participantTotals.map((participant) => <Col xs={24} md={12} key={participant.userId}><Card className="glass-card"><Title level={4}>{participant.name}</Title><Space size="large"><Statistic title="Paid" value={money(participant.paid, khata.currency)} /><Statistic title="Received" value={money(participant.received, khata.currency)} /></Space></Card></Col>)}<Col xs={24} md={12}><Card className="glass-card"><Statistic title="Shared expenses" value={money(summary.totalSharedExpenses, khata.currency)} /></Card></Col><Col xs={24} md={12}><Card className="glass-card"><Statistic title="Settlements" value={money(summary.totalSettlements, khata.currency)} /></Card></Col></Row>
    <Card className="glass-card" style={{ marginTop: 24 }} title="Transactions"><Table rowKey="_id" dataSource={transactionsQuery.data || []} loading={transactionsQuery.isLoading} columns={columns} pagination={false} scroll={{ x: 1000 }} /></Card>
    <Card className="glass-card" style={{ marginTop: 24 }} title="Activity"><Timeline items={(activitiesQuery.data || []).map((activity) => ({ children: <><Text strong>{activity.action.replaceAll("_", " ")}</Text><br /><Text type="secondary">{dayjs(activity.createdAt).format("DD MMM YYYY, h:mm A")}</Text></> }))} /></Card>
    <Modal title={editing ? "Edit transaction" : "Add transaction"} open={open} onCancel={() => setOpen(false)} onOk={() => form.submit()} confirmLoading={transactionMutation.isPending} okText={editing ? "Update" : "Add"}><Form form={form} layout="vertical" onFinish={(values) => transactionMutation.mutate(values)}>
      <Form.Item name="type" label="Transaction type" rules={[{ required: true }]}><Select options={[{ value: "payment", label: "Payment" }, { value: "expense", label: "Shared expense" }, { value: "adjustment", label: "Adjustment" }, { value: "settlement", label: "Settlement" }]} /></Form.Item>
      <Form.Item name="amount" label="Amount" rules={[{ required: true, message: "Enter an amount" }]}><InputNumber min={0.01} precision={2} style={{ width: "100%" }} /></Form.Item>
      <Form.Item name="paidBy" label={type === "expense" ? "Paid by" : "Payer"} rules={[{ required: true }]}><Select options={participantOptions} /></Form.Item>
      {type !== "expense" ? <Form.Item name="paidTo" label="Received by" rules={[{ required: true }]}><Select options={participantOptions} /></Form.Item> : <><Form.Item name="splitType" label="Expense split" rules={[{ required: true }]}><Select options={[{ value: "equal", label: "Equal split" }, { value: "full", label: "Full expense for one participant" }, { value: "custom", label: "Custom split" }]} /></Form.Item>{splitType === "full" ? <Form.Item name="expenseFor" label="Expense is for" rules={[{ required: true }]}><Select options={participantOptions} /></Form.Item> : null}{splitType === "custom" ? <><Form.Item name="splitMode" label="Custom split method"><Select options={[{ value: "amount", label: "Amounts" }, { value: "percentage", label: "Percentages" }]} /></Form.Item><Row gutter={12}><Col span={12}><Form.Item name="firstSplit" label={khata.participants[0].name} rules={[{ required: true }]}><InputNumber min={0} precision={splitMode === "percentage" ? 2 : 2} style={{ width: "100%" }} addonAfter={splitMode === "percentage" ? "%" : undefined} /></Form.Item></Col><Col span={12}><Form.Item name="secondSplit" label={khata.participants[1].name} rules={[{ required: true }]}><InputNumber min={0} precision={2} style={{ width: "100%" }} addonAfter={splitMode === "percentage" ? "%" : undefined} /></Form.Item></Col></Row></> : null}</>}
      <Form.Item name="transactionDate" label="Date" rules={[{ required: true }]}><DatePicker style={{ width: "100%" }} /></Form.Item><Form.Item name="description" label={type === "adjustment" ? "Reason" : "Description"} rules={type === "adjustment" ? [{ required: true, message: "A reason is required for adjustments" }] : []}><Input.TextArea rows={3} /></Form.Item>{transactionMutation.error ? <Text type="danger">{transactionMutation.error.message || "Unable to save transaction."}</Text> : null}
    </Form></Modal>
  </div>;
}
