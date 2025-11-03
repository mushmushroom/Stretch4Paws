import { IoRefresh } from "react-icons/io5";

export default function RestartButton() {
  return (
    <button className="restart-btn btn">
      <IoRefresh />
      <span>Reset</span>
    </button>
  );
}
