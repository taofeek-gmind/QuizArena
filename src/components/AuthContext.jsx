import './auth-shell.css'

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  footer,
  children,
}) {
  return (
    <main className="auth-shell">
      <svg
        className="arena-rings"
        viewBox="0 0 420 420"
        aria-hidden="true"
      >
        <circle className="ring ring-1" cx="210" cy="210" r="150" />
        <circle className="ring ring-2" cx="210" cy="210" r="115" />
        <circle className="ring ring-3" cx="210" cy="210" r="80" />
      </svg>

      <div className="auth-shell-inner">
        <header className="auth-header">
          <p className="auth-eyebrow">{eyebrow}</p>
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>
        </header>

        <section className="auth-panel">
          {children}
        </section>

        {footer ? <footer className="auth-footer">{footer}</footer> : null}
      </div>
    </main>
  )
}
