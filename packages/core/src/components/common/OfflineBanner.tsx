import useOnlineStatus from '../../hooks/useOnlineStatus';

export default function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="warning-message" role="status">
      <span>You are offline. Options that require internet access are disabled.</span>
    </div>
  );
}
