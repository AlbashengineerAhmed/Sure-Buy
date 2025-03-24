import React from "react";
import "./LoadingScreen.css";

export default function LoadingScreen() {
return (
    <div className="container background-loading">
    <div className="row">
        <div className="col-md-12">
            <div className="loader">
                <div className="loader-inner">
                    <div className="loading one"></div>
                </div>
                <div className="loader-inner">
                    <div className="loading two"></div>
                </div>
                <div className="loader-inner">
                    <div className="loading three"></div>
                </div>
                <div className="loader-inner">
                    <div className="loading four"></div>
                </div>
            </div>
        </div>
    </div>
    </div>
);
}
