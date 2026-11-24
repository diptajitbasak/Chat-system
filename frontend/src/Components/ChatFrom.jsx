
import { useState } from "react";

const ChatFrom = ({ sendValue }) => {
    const [value, setValue] = useState("");

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const _sendMessage = () => {
        if (!value.trim()) return;

        sendValue(value);
        setValue("");
    };

    return (
        <div style={{
            width: "100%",
            bottom: "10px",
            position: "fixed"
        }}>
            <input
                style={{ width: "90vw", marginRight: "20px" }}
                value={value}
                onChange={onChange}
            />

            <button onClick={_sendMessage}>
                Send
            </button>
        </div>
    );
};

export default ChatFrom;
