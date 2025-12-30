import "../../styles/floating.css";

export default function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  error,
}) {
  return (
    <div className={`floating-input ${value ? "has-value" : ""} ${error ? "error" : ""}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
      />
      <label>{label}</label>

      {error && <small className="helper-text error">{error}</small>}
    </div>
  );
}
