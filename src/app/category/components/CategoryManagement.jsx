"use client";

import React from "react";
import LibraryManagementPage from "../../components/LibraryManagementPage";
import usePage from "../hooks/usePage";

const CategoryManagement = () => {
  const page = usePage();

  return <LibraryManagementPage {...page} />;
};

export default CategoryManagement;
