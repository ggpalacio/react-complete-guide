import { CORE_CONCPETS, EXAMPLES } from "./data.js";
import Section from "./components/Section";
import Tabs from "./components/Tabs.jsx";
import Tab from "./components/Tab.jsx";
import CoreConcept from "./components/CoreConcept.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <div>
      <Header />
      <main>
        <div>
          <Section title="Core Concepts" id="core-concepts" headingSize="2">
            {CORE_CONCPETS.map((coreConcept, index) => <CoreConcept key={index} {...coreConcept} />)}
          </Section>
          <Section title="Examples" noContainer headingSize="2" id="examples">
            <Tabs>
              {EXAMPLES.map((example, index) => (
                <Tab id="tab-content" key={index} name={example.title}>
                  <h3>{example.title}</h3>
                  <p>{example.description}</p>
                  <pre>
                    <code>{example.code}</code>
                  </pre>
                </Tab>
              ))}
            </Tabs>
          </Section>
        </div>
      </main>
    </div>
  );
}

export default App;
