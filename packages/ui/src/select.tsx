import * as React from 'react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
}

/**
 * Native select with app styling. Pass `options` or render <option> children.
 * Forwards ref for react-hook-form.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, options, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={[
        'w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm',
        'outline-none transition-shadow focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {options
        ? options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))
        : children}
    </select>
  );
});

export { Select };
export type { SelectProps, SelectOption };
