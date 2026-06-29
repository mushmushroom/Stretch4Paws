interface ErrorMessageProps {
  message: string | undefined | null;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert">
      <span>{message}</span>
    </div>
  );
}
