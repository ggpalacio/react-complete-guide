import { Children, useState, use } from "react";

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
        {child.props.title}
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
