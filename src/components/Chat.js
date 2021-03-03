import React, { useEffect, useState } from 'react' //type rfce
import styled from 'styled-components';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import db from '../firebase';
import { useParams } from 'react-router-dom';

function Chat() {
    let { channelId } = useParams();
    const [channel, setChannel] = useState();
    const [messages, setMessages] = useState([]);

    const getChannel = () => {
        db.collection('rooms')
        .doc(channelId)
        .onSnapshot((snapshot) => {
            setChannel(snapshot.data())
        })
    };

    const getMessages = () => {
        db.collection('rooms')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
            let messages = snapshot.docs.map((doc) => doc.data());
            setMessages(messages);
        })
    }

    useEffect(() => {
        getChannel();
        getMessages();
    }, [channelId]);

    return (
        <Container>
            <Header>
                <Channel>
                    <ChannelName>
                        # {channel && channel.name}
                    </ChannelName>
                    <ChannelInfo>
                        Company-wide announcements and work-based matters
                    </ChannelInfo>
                </Channel>
                <ChannelDetails>
                    <div style={{ fontWeight: "500"}}>
                        Details
                    </div>
                    <Info />
                </ChannelDetails>
            </Header>
            <MessageContainer>
                {
                    messages.length > 0 && 
                    messages.map((data, index) => (
                        <ChatMessage
                            text={data.text}
                            name={data.user}
                            image={data.userImage}
                            timestamp={data.timestamp}
                        />
                        ))
                }
            </MessageContainer>
            <ChatInput />
        </Container>
    )
}

export default Chat;

const Container = styled.div`
    display: grid;
    grid-template-rows: 64px auto min-content;
`;
const Header = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(83, 39, 83,.13);
    justify-content: space-between;
`;
const MessageContainer = styled.div``;
const Channel = styled.div`
`;
const ChannelDetails = styled.div`
    display: flex;
    align-items: center;
    color: #606060;
`;
const ChannelName = styled.div`
    font-weight: 700;
`;
const ChannelInfo = styled.div`
    font-weight: 400;
    color: #606060;
    font-size: 13px;
    margin-top: 8px;
`;
const Info = styled(InfoOutlinedIcon)`
    margin-left: 10px;
`;