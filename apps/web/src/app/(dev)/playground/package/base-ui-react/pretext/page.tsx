"use client";

import {
  PretextAccordionSection,
  PretextBasicDemoSection,
  PretextCapabilitiesSection,
  PretextDragFloatDemo,
  PretextIntroSection,
  PretextShrinkWrapDemo,
} from "./components";
import styles from "./page.module.scss";

type BaseUiReactPretextPlaygroundPageProps = Record<string, never>;

const BaseUiReactPretextPlaygroundPage = (
  props: BaseUiReactPretextPlaygroundPageProps,
) => {
  const {} = props;

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>package / base-ui-react / pretext</h1>
        <p>
          <code>@chenglou/pretext</code>를 <code>@uode/base-ui-core</code>에서
          감싼 뒤 <code>@uode/base-ui-react</code> 훅으로 노출한
          플레이그라운드입니다.
        </p>
      </header>

      <PretextIntroSection />
      <PretextCapabilitiesSection />
      <PretextBasicDemoSection />
      <PretextDragFloatDemo />
      <PretextShrinkWrapDemo />
      <PretextAccordionSection />
    </main>
  );
};

export default BaseUiReactPretextPlaygroundPage;
