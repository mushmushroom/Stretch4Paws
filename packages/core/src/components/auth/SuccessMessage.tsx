interface SuccessMessageProps {
  message: string | undefined;
}

export default function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div className="success-message">
      <span>{message}</span>
    </div>
  );
}
