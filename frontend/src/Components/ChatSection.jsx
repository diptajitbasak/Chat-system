import ChatItem from "./ChatItem";

const ChatSection = ({data}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        }}>
            {data?.map((each, index) => <ChatItem key={index} data={each} /> )}
        </div>
    )
}

export default ChatSection;
