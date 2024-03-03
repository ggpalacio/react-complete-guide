export default function Tab({ title, description, children, ...props }) {
  return (
    <div {...props}>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
}
