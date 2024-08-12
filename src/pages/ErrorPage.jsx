import React from "react";
import errorImg from "../assets/images/not-found-icon.jpg";

const ErrorPage = () => {
    return (
        <section className="max-width flex flex-col items-center justify-center min-h-[50vh]">
            <img className="size-32" src={errorImg} alt="error image" />
            <h1>404, Oops! Page not found!</h1>
        </section>
    );
};

export default ErrorPage;
