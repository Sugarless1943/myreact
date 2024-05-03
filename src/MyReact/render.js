let nextUnitOfWork = null;

function perforUnitOfWork(fiber) {
  // 创建真实dom
  if (!fiber.dom) fiber.dom = createDom(fiber);

  if (fiber.parent) fiber.parent.dom.appendChild(fiber.dom);

  // 为子节点创建Fiber
  const elements = fiber.props.children;
  let prevSibling = null;
  elements.forEach((item, index) => {
    const newFiber = {
      parent: fiber,
      props: item.props,
      type: item.type,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
  });

  // return 下一个fiber
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

function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = perforUnitOfWork(nextUnitOfWork);
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

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
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

export default render;
