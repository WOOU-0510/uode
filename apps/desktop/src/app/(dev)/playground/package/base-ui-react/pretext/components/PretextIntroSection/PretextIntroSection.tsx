import styles from "./PretextIntroSection.module.scss";

type PretextIntroSectionProps = Record<string, never>;

export const PretextIntroSection = (props: PretextIntroSectionProps) => {
  const {} = props;

  return (
    <section className={styles.section} aria-labelledby="pretext-intro-heading">
      <h2 id="pretext-intro-heading">Pretext가 하는 일 (개념)</h2>

      <div className={styles.prose}>
        <p>
          <a
            href="https://github.com/chenglou/pretext"
            rel="noreferrer"
            target="_blank"
          >
            <code>@chenglou/pretext</code>
          </a>
          (
          <a
            href="https://chenglou.me/pretext/"
            rel="noreferrer"
            target="_blank"
          >
            라이브 데모
          </a>
          )는 브라우저가 제공하는 글꼴 엔진(Canvas <code>measureText</code>{" "}
          등)으로 글자 폭을 재고,{" "}
          <strong>DOM에 텍스트를 붙여 넣고 너비를 재는 방식</strong>(예:{" "}
          <code>getBoundingClientRect</code>, 숨은 엘리먼트 측정)을 피해서{" "}
          <strong>여러 줄 줄바꿈·레이아웃을 계산</strong>하는 라이브러리입니다.
        </p>

        <p>
          DOM 측정은 레이아웃(reflow)을 자주 일으켜 비용이 큽니다. Pretext는{" "}
          <strong>한 번 무거운 준비</strong>(<code>prepare</code> /{" "}
          <code>prepareWithSegments</code>)를 한 뒤, 폭이 바뀔 때마다{" "}
          <strong>가벼운 순수 계산</strong>(<code>layout</code>,{" "}
          <code>layoutWithLines</code>, <code>layoutNextLine</code> 등)만
          반복하는 구조입니다.
        </p>

        <h3 className={styles.proseSubhead}>두 단계를 나누는 이유</h3>
        <ul className={styles.introList}>
          <li>
            <code>prepare</code>: 공백 정리, 세그먼트 분할, Canvas로 폭 캐시까지
            (같은 문자열·같은 <code>font</code>면 다시 하지 않는 것이 핵심).
          </li>
          <li>
            <code>layout</code>: 캐시된 폭으로 줄 나눔·높이만 계산. 창 크기만
            바뀌면 이쪽만 돌리면 됩니다.
          </li>
        </ul>

        <h3 className={styles.proseSubhead}>공식 데모와 비슷한 “드래그”</h3>
        <p>
          상단 레이아웃 데모(예: chenglou.me/pretext)에서는 이미지·도형을 옮기면{" "}
          <code>layoutNextLine</code>으로{" "}
          <strong>줄마다 다른 사용 가능 너비</strong>를 주며 텍스트를 이어
          붙입니다. 이 페이지의 <strong>플로트 박스</strong> 예시도 같은 패턴의
          축소판입니다(한 줄씩 너비를 바꿔가며 다음 줄을 뽑음).
        </p>

        <h3 className={styles.proseSubhead}>주의 (README 요약)</h3>
        <ul className={styles.introList}>
          <li>
            CSS와 맞추려면 <code>font</code> 문자열과 <code>lineHeight</code>를
            실제 스타일과 동기화하세요.
          </li>
          <li>
            macOS에서 <code>system-ui</code> 단독 지정은 측정 오차가 날 수 있어
            named font stack을 권장합니다.
          </li>
          <li>
            기본은 <code>white-space: normal</code>,{" "}
            <code>overflow-wrap: break-word</code> 류 동작에 가깝습니다.{" "}
            <code>pre-wrap</code>은 옵션으로 지원합니다.
          </li>
        </ul>
      </div>
    </section>
  );
};
