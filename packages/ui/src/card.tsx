import * as React from 'react';

function cx(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(' ');
}

type DivProps = React.HTMLAttributes<HTMLDivElement>;

/** Rounded bordered surface used as the base container across the app. */
function Card({ className, ...props }: DivProps) {
  return <div className={cx('rounded-2xl border bg-white shadow-sm', className)} {...props} />;
}

function CardHeader({ className, ...props }: DivProps) {
  return <div className={cx('flex flex-col gap-1 p-5 pb-0', className)} {...props} />;
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cx('font-semibold leading-tight', className)} {...props} />;
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx('text-sm text-gray-500', className)} {...props} />;
}

function CardContent({ className, ...props }: DivProps) {
  return <div className={cx('p-5', className)} {...props} />;
}

function CardFooter({ className, ...props }: DivProps) {
  return <div className={cx('flex items-center p-5 pt-0', className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
