export const primaryButton = (extraClasses: string[] = []) => {
  return [
    'bg-blue-700',
    'dark:bg-blue-600',
    'dark:focus:ring-blue-800',
    'dark:hover:bg-blue-700',
    'focus:outline-none',
    'focus:ring-4',
    'focus:ring-blue-300',
    'font-medium',
    'hover:bg-blue-800',
    'mb-2',
    'mr-2',
    'px-5',
    'py-2.5',
    'rounded-lg',
    'text-sm',
    'text-white',
    ...extraClasses,
  ].join(' ');
};
