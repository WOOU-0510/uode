import {
  createStoreCore,
  type StoreCore,
} from "../store";

export type ButtonSnapshot = {
  disabled: boolean;
  /** 토글 버튼(`aria-pressed`) 등에서 사용합니다. */
  pressed: boolean;
};

export type ButtonStoreOptions = {
  initialDisabled?: boolean;
  initialPressed?: boolean;
};

/**
 * `useSyncExternalStore`에 넘길 수 있는 버튼 상태 스토어.
 * 포커스·DOM ref·키보드 이벤트 해석은 React 측에서 다루고, 여기서는 공유 스냅샷만 둡니다.
 */
export type ButtonStore = {
  getSnapshot: () => ButtonSnapshot;
  subscribe: StoreCore<ButtonSnapshot>["subscribe"];
  setDisabled: (disabled: boolean) => void;
  setPressed: (pressed: boolean) => void;
  togglePressed: () => void;
};

const defaultSnapshot = (): ButtonSnapshot => ({
  disabled: false,
  pressed: false,
});

export function createButtonStore(
  options: ButtonStoreOptions = {},
  initialSnapshot?: ButtonSnapshot,
): ButtonStore {
  const base = initialSnapshot ?? defaultSnapshot();
  const core = createStoreCore<ButtonSnapshot>({
    disabled: options.initialDisabled ?? base.disabled,
    pressed: options.initialPressed ?? base.pressed,
  });

  return {
    getSnapshot: core.getSnapshot,
    subscribe: core.subscribe,
    setDisabled: (disabled) => {
      core.updateSnapshot((prev) => {
        if (prev.disabled === disabled) return prev;
        return { ...prev, disabled };
      });
    },
    setPressed: (pressed) => {
      core.updateSnapshot((prev) => {
        if (prev.pressed === pressed) return prev;
        return { ...prev, pressed };
      });
    },
    togglePressed: () => {
      core.updateSnapshot((prev) => {
        if (prev.disabled) return prev;
        return { ...prev, pressed: !prev.pressed };
      });
    },
  };
}
