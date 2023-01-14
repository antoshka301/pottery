import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";

function Error() {
    return <>
        Oops! This page doesn't exist. Try navigating back to the home page.
    </>
}

export default Error;