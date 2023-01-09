import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function Router() {
  return (
    <div className="Router">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>ReactGram 2</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
