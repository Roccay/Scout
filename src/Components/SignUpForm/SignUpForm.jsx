import React, { useState } from 'react'
import "./SignUpForm.css"

function SignUpForm(props) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
        error: "",
    });

    const handleChange = (evt) => ({
        [evt.target.name]: evt.target.value,
        error: "",
    });

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const fetchResponse = await fetch("/api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: evt.target.name,
                    email: evt.target.email,
                    password: evt.target.password,
                }),
            });

            if (!fetchResponse.ok) throw new Error("fetch failed - Bad request");

            let token = await fetchResponse.json();
            localStorage.setItem("token", token);

            const userDoc = JSON.parse(Buffer.from(token.split(".")[1]), "base64").user;
            setUser(userDoc);
        } catch (err) {
            console.log("SignupForm error", err);
            console.log(err.message);
            setUser({ error: "Sign Up Failed - Try Again" });
        }
    };

    const disable = user.password !== user.confirm;

    return (
        <div className="signup-popup" style={{ display: props.showSignUp ? "flex" : "none" }}>
            <div onClick={() => { props.setShowSignUp({ showSignUp: false }); }}>x</div>
            <div>
                <form autoComplete="off" onSubmit={handleSubmit} className="signup-form-container">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                    <label>Confirm</label>
                    <input
                        type="password"
                        name="confirm"
                        value={user.confirm}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" disabled={disable}>
                        SIGN UP
                    </button>
                </form>
            </div>
            <p className="error-message">&nbsp;{user.error}</p>
        </div>
    )
}

export default SignUpForm






