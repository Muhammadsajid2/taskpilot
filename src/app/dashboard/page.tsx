"use client";

import React from "react";
import { Typography, Flex, Card, Statistic, Row, Col } from "antd";
import { RocketOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const DashBoard = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <Flex vertical gap={32}>
        <div className="animate-fade-in">
          <Title level={2} className="gradient-text" style={{ margin: 0 }}>Dashboard Overview</Title>
          <Text style={{ color: "var(--text-dim)" }}>Welcome back to your Task Pilot control center.</Text>
        </div>

        <Row gutter={[24, 24]} className="animate-slide-up">
          <Col xs={24} sm={8}>
            <Card className="glass-card" bordered={false}>
              <Statistic 
                title={<Text style={{ color: "var(--text-dim)" }}>Active Tasks</Text>}
                value={12} 
                prefix={<RocketOutlined style={{ color: "var(--primary)" }} />} 
                valueStyle={{ color: "#fff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="glass-card" bordered={false}>
              <Statistic 
                title={<Text style={{ color: "var(--text-dim)" }}>Completed</Text>}
                value={48} 
                prefix={<CheckCircleOutlined style={{ color: "#10b981" }} />} 
                valueStyle={{ color: "#fff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="glass-card" bordered={false}>
              <Statistic 
                title={<Text style={{ color: "var(--text-dim)" }}>Pending</Text>}
                value={4} 
                prefix={<ClockCircleOutlined style={{ color: "#f59e0b" }} />} 
                valueStyle={{ color: "#fff" }}
              />
            </Card>
          </Col>
        </Row>

        <Card className="glass-card animate-slide-up" style={{ minHeight: "300px" }} bordered={false}>
          <Flex justify="center" align="center" style={{ minHeight: "250px" }}>
            <Text style={{ color: "var(--text-dim)" }}>Detailed analytics and task list coming soon...</Text>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
};

export default DashBoard;
