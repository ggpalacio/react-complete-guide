import If from "./if";

export default function Article({ image, title, description, container="article", children, headingSize = 1 }) {
  const Heading = "h" + headingSize;
  const Container = container

  return (
    <Container>
      <If test={image}>
        <img src={image} alt={title} />
      </If>
      <Heading>{title}</Heading>
      <p>{description}</p>
      {children}
    </Container>
  );
}
