import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Icon = ({ name, ...props }) => {
  return <i className={`bi bi-${name}`} {...props}></i>;
};

export default Icon;
