import { request } from "../utils/request";

export const getKhatas = () => request({ url: "/khatas", method: "GET" });
export const getKhata = (id) => request({ url: `/khatas/${id}`, method: "GET" });
export const getKhataParticipants = (search = "") => request({ url: "/khatas/participants", method: "GET", params: { search } });
export const createKhata = (data) => request({ url: "/khatas", method: "POST", data });
export const archiveKhata = (id) => request({ url: `/khatas/${id}/archive`, method: "POST" });
export const getKhataTransactions = (id) => request({ url: `/khatas/${id}/transactions`, method: "GET" });
export const getKhataActivities = (id) => request({ url: `/khatas/${id}/activities`, method: "GET" });
export const createKhataTransaction = (id, data) => request({ url: `/khatas/${id}/transactions`, method: "POST", data });
export const updateKhataTransaction = (id, transactionId, data) => request({ url: `/khatas/${id}/transactions/${transactionId}`, method: "PATCH", data });
export const archiveKhataTransaction = (id, transactionId) => request({ url: `/khatas/${id}/transactions/${transactionId}`, method: "DELETE" });
