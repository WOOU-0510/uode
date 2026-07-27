import Link from "next/link";
import type * as React from "react";
import styles from "./examplePage.module.scss";

type ExamplePageProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export const ExamplePage = (props: ExamplePageProps) => {
  const { title, description, children } = props;

  return (
    <main className={styles.page}>
      <Link
        className={styles.backLink}
        href="/playground/package/base-ui-react/form"
      >
        ← Form primitives
      </Link>
      <header className={styles.pageHeader}>
        <span className={styles.eyebrow}>@uode/base-ui-react</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      {children}
    </main>
  );
};

type ExampleSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export const ExampleSection = (props: ExampleSectionProps) => {
  const { title, description, children } = props;

  return (
    <section className={styles.section}>
      <header>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className={styles.exampleBody}>{children}</div>
    </section>
  );
};
