"use client";

import { Form } from "antd";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../../public/API/category";
import {
  createSubCategory,
  getSubCategory,
  updateSubCategory,
} from "../../../public/API/subCategory";
import { createVideo, getVideos, updateVideo } from "../../../public/API/video";

const LIST_OPTIONS = {
  page: 1,
  size: 100,
  sort: "createdAt:-1",
};

const PAGE_COPY = {
  category: {
    title: "Categories",
    description: "Create and review the top-level media categories.",
    buttonLabel: "Create Category",
    emptyText: "No categories created yet.",
  },
  "sub-category": {
    title: "Sub Categories",
    description: "Manage the sub categories linked to each category.",
    buttonLabel: "Create Sub Category",
    emptyText: "No sub categories created yet.",
  },
  videos: {
    title: "Videos",
    description: "Manage video records, category mapping, and sub category links.",
    buttonLabel: "Create Video",
    emptyText: "No videos created yet.",
  },
};

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

const normalizeVideoPayload = (values: any) => ({
  ...values,
  url: values.url
    .split(/\r?\n|,/)
    .map((item: string) => item.trim())
    .filter(Boolean),
});

const useLibraryManagementPage = (type: "category" | "sub-category" | "videos") => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const queryClient = useQueryClient();

  const isCategoryPage = type === "category";
  const isSubCategoryPage = type === "sub-category";
  const isVideoPage = type === "videos";
  const pageCopy = PAGE_COPY[type];

  const categoryQuery = useQuery({
    queryKey: ["categories", "options"],
    queryFn: () => getCategory(LIST_OPTIONS),
    enabled: isSubCategoryPage || isVideoPage,
  });

  const subCategoryQuery = useQuery({
    queryKey: ["sub-categories", "options"],
    queryFn: () =>
      getSubCategory({
        ...LIST_OPTIONS,
        populate: "category",
      }),
    enabled: isVideoPage,
  });

  const listingQuery = useQuery({
    queryKey: [type, "list"],
    queryFn: () => {
      if (isCategoryPage) {
        return getCategory(LIST_OPTIONS);
      }

      if (isSubCategoryPage) {
        return getSubCategory({
          ...LIST_OPTIONS,
          populate: "category",
        });
      }

      return getVideos({
        ...LIST_OPTIONS,
        populate: "category subCategory",
      });
    },
  });

  const selectedCategory = Form.useWatch("category", form);

  const categoryOptions = useMemo(
    () =>
      (categoryQuery.data?.data || []).map((item: any) => ({
        label: item.name,
        value: item._id,
      })),
    [categoryQuery.data],
  );

  const subCategoryOptions = useMemo(() => {
    const items = subCategoryQuery.data?.data || [];

    return items
      .filter((item: any) => {
        if (!selectedCategory) return true;
        return getIds(item.category).includes(selectedCategory);
      })
      .map((item: any) => ({
        label: item.name,
        value: item._id,
      }));
  }, [selectedCategory, subCategoryQuery.data]);

  const closeModal = () => {
    form.resetFields();
    setEditingRecord(null);
    setIsModalOpen(false);
  };

  const openCreateModal = () => {
    setEditingRecord(null);
    form.resetFields();
    form.setFieldValue("highlights", false);
    setIsModalOpen(true);
  };

  const openEditModal = (record: any) => {
    setEditingRecord(record);
    form.resetFields();

    if (isCategoryPage) {
      form.setFieldsValue({
        name: record.name,
        img: record.img,
        description: record.description,
      });
    } else if (isSubCategoryPage) {
      form.setFieldsValue({
        category: getIds(record.category),
        name: record.name,
        img: record.img,
        description: record.description,
      });
    } else {
      form.setFieldsValue({
        label: record.label,
        category: getId(record.category),
        subCategory: (record.subCategory || []).map((item: any) => getId(item)),
        img: record.img,
        url: (record.url || []).join("\n"),
        description: record.description,
        highlights: Boolean(record.highlights),
      });
    }

    setIsModalOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async (values: any) => {
      const payload = isVideoPage ? normalizeVideoPayload(values) : values;

      if (editingRecord?._id) {
        if (isCategoryPage) return updateCategory(editingRecord._id, payload);
        if (isSubCategoryPage) {
          return updateSubCategory(editingRecord._id, payload);
        }
        return updateVideo(editingRecord._id, payload);
      }

      if (isCategoryPage) return createCategory(payload);
      if (isSubCategoryPage) return createSubCategory(payload);
      return createVideo(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [type, "list"] });

      if (isCategoryPage) {
        await queryClient.invalidateQueries({ queryKey: ["categories"] });
      }

      if (isSubCategoryPage) {
        await queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
      }

      closeModal();
    },
  });

  const handleSubmit = (values: any) => {
    saveMutation.mutate(values);
  };

  const handleCategoryChange = () => {
    form.setFieldValue("subCategory", []);
  };

  return {
    type,
    pageCopy,
    form,
    isModalOpen,
    editingRecord,
    listingData: listingQuery.data?.data || [],
    isListingLoading: listingQuery.isLoading,
    categoryOptions,
    subCategoryOptions,
    isCategoryOptionsLoading: categoryQuery.isLoading,
    isSubCategoryOptionsLoading: subCategoryQuery.isLoading,
    isSavePending: saveMutation.isPending,
    saveError: saveMutation.error as Error | null,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    handleCategoryChange,
  };
};

export default useLibraryManagementPage;
