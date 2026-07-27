"use client";

import { Skeleton } from "@uode/base-ui-react";
import { ExamplePage, ExampleSection } from "../components/examplePage";
import styles from "./page.module.scss";

type SkeletonPageProps = Record<string, never>;

const SkeletonPage = (props: SkeletonPageProps) => {
  const {} = props;

  return (
    <ExamplePage
      title="Skeleton"
      description="pulse와 shimmer를 적용한 로딩 placeholder"
    >
      <ExampleSection
        title="기본 형태 · no className"
        description="기본 Skeleton은 aria-hidden인 빈 div이며 크기와 애니메이션을 강제하지 않습니다."
      >
        <div>
          <Skeleton />
          <code>&lt;div data-skeleton aria-hidden=&quot;true&quot; /&gt;</code>
        </div>
      </ExampleSection>

      <ExampleSection
        title="커스텀 형태"
        description="@uode/styles mixin의 duration과 색상을 조절한 pulse 카드와 shimmer 목록입니다."
      >
        <div className={styles.skeletonGrid}>
          <article
            className={styles.profileSkeleton}
            aria-busy="true"
            aria-label="프로필을 불러오는 중"
          >
            <Skeleton className={styles.avatarSkeleton} />
            <div>
              <Skeleton className={styles.titleSkeleton} />
              <Skeleton className={styles.lineSkeleton} />
              <Skeleton className={styles.shortLineSkeleton} />
            </div>
          </article>
          <div
            className={styles.listSkeleton}
            aria-busy="true"
            aria-label="목록을 불러오는 중"
            role="status"
          >
            {[0, 1, 2].map((item) => (
              <Skeleton className={styles.shimmerSkeleton} key={item} />
            ))}
          </div>
        </div>
      </ExampleSection>
    </ExamplePage>
  );
};

export default SkeletonPage;
