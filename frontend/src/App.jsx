import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ImageAnalysis from "./pages/ImageAnalysis";
import AudioAnalysis from "./pages/AudioAnalysis";
import MultimodalAnalysis from "./pages/MultimodalAnalysis";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home/>} />

                <Route path="/image" element={<ImageAnalysis/>} />

                <Route path="/audio" element={<AudioAnalysis/>} />

                <Route path="/multimodal" element={<MultimodalAnalysis/>} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;