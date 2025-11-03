import AppInfo from "./AppInfo";
import GlobalProgressBar from "./GlobalProgressBar";
import RestartButton from "./RestartButton";

export default function GlobalSection() {
  return (
    <section className="section global-section">
      <div className="global-section__top">
        <AppInfo />
        <RestartButton />
      </div>
      <GlobalProgressBar />
    </section>
  );
}
