# @uode/styles

프레임워크나 컴포넌트에 종속되지 않는 공통 Sass 도구입니다.

## Animation

```scss
@use "pkg:@uode/styles/animation" as animation;
```

모듈을 불러오면 필요한 keyframes가 한 번 출력되며 다음 mixin을 사용할 수 있습니다.

| Mixin | 주요 옵션 |
| --- | --- |
| `fade-in` | `$duration`, `$timing-function`, `$delay`, `$from`, `$to` |
| `fade-out` | `$duration`, `$timing-function`, `$delay`, `$from`, `$to` |
| `slide-in` | `$x`, `$y`, `$duration`, `$timing-function`, `$delay` |
| `slide-out` | `$x`, `$y`, `$duration`, `$timing-function`, `$delay` |

모든 mixin은 `prefers-reduced-motion: reduce`에서 재생 시간을 `1ms`로 줄입니다.

### Fade

```scss
.backdrop[data-state="open"] {
  @include animation.fade-in(
    $duration: 280ms,
    $timing-function: ease-out,
    $from: 0,
    $to: 0.5
  );
}

.backdrop[data-state="closed"] {
  @include animation.fade-out(
    $duration: 180ms,
    $timing-function: ease-in,
    $from: 0.5
  );
}
```

### Slide

`$x`와 `$y`에는 길이, 백분율 또는 CSS custom property를 전달할 수 있습니다.

```scss
.sheet[data-state="open"] {
  @include animation.slide-in(
    $x: 100%,
    $y: 0,
    $duration: var(--sheet-duration, 280ms),
    $timing-function: cubic-bezier(0.22, 1, 0.36, 1)
  );
}

.sheet[data-state="closed"] {
  @include animation.slide-out(
    $x: 100%,
    $y: 0,
    $duration: var(--sheet-duration, 220ms)
  );
}
```

퇴장 애니메이션을 표시하려면 애니메이션이 끝날 때까지 DOM을 유지해야 합니다. React에서는
`animationend`에서 닫힘 상태를 확정하는 방식으로 구성할 수 있습니다.
