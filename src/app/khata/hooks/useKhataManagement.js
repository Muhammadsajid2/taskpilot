"use client";

import { Form } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { archiveKhata, createKhata, getKhataParticipants, getKhatas } from "../../../../public/API/khata";

const toMinor = (amount) => Math.round(Number(amount || 0) * 100);

export default function useKhataManagement() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const khatasQuery = useQuery({ queryKey: ["khatas"], queryFn: getKhatas });
  const participantsQuery = useQuery({ queryKey: ["khata-participants"], queryFn: () => getKhataParticipants() });
  const createMutation = useMutation({
    mutationFn: (values) => createKhata({
      ...values,
      openingBalance: values.openingBalance ? toMinor(values.openingBalance) : undefined,
      openingBalanceDirection: values.openingBalance ? values.openingBalanceDirection : undefined,
    }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["khatas"] });
      form.resetFields();
      setOpen(false);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: archiveKhata,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["khatas"] });
    },
  });

  return {
    form,
    open,
    setOpen,
    khatas: khatasQuery.data || [],
    isLoading: khatasQuery.isLoading,
    participants: (participantsQuery.data || []).map((user) => ({ value: user._id, label: `${user.name}${user.email ? ` (${user.email})` : ""}` })),
    participantsLoading: participantsQuery.isLoading,
    createKhata: (values) => createMutation.mutate(values),
    isSaving: createMutation.isPending,
    deleteKhata: (id) => deleteMutation.mutate(id),
    isDeleting: deleteMutation.isPending,
    error: createMutation.error,
  };
}
