import React from 'react';
import './App.scss';
import {Posts} from "./pages/posts/posts";
import {Route, Routes} from "react-router-dom";
import {Statistics} from "./pages/statistics/statistics";
import {Navbar} from "./components/navbar/navbar";
import {Home} from "./pages/home/home";

const App = () => {
    return (
       <div className="h-screen">
           <Navbar />
            <Routes>
                <Route path="/posts" element={<Posts />}/>
                <Route path="/statistics" element={<Statistics />}/>
                <Route path="/" element={<Home />}/>
            </Routes>
       </div>
    );
};

export default App;