import React from 'react';
import ReactDOM from 'react-dom/client';

const element = React.createElement(
  'div',
  {
    title: 'halo',
  },
  'wtf'
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(element);
