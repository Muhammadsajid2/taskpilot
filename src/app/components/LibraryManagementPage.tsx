"use client";

import React, { useMemo } from "react";
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export type PageType = "category" | "sub-category" | "videos";

const getId = (value: any) => {
  if (!value) return "";
  return typeof value === "string" ? value : value._id || "";
};

const getIds = (value: any) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => getId(item)).filter(Boolean);
  const id = getId(value);
  return id ? [id] : [];
};

const formatDate = (value: string) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const renderExternalLink = (value: string) => {
  if (!value) return "-";

  return (
    <a
      href={value}
      target="_blank"
      rel="noreferrer"
      style={{ color: "#93c5fd" }}
    >
      {value}
    </a>
  );
};

const LibraryManagementPage = ({
  type,
  pageCopy,
  form,
  isModalOpen,
  editingRecord,
  listingData,
  isListingLoading,
  categoryOptions,
  subCategoryOptions,
  isCategoryOptionsLoading,
  isSubCategoryOptionsLoading,
  isSavePending,
  saveError,
  openCreateModal,
  openEditModal,
  closeModal,
  handleSubmit,
  handleCategoryChange,
}: any) => {
  const isCategoryPage = type === "category";
  const isSubCategoryPage = type === "sub-category";
  const isVideoPage = type === "videos";

  const columns = useMemo(() => {
    if (isCategoryPage) {
      return [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Image",
          dataIndex: "img",
          key: "img",
          render: renderExternalLink,
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
          render: (value: string) => value || "-",
        },
        {
          title: "Created",
          dataIndex: "createdAt",
          key: "createdAt",
          render: formatDate,
        },
        {
          title: "Action",
          key: "action",
          render: (_: unknown, record: any) => (
            <Button onClick={() => openEditModal(record)}>Edit</Button>
          ),
        },
      ];
    }

    if (isSubCategoryPage) {
      return [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Categories",
          dataIndex: "category",
          key: "category",
          render: (value: any) => {
            const items = Array.isArray(value) ? value : value ? [value] : [];

            if (!items.length) return "-";

            return (
              <Space size={[6, 6]} wrap>
                {items.map((item: any) => (
                  <Tag
                    key={getId(item) || item?.name}
                    color="geekblue"
                    style={{ borderRadius: 999 }}
                  >
                    {item?.name || item}
                  </Tag>
                ))}
              </Space>
            );
          },
        },
        {
          title: "Image",
          dataIndex: "img",
          key: "img",
          render: renderExternalLink,
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
          render: (value: string) => value || "-",
        },
        {
          title: "Created",
          dataIndex: "createdAt",
          key: "createdAt",
          render: formatDate,
        },
        {
          title: "Action",
          key: "action",
          render: (_: unknown, record: any) => (
            <Button onClick={() => openEditModal(record)}>Edit</Button>
          ),
        },
      ];
    }

    return [
      {
        title: "Label",
        dataIndex: "label",
        key: "label",
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        render: (value: any) => value?.name || "-",
      },
      {
        title: "Sub Categories",
        dataIndex: "subCategory",
        key: "subCategory",
        render: (value: any[]) => {
          if (!value?.length) return "-";

          return (
            <Space size={[6, 6]} wrap>
              {value.map((item: any) => (
                <Tag
                  key={getId(item) || item?.name}
                  color="blue"
                  style={{ borderRadius: 999 }}
                >
                  {item?.name || item}
                </Tag>
              ))}
            </Space>
          );
        },
      },
      {
        title: "Video URLs",
        dataIndex: "url",
        key: "url",
        render: (value: string[]) => {
          if (!value?.length) return "-";

          return (
            <Space direction="vertical" size={4}>
              {value.map((item) => (
                <span key={item}>{renderExternalLink(item)}</span>
              ))}
            </Space>
          );
        },
      },
      {
        title: "Highlight",
        dataIndex: "highlights",
        key: "highlights",
        render: (value: boolean) =>
          value ? <Tag color="green">Yes</Tag> : <Tag>No</Tag>,
      },
      {
        title: "Created",
        dataIndex: "createdAt",
        key: "createdAt",
        render: formatDate,
      },
      {
        title: "Action",
        key: "action",
        render: (_: unknown, record: any) => (
          <Button onClick={() => openEditModal(record)}>Edit</Button>
        ),
      },
    ];
  }, [isCategoryPage, isSubCategoryPage, openEditModal]);

  const modalTitle = editingRecord
    ? isCategoryPage
      ? "Update Category"
      : isSubCategoryPage
        ? "Update Sub Category"
        : "Update Video"
    : isCategoryPage
      ? "Create Category"
      : isSubCategoryPage
        ? "Create Sub Category"
        : "Create Video";

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <Flex vertical gap={24}>
        <Flex
          justify="space-between"
          align="center"
          gap={16}
          wrap="wrap"
          className="animate-fade-in"
        >
          <div>
            <Title level={2} className="gradient-text" style={{ margin: 0 }}>
              {pageCopy.title}
            </Title>
            <Text style={{ color: "var(--text-dim)" }}>{pageCopy.description}</Text>
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={openCreateModal}
          >
            {pageCopy.buttonLabel}
          </Button>
        </Flex>

        <Card className="glass-card animate-slide-up" variant="borderless">
          <Table
            rowKey={(record: any) => record._id}
            loading={isListingLoading}
            dataSource={listingData || []}
            columns={columns}
            pagination={false}
            locale={{ emptyText: pageCopy.emptyText }}
            scroll={{ x: 900 }}
          />
        </Card>
      </Flex>

      <Modal
        title={modalTitle}
        open={isModalOpen}
        onCancel={closeModal}
        onOk={() => form.submit()}
        okText={editingRecord ? "Update" : "Create"}
        confirmLoading={isSavePending}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ highlights: false }}
        >
          {isCategoryPage && (
            <>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter category name" }]}
              >
                <Input placeholder="Enter category name" />
              </Form.Item>
              <Form.Item
                label="Image URL"
                name="img"
                rules={[{ required: true, message: "Please enter image URL" }]}
              >
                <Input placeholder="https://example.com/category-image.png" />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <TextArea rows={4} placeholder="Short description" />
              </Form.Item>
            </>
          )}

          {isSubCategoryPage && (
            <>
              <Form.Item
                label="Categories"
                name="category"
                rules={[{ required: true, message: "Please select categories" }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select categories"
                  options={categoryOptions}
                  loading={isCategoryOptionsLoading}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter sub category name" }]}
              >
                <Input placeholder="Enter sub category name" />
              </Form.Item>
              <Form.Item
                label="Image URL"
                name="img"
                rules={[{ required: true, message: "Please enter image URL" }]}
              >
                <Input placeholder="https://example.com/sub-category-image.png" />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <TextArea rows={4} placeholder="Short description" />
              </Form.Item>
            </>
          )}

          {isVideoPage && (
            <>
              <Form.Item
                label="Label"
                name="label"
                rules={[{ required: true, message: "Please enter video label" }]}
              >
                <Input placeholder="Enter video label" />
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select
                  placeholder="Select category"
                  options={categoryOptions}
                  loading={isCategoryOptionsLoading}
                  showSearch
                  optionFilterProp="label"
                  onChange={handleCategoryChange}
                />
              </Form.Item>
              <Form.Item
                label="Sub Categories"
                name="subCategory"
                rules={[{ required: true, message: "Please select sub categories" }]}
                extra="You can select multiple sub categories for one video."
              >
                <Select
                  mode="multiple"
                  placeholder="Select sub categories"
                  options={subCategoryOptions}
                  loading={isSubCategoryOptionsLoading}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>
              <Form.Item
                label="Image URL"
                name="img"
                rules={[{ required: true, message: "Please enter image URL" }]}
              >
                <Input placeholder="https://example.com/video-thumbnail.png" />
              </Form.Item>
              <Form.Item
                label="Video URLs"
                name="url"
                rules={[{ required: true, message: "Please enter at least one video URL" }]}
                extra="Add one URL per line or separate multiple URLs with commas."
              >
                <TextArea
                  rows={4}
                  placeholder={"https://example.com/video-1\nhttps://example.com/video-2"}
                />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <TextArea rows={4} placeholder="Short description" />
              </Form.Item>
              <Form.Item
                label="Highlights"
                name="highlights"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </>
          )}

          {saveError ? (
            <Paragraph type="danger" style={{ marginBottom: 0 }}>
              {saveError?.message || "Unable to save item."}
            </Paragraph>
          ) : null}
        </Form>
      </Modal>
    </div>
  );
};

export default LibraryManagementPage;
