import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="w-full bg-gray-300 h-16 px-6 flex items-center mb-6">
            <Link className="mr-auto" to="/">
                <h1 className="text-2xl font-bold">FlowBlog</h1>
            </Link>
            <Link className="mr-8" to="/posts">Posts</Link>
            <Link to="/statistics">Statistics</Link>
        </nav>
    );
};

export { Navbar};