import { IoRefresh } from 'react-icons/io5';
import { useStretchContext } from '../context/StretchContext';

export default function RestartButton() {
  const { restart } = useStretchContext();
  return (
    <button className="restart-btn btn" onClick={restart}>
      <IoRefresh />
      <span>Restart</span>
    </button>
  );
}
