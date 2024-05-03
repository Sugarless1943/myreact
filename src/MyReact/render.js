function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode(element.props.nodeValue)
      : document.createElement(element.type);

  const propKeys = Object.keys(element.props);
  if (propKeys?.length > 0) {
    Object.keys(element.props)
      .filter((item) => item !== "children")
      .forEach((item) => {
        dom[item] = element.props[item];
      });
  }

  element?.props?.children.forEach((item) => render(item, dom));

  container.appendChild(dom);
}

export default render;
