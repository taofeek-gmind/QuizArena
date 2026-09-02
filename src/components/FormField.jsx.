export default function FormField({
id,
label,
type = 'text',
value,
onChange,
autoComplete,
placeholder,
error,
required = true,
minLength,
}) {
return (
<div className="form-field">
<label htmlFor={id}>{label}</label>
<input
id={id}
name={id}
type={type}
value={value}
onChange={onChange}
autoComplete={autoComplete}
placeholder={placeholder}
required={required}
minLength={minLength}
aria-invalid={error ? 'true' : 'false'}
aria-describedby={error ? ${id}-error : undefined}
/>
{error ? (
<p className="field-error" id={${id}-error}>
{error}
</p>
) : null}
</div>
)
}
