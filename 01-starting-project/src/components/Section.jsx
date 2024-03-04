import { Fragment } from "react";

export default function Section({title, container="ul", headingSize="1", noContainer=false, children, ...props}) {
    const Container = noContainer ? Fragment : container
    const Heading = "h" + headingSize
    return (
      <section {...props}>
          <Heading>{title}</Heading>
          <Container>{children}</Container>
      </section>
    )
}