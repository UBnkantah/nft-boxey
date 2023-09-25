import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePg from "./pages/HomePg";
import Collection from "./pages/Collection";
import CreateNft from "./pages/CreateNft";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePg />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/create-nft" element={<CreateNft />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
