import { Fragment } from "react";
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
          <Section title="Core Concepts" id="core-concepts">
            {CORE_CONCPETS.map((coreConcept, index) => <CoreConcept key={index} {...coreConcept} />)}
          </Section>
          <Section title="Examples" container={Fragment} id="examples">
            <Tabs>
              {EXAMPLES.map((example, index) => (
                <Tab id="tab-content" key={index} title={example.title} description={example.description}>
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
