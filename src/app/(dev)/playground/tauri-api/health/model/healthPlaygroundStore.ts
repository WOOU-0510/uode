"use client";

import { invoke } from "@tauri-apps/api/core";
import { toErrorMessage } from "@/shared/utils";
import { createStore } from "@/shared/lib/zustand";
import { isTauriRuntime } from "@/shared/lib/tauri";

export type HealthAppMetadata = {
  name: string;
  version: string;
  platform: string;
};

export type HealthPlaygroundState = {
  greetMsg: string;
  name: string;
  pingResult: string;
  metadata: HealthAppMetadata | null;
  addA: string;
  addB: string;
  addResult: number | null;
  echoMessage: string;
  echoTimes: string;
  echoResult: string;
  invokeError: string;
  setName: (value: string) => void;
  setAddA: (value: string) => void;
  setAddB: (value: string) => void;
  setEchoMessage: (value: string) => void;
  setEchoTimes: (value: string) => void;
  clearInvokeError: () => void;
  runInvoke: (fn: () => Promise<void>) => void;
  callGreet: () => Promise<void>;
  callPing: () => Promise<void>;
  callGetAppMetadata: () => Promise<void>;
  callAdd: () => Promise<void>;
  callEcho: () => Promise<void>;
};

export const {
  StoreProvider: HealthPlaygroundStoreProvider,
  useShallowPick: useHealthPlaygroundShallowPick,
} = createStore<HealthPlaygroundState>((set, get) => ({
  greetMsg: "",
  name: "",
  pingResult: "",
  metadata: null,
  addA: "2",
  addB: "3",
  addResult: null,
  echoMessage: "uode",
  echoTimes: "2",
  echoResult: "",
  invokeError: "",
  setName: (value) => set({ name: value }),
  setAddA: (value) => set({ addA: value }),
  setAddB: (value) => set({ addB: value }),
  setEchoMessage: (value) => set({ echoMessage: value }),
  setEchoTimes: (value) => set({ echoTimes: value }),
  clearInvokeError: () => set({ invokeError: "" }),
  runInvoke: (fn) => {
    if (!isTauriRuntime()) {
      set({ invokeError: "Tauri 데스크톱 앱에서만 invoke가 동작합니다." });
      return;
    }
    set({ invokeError: "" });
    void fn().catch((err: unknown) =>
      set({ invokeError: toErrorMessage(err) }),
    );
  },
  callGreet: async () => {
    const name = get().name;
    const message = await invoke<string>("greet", { name });
    set({ greetMsg: message });
  },
  callPing: async () => {
    const result = await invoke<string>("ping");
    set({ pingResult: result });
  },
  callGetAppMetadata: async () => {
    const data = await invoke<HealthAppMetadata>("get_app_metadata");
    set({ metadata: data });
  },
  callAdd: async () => {
    const { addA, addB } = get();
    const a = Number(addA);
    const b = Number(addB);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      set({ invokeError: "add: 숫자를 입력하세요." });
      return;
    }
    const sum = await invoke<number>("add", { a, b });
    set({ addResult: sum });
  },
  callEcho: async () => {
    const { echoMessage, echoTimes } = get();
    const timesRaw = echoTimes.trim();
    const timesParsed = timesRaw === "" ? undefined : Number(timesRaw);
    if (timesParsed !== undefined && Number.isNaN(timesParsed)) {
      set({ invokeError: "echo: times는 숫자여야 합니다." });
      return;
    }
    const payload =
      timesParsed === undefined
        ? { message: echoMessage }
        : { message: echoMessage, times: timesParsed };
    const out = await invoke<string>("echo", { payload });
    set({ echoResult: out });
  },
}));
