"use client";

import { Button, Form, Input, Typography } from "antd";
import { ArrowRightOutlined, LockOutlined, MailOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import Link from "next/link";
import useLogin from "./hooks/useLogin";
const styles = new Proxy({}, { get: (_target, key) => String(key) });

const { Title, Text } = Typography;

export default function LoginForm() {
  const { onFinish, isUserLoginLoading } = useLogin();

  return (
    <main className={styles.authPage}>
      <div className={styles.orbOne} /><div className={styles.orbTwo} />
      <Link href="/" className={styles.brand}><span>TP</span>Task Pilot</Link>
      <section className={styles.authShell}>
        <div className={styles.formSide}>
          <div className={styles.formInner}>
            <span className={styles.eyebrow}><i />WELCOME BACK</span>
            <Title level={1} className={styles.title}>Back to your<br /><em>best work.</em></Title>
            <Text className={styles.subtitle}>Sign in to keep your tasks, updates, and priorities moving.</Text>
            <Form name="login_form" layout="vertical" onFinish={onFinish} requiredMark={false} className={styles.form}>
              <Form.Item label="Email address" name="email" rules={[{ required: true, type: "email", message: "Enter a valid email address" }]}>
                <Input prefix={<MailOutlined />} placeholder="name@company.com" size="large" autoComplete="email" />
              </Form.Item>
              <Form.Item label={<span className={styles.passwordLabel}>Password <Link href="#">Forgot password?</Link></span>} name="password" rules={[{ required: true, message: "Enter your password" }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" size="large" autoComplete="current-password" />
              </Form.Item>
              <Button type="primary" htmlType="submit" block size="large" loading={isUserLoginLoading} className={styles.submitButton}>
                Sign in to Task Pilot <ArrowRightOutlined />
              </Button>
            </Form>
            <p className={styles.switchText}>New to Task Pilot? <Link href="/signup">Create an account</Link></p>
          </div>
        </div>
        <aside className={styles.visualSide} aria-label="Task Pilot workspace preview">
          <div className={styles.visualCopy}><span>STAY IN CONTROL</span><h2>Your focus,<br />beautifully <em>organized.</em></h2></div>
          <div className={styles.workspace3d}>
            <div className={styles.workspaceTop}><b>Today&apos;s focus</b><span>3 tasks</span></div>
            <div className={styles.workspaceTask}><i className={styles.done} /><div><b>Plan the week ahead</b><small>High priority · 10:00 AM</small></div><span>•••</span></div>
            <div className={styles.workspaceTask}><i /><div><b>Review new content</b><small>In progress · 2:30 PM</small></div><span>•••</span></div>
            <div className={styles.workspaceTask}><i /><div><b>Send client update</b><small>Scheduled · 4:00 PM</small></div><span>•••</span></div>
            <div className={styles.workspaceFooter}><div><small>WEEKLY PROGRESS</small><b>72% complete</b></div><div className={styles.ring}>72</div></div>
          </div>
          <div className={styles.floatingBadge}><SafetyCertificateOutlined /><span><b>Everything in sync</b><small>One workspace. Clear momentum.</small></span></div>
        </aside>
      </section>
    </main>
  );
}
