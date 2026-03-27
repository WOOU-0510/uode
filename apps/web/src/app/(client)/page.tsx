"use client";

type HomePageProps = Record<string, never>;

const HomePage = (props: HomePageProps) => {
  const {} = props;
  return (
    <main className="container">
      <h1>uode</h1>
      <p>홈 화면</p>
    </main>
  );
};

export default HomePage;
