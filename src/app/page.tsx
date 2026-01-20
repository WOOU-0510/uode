"use client";

import { invoke } from "@tauri-apps/api/core";
import React from "react";

const HomePage = () => {
  const [greetMsg, setGreetMsg] = React.useState("");
  const [name, setName] = React.useState("");

  async function greet() {
    // 클라이언트 런타임에서만 Tauri API를 로드해서 (SSR/빌드 단계에서) 안전하게 동작하게 합니다.
    const message = await invoke<string>("greet", { name });
    setGreetMsg(message);
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + Next.js (App Router)</h1>

      <p>아래 입력창에서 Rust 커맨드(`greet`)를 호출해보세요.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          void greet();
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

      <p>{greetMsg}</p>
    </main>
  );
};

export default HomePage;
