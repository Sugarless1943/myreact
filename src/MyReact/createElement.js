function createElement(type, props, ...child) {
  return {
    type,
    props: {
      ...props,
      children: child.map((item) => {
        return typeof item === "object" ? item : createTextElement(item);
      }),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

export default createElement;
