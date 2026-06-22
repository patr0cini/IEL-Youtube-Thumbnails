/** Botão reutilizável com variantes (primary/ghost) e tamanhos. */
export default function Button({
  children,
  variant = 'ghost',
  size = 'md',
  block = false,
  className = '',
  ...rest
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size === 'lg' && 'btn--lg',
    block && 'btn--block',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
