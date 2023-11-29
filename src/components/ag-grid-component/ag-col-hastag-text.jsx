import React, { Component } from 'react';
const AgColHastagComp = ({ props }) => {
  return (
    <>
      <span>{new Array(parseInt(props.value, 10)).fill("#").join("")}</span>
    </>
  );
};

export default AgColHastagComp;
