export default function Tab({ name, children, ...props }) {
  return (
    <div {...props}>
      {children}
    </div>
  );
}
