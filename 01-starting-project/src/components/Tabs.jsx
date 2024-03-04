import { Children, useState } from "react";

export default function Tabs({ children }) {
  const [ selectedIndex, setSelectedIndex ] = useState(0)

  function handleButtonClick(index) {
    setSelectedIndex(index)
  }

  const tabButtons = Children.map(children, (child, index) => (
    <li>
      <button
        className={index == selectedIndex ? 'active' : undefined}
        onClick={() => handleButtonClick(index)}>
        {child.props.name}
      </button>
    </li>
  ))

  return (
    <>
      <menu>{tabButtons}</menu>
      {children[selectedIndex]}
    </>
  );
}
