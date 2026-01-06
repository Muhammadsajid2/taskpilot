import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./components/QueryProvider";
import { App, ConfigProvider, theme } from "antd";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Pilot - Premium Task Management",
  description:
    "Advanced task management with a premium glassmorphic interface.",
};

import AuthGuard from "./components/AuthGuard";

import AntdGlobalProvider from "./components/AntdGlobalProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: "#3b82f6",
              borderRadius: 8,
              colorBgContainer: "rgba(255, 255, 255, 0.05)",
              colorTextBase: "#f8fafc",
              colorBgBase: "#0f172a",
            },
            components: {
              Input: {
                colorBgContainer: "rgba(0, 0, 0, 0.2)",
                colorBorder: "rgba(255, 255, 255, 0.1)",
              },
              Button: {
                colorPrimary: "#3b82f6",
                colorPrimaryHover: "#2563eb",
              },
            },
          }}
        >
          <App>
            <AntdGlobalProvider>
              <QueryProvider>
                <AuthGuard>{children}</AuthGuard>
              </QueryProvider>
            </AntdGlobalProvider>
          </App>
        </ConfigProvider>
      </body>
    </html>
  );
}
