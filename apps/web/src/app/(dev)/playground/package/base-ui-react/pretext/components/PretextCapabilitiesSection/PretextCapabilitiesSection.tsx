import styles from "./PretextCapabilitiesSection.module.scss";

type PretextCapabilitiesSectionProps = Record<string, never>;

export const PretextCapabilitiesSection = (
  props: PretextCapabilitiesSectionProps,
) => {
  const {} = props;

  return (
    <section
      className={styles.section}
      aria-labelledby="pretext-capabilities-heading"
    >
      <h2 id="pretext-capabilities-heading">이걸로 무엇이 가능해지나</h2>
      <div className={styles.prose}>
        <ul className={styles.introList}>
          <li>
            <strong>가상 스크롤·가림 처리</strong>: 행 높이를 DOM 없이 미리 알
            수 있어 스크롤 영역·스크롤바 추정이 쉬워집니다.
          </li>
          <li>
            <strong>채팅 말풍선</strong>: 남은 너비에 맞춰 줄이 바뀌는 “shrink
            wrap” 폭을 <code>walkLineRanges</code> 등으로 탐색할 수 있습니다.
          </li>
          <li>
            <strong>Canvas / SVG / WebGL</strong>: 줄 단위 문자열(
            <code>layoutWithLines</code>)이나 줄 단위 이터레이터(
            <code>layoutNextLine</code>)로 직접 그립니다.
          </li>
          <li>
            <strong>편집·잡지형 레이아웃</strong>: 줄마다 다른 사용 가능 너비(
            <code>layoutNextLine</code>)로 도형·이미지 주변을 감싸 흐르게 할 수
            있습니다(공식 데모 수준은 별도 기하 계산과 결합).
          </li>
          <li>
            <strong>개발 시 검증</strong>: 버튼 라벨이 한 줄에 들어가는지 등을
            브라우저 레이아웃 없이 빠르게 확인하는 용도.
          </li>
        </ul>
        <p className={styles.proseNote}>
          서버(SSR)에서는 Canvas가 없어 이 패키지의 측정은 돌아가지 않습니다. 이
          프로젝트의 React 훅은 클라이언트에서만 측정하도록 되어 있습니다.
        </p>
      </div>
    </section>
  );
};
