import React from "react";
import {Link} from "react-router-dom";

export default function LandingPage(){
    return (
        <div>
            <h1>Welcome to my Countries Page</h1>
            <Link to="/countries">
                <button>Home</button>
            </Link>
        </div>
    )
}