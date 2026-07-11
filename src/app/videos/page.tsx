import DashboardLayout from "@/app/components/DashboardLayout";
import React from "react";
import VideosManagement from "./components/VideosManagement";

const VideosPage = () => {
  return (
    <DashboardLayout>
      <VideosManagement />
    </DashboardLayout>
  );
};

export default VideosPage;
