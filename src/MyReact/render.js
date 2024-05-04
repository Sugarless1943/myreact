let nextUnitWork = null;

function perforUnitOfWork(fiber) {
  if (!fiber.dom) fiber.dom = createDom(fiber);

  if (fiber.parent) fiber.parent.dom.append(fiber.dom);

  const elements = fiber.props.children;

  let prevFiber = null;
  elements.forEach((element, index) => {
    const newFiber = {
      parent: fiber,
      dom: null,
      props: element.props,
      type: element.type,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevFiber.sibling = newFiber;
    }

    prevFiber = newFiber;
  });

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }

    nextFiber = nextFiber.parent;
  }
}

function workloop(deadline) {
  if (nextUnitWork && deadline.timeRemaining() > 1) {
    nextUnitWork = perforUnitOfWork(nextUnitWork);
  }

  requestIdleCallback(workloop);
}
requestIdleCallback(workloop);

function createDom(element) {
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

  return dom;
}

function render(element, container) {
  nextUnitWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

export default render;
