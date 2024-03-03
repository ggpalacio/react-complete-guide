export default function Section({title, container="ul", children, ...props}) {
    const Container = container
    return (
      <section {...props}>
          <h2>{title}</h2>
          <Container>
              {children}
          </Container>
      </section>
    )
}