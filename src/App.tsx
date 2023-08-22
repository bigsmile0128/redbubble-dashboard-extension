import { useState, useEffect } from "react";
import "./App.css";

interface FormData {
    username: string;
    password: string;
    theme: string;
}

function App() {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: "",
        theme: "light",
    });

    const onSubmit = () => {
        // Send formData to the content script
        chrome.runtime.sendMessage({ type: "ext", formData: formData });
    };

    const onCheckTheme = (e: any) => {
        setFormData((prevData) => ({
            ...prevData,
            theme: e.target.id,
        }));
    };

    const onInputChange = (e: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="App">
            <div className="x-container">
                <div className="row">
                    <div className="label">
                        <label htmlFor="username">User:</label>
                    </div>
                    <div className="input-form">
                        <input
                            type="text"
                            name="username"
                            onChange={onInputChange}
                            value={formData.username}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="label">
                        <label htmlFor="password">Password:</label>
                    </div>
                    <div className="input-form">
                        <input
                            type="password"
                            name="password"
                            onChange={onInputChange}
                            value={formData.password}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="label">
                        <label>Appearance:</label>
                    </div>
                    <div className="input-form">
                        <input
                            type="radio"
                            id="light"
                            name="theme"
                            checked={formData.theme === "light"}
                            onClick={onCheckTheme}
                        />
                        <label htmlFor="light">Light</label>
                        <input
                            type="radio"
                            id="dark"
                            name="theme"
                            checked={formData.theme === "dark"}
                            onClick={onCheckTheme}
                        />
                        <label htmlFor="dark">Dark</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-form">
                        <button onClick={onSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
