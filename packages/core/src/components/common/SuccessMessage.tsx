interface SuccessMessageProps {
  message: string | undefined;
}

export default function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div className="success-message" role="status">
      <span>{message}</span>
    </div>
  );
}
