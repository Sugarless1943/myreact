import React from "react";
import ReactDOM from "react-dom/client";
import MyReact from "./MyReact";

const element = MyReact.createElement(
  "div",
  {
    title: "halo",
  },
  "wtf",
  MyReact.createElement(
    "div",
    null,
    MyReact.createElement("a", null, "a标签"),
    MyReact.createElement("h1", null, "哈哈哈哈哈")
  )
);

const container = document.getElementById("root");
MyReact.render(element, container);
