import React from "react";
import Helmet from "react-helmet";
import NavBar from "../NavBar";
import Footer from "../Footer/Footer";
import "./style.css";

function ContactUs() {
    return (
        <>
            <Helmet>
                <title>Contact Us | EduNode</title>
                <meta name="description" content="Get in touch with the EduNode team — questions, feedback, and support for the Web3 learning platform." />
            </Helmet>
            <NavBar />
            <div className="contactus container py-5">
                <h1>Contact Us</h1>
                <p>
                    Would you like to support the project, or do you have a question?
                    Send us an email at{" "}
                    <a href="mailto:hi@edunode.org">hi@edunode.org</a>.
                </p>
                <p>
                    You can also find us on{" "}
                    <a href="https://github.com/EduNodeOrg" target="_blank" rel="noopener noreferrer">GitHub</a>{" "}
                    and{" "}
                    <a href="https://www.linkedin.com/company/edunodeorg/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
                </p>
            </div>
            <Footer />
        </>
    );
}

export default ContactUs;
