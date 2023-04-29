const LoadingSpinner: React.FC<{ message?: string }> = ({
  message = "Loading",
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="42"
        className="mb-2 animate-spin text-gray-600"
      >
        <path
          fill="currentColor"
          d="M208 0V96l96 0V0H208zM0 208v96H96V208H0zM208 512h96V416H208v96zM512 208H416v96h96V208zM41 403.1L108.9 471l67.9-67.9-67.9-67.9L41 403.1zm362 67.9L471 403.1l-67.9-67.9-67.9 67.9L403.1 471zM41 108.9l67.9 67.9 67.9-67.9L108.9 41 41 108.9z"
        />
      </svg>
      <span className="text-md">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
