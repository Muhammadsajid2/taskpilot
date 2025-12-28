"use client";

import { Card, DatePicker, Flex, Typography, Button } from "antd";
import Link from "next/link";

const { Title, Text } = Typography;

export default function Home() {
  return (
    <Flex justify="center" align="center" vertical style={{ minHeight: "100vh", padding: "20px" }} gap={24}>
      <div className="glass-card animate-slide-up" style={{ padding: "60px", textAlign: "center", maxWidth: "600px" }}>
        <Title className="gradient-text">Task Pilot</Title>
        <Text style={{ fontSize: "18px", color: "var(--text-dim)", display: "block", marginBottom: "32px" }}>
          The advanced, premium way to pilot your tasks to completion.
        </Text>
        <Flex gap={16} justify="center">
          <Link href="/login">
            <Button type="primary" size="large">Get Started</Button>
          </Link>
          <Link href="/dashboard">
            <Button size="large">View Dashboard</Button>
          </Link>
        </Flex>
      </div>
      
      <div className="glass-card animate-fade-in" style={{ padding: "24px" }}>
        <Flex align="center" gap={12}>
          <Text style={{ color: "var(--text-dim)" }}>Select a launch date:</Text>
          <DatePicker />
        </Flex>
      </div>
    </Flex>
  );
}
