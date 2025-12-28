import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./components/QueryProvider";
import { ConfigProvider, theme } from "antd";
// import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Pilot - Premium Task Management",
  description:
    "Advanced task management with a premium glassmorphic interface.",
};

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
          <QueryProvider>{children}</QueryProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
