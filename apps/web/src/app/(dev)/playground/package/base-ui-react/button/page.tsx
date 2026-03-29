"use client";

import styles from "./page.module.scss";
import {
  ButtonBasicSection,
  ButtonControlledPressedSection,
  ButtonDisabledSection,
  ButtonPlaygroundPageHeader,
  ButtonToggleSection,
  ButtonTriggerDisabledSection,
} from "./components";

type BaseUiReactButtonPlaygroundPageProps = Record<string, never>;

const BaseUiReactButtonPlaygroundPage = (
  props: BaseUiReactButtonPlaygroundPageProps,
) => {
  const {} = props;

  return (
    <main className={styles.page}>
      <ButtonPlaygroundPageHeader />
      <ButtonBasicSection />
      <ButtonToggleSection />
      <ButtonDisabledSection />
      <ButtonControlledPressedSection />
      <ButtonTriggerDisabledSection />
    </main>
  );
};

export default BaseUiReactButtonPlaygroundPage;
