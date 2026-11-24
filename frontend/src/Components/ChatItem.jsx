

const ChatItem = ({ data }) => {
    return (
        <div className={`message-row ${data.isBot ? 'message-row-bot' : 'message-row-user'}`}>
          <div className={`message-bubble ${data.isBot ? 'message-bubble-bot' : 'message-bubble-user'}`}>
            {data.text}
          </div>
        </div>
    );
};
export default ChatItem;
