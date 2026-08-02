import Link from "next/link";
import {
  ArrowRightOutlined,
  BellOutlined,
  CheckCircleFilled,
  FolderOpenOutlined,
  PlayCircleOutlined,
  ProjectOutlined,
  RiseOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import styles from "./page.module.css";

const modules = [
  {
    icon: <ProjectOutlined />,
    title: "Tasks that move",
    description: "Plan work, set priorities, and keep every deadline in view.",
    accent: "blue",
  },
  {
    icon: <FolderOpenOutlined />,
    title: "Organized content",
    description: "Keep categories, sub-categories, and video resources in one place.",
    accent: "purple",
  },
  {
    icon: <WalletOutlined />,
    title: "Khata at a glance",
    description: "Track balances, transactions, and activity without losing context.",
    accent: "orange",
  },
  {
    icon: <BellOutlined />,
    title: "Stay informed",
    description: "Send alerts and push notifications exactly when they matter.",
    accent: "green",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />

      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark}>TP</span>
          <span>Task Pilot</span>
        </Link>
        <div className={styles.navActions}>
          <Link href="/login" className={styles.loginLink}>Sign in</Link>
          <Link href="/login" className={styles.navButton}>Get started</Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}><span /> YOUR WORK, IN ONE CLEAR VIEW</div>
          <h1>Make every day<br /><em>move forward.</em></h1>
          <p>
            Task Pilot brings your tasks, content, finances, alerts, and team updates
            into one focused workspace.
          </p>
          <div className={styles.ctas}>
            <Link href="/login" className={styles.primaryCta}>
              Open workspace <ArrowRightOutlined />
            </Link>
            <Link href="/dashboard" className={styles.secondaryCta}>Explore dashboard</Link>
          </div>
          <div className={styles.trustLine}>
            <CheckCircleFilled /> Built for focused teams and fast-moving work
          </div>
        </div>

        <div className={styles.previewWrap} aria-label="Task Pilot dashboard preview">
          <div className={styles.previewTopbar}>
            <div className={styles.previewBrand}><span className={styles.tinyMark}>TP</span> Task Pilot</div>
            <div className={styles.previewDots}><i /><i /><i /></div>
          </div>
          <div className={styles.previewBody}>
            <aside className={styles.previewSidebar}>
              <span className={styles.activeNav} /><span /><span /><span /><span />
            </aside>
            <div className={styles.previewContent}>
              <div className={styles.previewHeading}>
                <div><small>MONDAY, 20 JULY</small><strong>Good morning, Sajid</strong></div>
                <span className={styles.avatar}>S</span>
              </div>
              <div className={styles.statGrid}>
                <div><small>MY TASKS</small><b>24</b><span className={styles.blueText}>+6 this week</span></div>
                <div><small>COMPLETED</small><b>78%</b><span className={styles.greenText}>On track</span></div>
                <div><small>UPDATES</small><b>12</b><span className={styles.purpleText}>New today</span></div>
              </div>
              <div className={styles.taskPanel}>
                <div className={styles.panelHeader}><strong>Today&apos;s priorities</strong><span>View all</span></div>
                <div className={styles.taskRow}><i className={styles.checked} /><span>Review category content</span><b>High</b></div>
                <div className={styles.taskRow}><i /><span>Prepare weekly overview</span><b className={styles.medium}>Medium</b></div>
                <div className={styles.taskRow}><i /><span>Schedule client update</span><b className={styles.low}>Low</b></div>
              </div>
              <div className={styles.progressCard}>
                <div><span>Weekly progress</span><b>16 of 24 done</b></div>
                <div className={styles.progressTrack}><span /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.moduleSection}>
        <div className={styles.sectionIntro}>
          <span>ONE PLACE. EVERY ESSENTIAL.</span>
          <h2>Everything your operation needs to stay on course.</h2>
        </div>
        <div className={styles.moduleGrid}>
          {modules.map((module) => (
            <article className={styles.moduleCard} key={module.title}>
              <div className={`${styles.moduleIcon} ${styles[module.accent]}`}>{module.icon}</div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <ArrowRightOutlined className={styles.cardArrow} />
            </article>
          ))}
        </div>
      </section>

      <section className={styles.bottomCta}>
        <div><RiseOutlined /><span>TURN CLARITY INTO MOMENTUM</span></div>
        <h2>Your next productive day starts here.</h2>
        <Link href="/login" className={styles.primaryCta}>Get started <ArrowRightOutlined /></Link>
      </section>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Task Pilot</span>
        <span>Work with purpose.</span>
      </footer>
    </main>
  );
}
