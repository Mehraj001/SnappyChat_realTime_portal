import React, {useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import axios from "axios";
import { allUsersRoute, host } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from "socket.io-client";

function Chat() {
  const socket=useRef();
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined);
  const [isLoaded,setIsLoaded]=useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      }else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
        setIsLoaded(true);
      }
    };
  
    fetchData(); 
  }, []);

  useEffect(()=>{
    if(currentUser){
      socket.current=io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(response.data);
          } else {
            navigate("/setAvatar");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
    };
  
    fetchData();
  }, [currentUser]);
  
   const handelChatChange=(chat)=>{
        setCurrentChat(chat);
   };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handelChatChange}/>
        {isLoaded && currentChat===undefined?(
           <Welcome currentUser={currentUser}/> 
        ):(
          <ChatContainer  currentChat={currentChat} currentUser={currentUser} socket={socket}/>
        )};
       
      </div>
    </Container>
    
  )
}

const Container=styled.div`
         height: 100vh;
         width: 100vw;
         display: flex;
         gap: 1rem;
         background-color: #131324;
         justify-content: center;
         flex-direction: column;
         align-items: center;
         .container{
          height: 85vh;
          width: 85vw;
          background-color: white;
          display: grid;
          grid-template-columns: 25% 75%;
          @media screen and (min-width:720px)and (max-width:1080px){
            grid-template-columns: 35% 65%;
          }
         }
`;
export default Chat
