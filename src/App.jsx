import React, { useState, useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
function App() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
