
import { useState } from "react";

function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (name === "" || email === "" || message === "") {
            setError("Please fill in all fields.");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            setError("Please enter a valid email address.");
            return;
        }

        setSuccess("Thank you! Your feedback has been submitted.");

        setName("");
        setEmail("");
        setMessage("");
    }

    return (
        <section className="contact" id="contact">

            <div className="section-heading">
                <p>GET IN TOUCH</p>
                <h2>Contact Us</h2>
                <span>We would love to hear from you!</span>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>

                <label>Name</label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Message / Feedback</label>
                <textarea
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                {error && <p className="error">{error}</p>}

                {success && <p className="success">{success}</p>}

                <button type="submit">Submit Feedback</button>

            </form>

        </section>
    );
}

export default Contact;
