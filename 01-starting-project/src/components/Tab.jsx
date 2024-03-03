import Article from "./Article";

export default function Tab({ title, description, children, ...props }) {
  return (
    <div {...props}>
      <Article title={title} description={description} headingSize="3">
          {children}
      </Article>
    </div>
  );
}
