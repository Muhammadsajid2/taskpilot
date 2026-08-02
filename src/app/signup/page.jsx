"use client";

import { Button, Checkbox, Form, Input, Typography } from "antd";
import { ArrowRightOutlined, LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
const styles = new Proxy({}, { get: (_target, key) => String(key) });

const { Title, Text } = Typography;

export default function SignupForm() {
  const onFinish = (values) => console.log("Signup values:", values);

  return (
    <main className={styles.authPage}>
      <div className={styles.orbOne} /><div className={styles.orbTwo} />
      <Link href="/" className={styles.brand}><span>TP</span>Task Pilot</Link>
      <section className={styles.authShell}>
        <div className={styles.formSide}>
          <div className={styles.formInner}>
            <span className={styles.eyebrow}><i />START YOUR WORKSPACE</span>
            <Title level={1} className={styles.title}>Work with more<br /><em>clarity.</em></Title>
            <Text className={styles.subtitle}>Create your Task Pilot account and bring every priority into focus.</Text>
            <Form name="signup_form" layout="vertical" onFinish={onFinish} requiredMark={false} className={styles.form}>
              <Form.Item label="Full name" name="name" rules={[{ required: true, message: "Enter your full name" }]}><Input prefix={<UserOutlined />} placeholder="Your name" size="large" /></Form.Item>
              <Form.Item label="Email address" name="email" rules={[{ required: true, type: "email", message: "Enter a valid email address" }]}><Input prefix={<MailOutlined />} placeholder="name@company.com" size="large" autoComplete="email" /></Form.Item>
              <Form.Item label="Password" name="password" rules={[{ required: true, message: "Choose a password" }]}><Input.Password prefix={<LockOutlined />} placeholder="Create a password" size="large" autoComplete="new-password" /></Form.Item>
              <Form.Item name="agree" valuePropName="checked" rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error("Please accept the terms")) }]} className={styles.terms}><Checkbox>I agree to the <Link href="#">Terms &amp; Conditions</Link></Checkbox></Form.Item>
              <Button type="primary" htmlType="submit" block size="large" className={styles.submitButton}>Create account <ArrowRightOutlined /></Button>
            </Form>
            <p className={styles.switchText}>Already have an account? <Link href="/login">Sign in</Link></p>
          </div>
        </div>
        <aside className={styles.visualSide} aria-label="Task Pilot workspace preview">
          <div className={styles.visualCopy}><span>ONE PLACE. EVERY ESSENTIAL.</span><h2>Build a calmer,<br />more <em>productive</em> day.</h2></div>
          <div className={styles.workspace3d}>
            <div className={styles.workspaceTop}><b>Workspace overview</b><span>Live</span></div>
            <div className={styles.statRow}><div><small>ACTIVE TASKS</small><b>24</b></div><div><small>COMPLETED</small><b>78%</b></div><div><small>UPDATES</small><b>12</b></div></div>
            <div className={styles.workspaceTask}><i className={styles.done} /><div><b>Organize project content</b><small>Completed today</small></div><span>✓</span></div>
            <div className={styles.workspaceTask}><i /><div><b>Review weekly finances</b><small>Due tomorrow</small></div><span>•••</span></div>
            <div className={styles.workspaceFooter}><div><small>WORKFLOW HEALTH</small><b>Everything is on track</b></div><div className={styles.ring}>✓</div></div>
          </div>
          <div className={styles.floatingBadge}><UserOutlined /><span><b>Made for your momentum</b><small>Tasks, content, finance, and updates.</small></span></div>
        </aside>
      </section>
    </main>
  );
}
