

const ChatItem = ({ data }) => {
    return (
        <div style={{
            alignSelf: data.isBot ? 'flex-start' : 'flex-end',
            padding: '10px 15px',
            margin: '5px',
            backgroundColor: data.isBot ? '#e5e5e5' : '#d1e7ff',
            borderRadius: '10px',
            maxWidth: '70%'
        }}>
            {data.text}
        </div>
    );
};
export default ChatItem;
