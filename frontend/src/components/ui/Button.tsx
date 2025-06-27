import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 mr-2 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
  </svg>
);

const Button: React.FC<ButtonProps> = ({ loading, children, disabled, ...props }) => {
  return (
    <button
      disabled={loading || disabled}
      {...props}
      className={
        `${props.className || ""} relative flex items-center justify-center transition-colors disabled:opacity-60 disabled:cursor-not-allowed`
      }
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
};

export default Button; 