import React, { useState, useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
function App() {
  return (
    <>
        <Outlet />
    </>
  );
}

export default App;
