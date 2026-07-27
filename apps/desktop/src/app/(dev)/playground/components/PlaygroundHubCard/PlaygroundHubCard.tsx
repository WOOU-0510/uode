import Link from "next/link";
import type * as React from "react";
import type { PlaygroundNavHref } from "@/app/(dev)/playground/config";
import styles from "./PlaygroundHubCard.module.scss";

type PlaygroundHubCardProps = {
  href: PlaygroundNavHref;
  title: string;
  description: React.ReactNode;
};

export const PlaygroundHubCard = (props: PlaygroundHubCardProps) => {
  const { href, title, description } = props;

  return (
    <Link className={styles.card} href={href}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardDesc}>{description}</p>
    </Link>
  );
};
