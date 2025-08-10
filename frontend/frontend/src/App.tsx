import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import PostList from "./pages/PostList";

function Navigation() {
  const navigate = useNavigate();
  return (
    <div style={{ marginBottom: 20 }}>
      <button onClick={() => navigate("/page1")}>Page 1</button>
      <button onClick={() => navigate("/page2")}>Page 2</button>
      <button onClick={() => navigate("/page3")}>Page 3</button>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/postlist" element={<PostList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
