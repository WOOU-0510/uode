"use client";

import { invoke } from "@tauri-apps/api/core";
import Link from "next/link";
import React from "react";
import { isTauriRuntime } from "@/shared/lib/tauri/window";

type AppMetadata = {
  name: string;
  version: string;
  platform: string;
};

function getInvokeErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  return "알 수 없는 오류";
}

const PreviewPage = () => {
  const [greetMsg, setGreetMsg] = React.useState("");
  const [name, setName] = React.useState("");
  const [pingResult, setPingResult] = React.useState("");
  const [metadata, setMetadata] = React.useState<AppMetadata | null>(null);
  const [addA, setAddA] = React.useState("2");
  const [addB, setAddB] = React.useState("3");
  const [addResult, setAddResult] = React.useState<number | null>(null);
  const [echoMessage, setEchoMessage] = React.useState("uode");
  const [echoTimes, setEchoTimes] = React.useState("2");
  const [echoResult, setEchoResult] = React.useState("");
  const [invokeError, setInvokeError] = React.useState("");

  const clearError = () => setInvokeError("");

  async function callGreet() {
    clearError();
    const message = await invoke<string>("greet", { name });
    setGreetMsg(message);
  }

  async function callPing() {
    clearError();
    const result = await invoke<string>("ping");
    setPingResult(result);
  }

  async function callGetAppMetadata() {
    clearError();
    const data = await invoke<AppMetadata>("get_app_metadata");
    setMetadata(data);
  }

  async function callAdd() {
    clearError();
    const a = Number(addA);
    const b = Number(addB);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      setInvokeError("add: 숫자를 입력하세요.");
      return;
    }
    const sum = await invoke<number>("add", { a, b });
    setAddResult(sum);
  }

  async function callEcho() {
    clearError();
    const timesRaw = echoTimes.trim();
    const timesParsed = timesRaw === "" ? undefined : Number(timesRaw);
    if (timesParsed !== undefined && Number.isNaN(timesParsed)) {
      setInvokeError("echo: times는 숫자여야 합니다.");
      return;
    }
    const payload =
      timesParsed === undefined
        ? { message: echoMessage }
        : { message: echoMessage, times: timesParsed };
    const out = await invoke<string>("echo", { payload });
    setEchoResult(out);
  }

  const runInvoke = (fn: () => Promise<void>) => {
    if (!isTauriRuntime()) {
      setInvokeError("Tauri 데스크톱 앱에서만 invoke가 동작합니다.");
      return;
    }
    void fn().catch((e: unknown) => setInvokeError(getInvokeErrorMessage(e)));
  };

  return (
    <main className="container">
      <p>
        <Link href="/">← 홈</Link>
      </p>
      <h1>Preview (개발·학습)</h1>
      <p>
        Tauri <code>invoke</code> 및 UI 실험용. 본 제품 기능과 무관 — Rust 쪽은{" "}
        <code>src-tauri/src/lab/</code>에만 연결되어 있습니다.
      </p>

      {invokeError ? (
        <p role="alert" style={{ color: "crimson" }}>
          {invokeError}
        </p>
      ) : null}

      <section style={{ marginTop: "1.5rem" }}>
        <h2>greet</h2>
        <p>문자열 인자 → 문자열 응답</p>
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            runInvoke(callGreet);
          }}
        >
          <input
            id="greet-input"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>
        {greetMsg ? <p>{greetMsg}</p> : null}
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>ping</h2>
        <p>인자 없음 → 고정 문자열</p>
        <button type="button" onClick={() => runInvoke(callPing)}>
          Ping
        </button>
        {pingResult ? <p>결과: {pingResult}</p> : null}
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>get_app_metadata</h2>
        <p>앱 이름·버전·플랫폼 (Rust AppHandle)</p>
        <button type="button" onClick={() => runInvoke(callGetAppMetadata)}>
          메타데이터 가져오기
        </button>
        {metadata ? (
          <pre style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
            {JSON.stringify(metadata, null, 2)}
          </pre>
        ) : null}
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>add</h2>
        <p>숫자 두 개</p>
        <div className="row" style={{ flexWrap: "wrap", gap: "0.5rem" }}>
          <input
            aria-label="a"
            value={addA}
            onChange={(e) => setAddA(e.currentTarget.value)}
            inputMode="numeric"
          />
          <span>+</span>
          <input
            aria-label="b"
            value={addB}
            onChange={(e) => setAddB(e.currentTarget.value)}
            inputMode="numeric"
          />
          <button type="button" onClick={() => runInvoke(callAdd)}>
            더하기
          </button>
        </div>
        {addResult !== null ? <p>결과: {addResult}</p> : null}
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>echo</h2>
        <p>
          객체 인자 — Rust 파라미터 이름이 <code>payload</code>이므로{" "}
          <code>invoke(&quot;echo&quot;, {"{"} payload: {"{"} message, times {"}"} {"}"})</code>
        </p>
        <div
          className="row"
          style={{ flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}
        >
          <input
            value={echoMessage}
            onChange={(e) => setEchoMessage(e.currentTarget.value)}
            placeholder="message"
            aria-label="echo message"
          />
          <input
            value={echoTimes}
            onChange={(e) => setEchoTimes(e.currentTarget.value)}
            placeholder="times (1–5, 생략 시 1)"
            aria-label="echo times"
            style={{ minWidth: "12rem" }}
          />
          <button type="button" onClick={() => runInvoke(callEcho)}>
            Echo
          </button>
        </div>
        {echoResult ? <p style={{ wordBreak: "break-all" }}>{echoResult}</p> : null}
      </section>
    </main>
  );
};

export default PreviewPage;
