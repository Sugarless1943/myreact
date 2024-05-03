import React from "react";
import ReactDOM from "react-dom/client";
import MyReact from "./MyReact";

console.log(MyReact);

const element = MyReact.createElement(
  "div",
  {
    title: "halo",
  },
  'wtf',
  MyReact.createElement('a', null, '我是a标签')
);

const container = document.getElementById("root");
MyReact.render(element, container);
