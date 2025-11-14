import { IoRefresh } from 'react-icons/io5';
import { useStretchContext } from '../context/StretchContext';

export default function ResetButton() {
  const { reset } = useStretchContext();
  return (
    <button className="reset-btn btn" onClick={reset}>
      <IoRefresh />
      <span>Reset</span>
    </button>
  );
}
