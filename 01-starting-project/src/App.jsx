import { Fragment } from "react";
import { CORE_CONCPETS, EXAMPLES } from "./data.js";
import reactEssentialsPng from './assets/react-core-concepts.png'
import Section from "./components/Section";
import Tabs from "./components/Tabs.jsx";
import Tab from "./components/Tab.jsx";
import Article from "./components/Article.jsx";

function App() {
  return (
    <div>
      <Article
        container="header"
        image={reactEssentialsPng}
        title="React Essentials"
        description="Core React concepts you will need for almost any app you are going to build!"
      />
      <main>
        <div>
          <Section title="Core Concepts" id="core-concepts">
            {CORE_CONCPETS.map((coreConcept, index) => <Article key={index} container="li" headingSize="3" {...coreConcept} />)}
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
