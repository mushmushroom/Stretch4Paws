interface ErrorMessageProps {
  message: string | undefined | null;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <span>{message}</span>
    </div>
  );
}
