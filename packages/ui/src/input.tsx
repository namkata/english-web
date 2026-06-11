import * as React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/** Themed text input with focus ring; forwards ref for react-hook-form. */
const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={[
        'w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm',
        'placeholder:text-gray-400 outline-none transition-shadow',
        'focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
});

export { Input };
export type { InputProps };
