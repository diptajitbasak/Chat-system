import ChatItem from "./ChatItem";

const ChatSection = ({data}) => {
    return (
        <div className="message-list" aria-live="polite">
            {data.length === 0 && <p className="empty-state">Send a message to start the conversation.</p>}
            {data.map((each, index) => <ChatItem key={index} data={each} />)}
        </div>
    )
}

export default ChatSection;
