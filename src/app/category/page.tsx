import DashboardLayout from "@/app/components/DashboardLayout";
import React from "react";
import CategoryManagement from "./components/CategoryManagement";

const CategoryPage = () => {
  return (
    <DashboardLayout>
      <CategoryManagement />
    </DashboardLayout>
  );
};

export default CategoryPage;
