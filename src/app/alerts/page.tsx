import DashboardLayout from "@/app/components/DashboardLayout";
import React from "react";
import AlertsManagement from "./components/AlertsManagement";

const AlertsPage = () => {
  return (
    <DashboardLayout>
      <AlertsManagement />
    </DashboardLayout>
  );
};

export default AlertsPage;
