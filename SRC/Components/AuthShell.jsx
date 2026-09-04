import './auth-shell.css'

// A quiet signature element: three concentric rings, evoking a stadium
// viewed from above / a target being hit. Used once, low-opacity, behind
// the headline — not repeated elsewhere as decoration.
function ArenaRings() {
return (
<svg  
className="arena-rings"  
viewBox="0 0 400 400"  
aria-hidden="true"  
focusable="false"  
>
<circle cx="200" cy="200" r="190" className="ring ring-1" />
<circle cx="200" cy="200" r="140" className="ring ring-2" />
<circle cx="200" cy="200" r="90" className="ring ring-3" />
</svg>
)
}

export default function AuthShell({ eyebrow, title, subtitle, children, footer }) {
return (
<div className="auth-shell">
<ArenaRings />
<div className="auth-shell-inner">
<div className="auth-header">
{eyebrow ? <p className="auth-eyebrow">{eyebrow}</p> : null}
<h1 className="auth-title">{title}</h1>
{subtitle ? <p className="auth-subtitle">{subtitle}</p> : null}
</div>

<div className="auth-panel">{children}</div>  

    {footer ? <div className="auth-footer">{footer}</div> : null}  
  </div>  
</div>

)
}
