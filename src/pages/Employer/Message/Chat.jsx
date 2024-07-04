import React,{useState,useEffect} from 'react'
import SideBar from '../../../components/employer/SideBar'
import Message from '../../../components/employer/utilities/Message';
import axios from 'axios'
import { IoSend } from "react-icons/io5";
import { w3cwebsocket as W3CWebSocket } from "websocket";



function Chat() {
  const [message, setMessage] = useState("");
    // const baseURL='http://127.0.0.1:8000'
    const baseURL = import.meta.env.VITE_API_BASEURL
    const token = localStorage.getItem('access')
    const [chatRooms,setChatRooms] = useState([])
    const [chatMessages,setChatMessages] = useState([])
    const [client,setClient] =useState(null)
    const [selectedChat,setSelectedChat] = useState([])
    const [empName,setEmpName] = useState(null)
  
    

    useEffect(()=>{
      const fetchMessageData = async()=>{
        try{
          const response = await axios.get(
            `${baseURL}/chat/chats/`,{
              headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data'
              }
            }
          )
         // console.log("chats.............................",response.data[0].employer)
         
    
          if (response.status == 200){
            setChatRooms(response.data)
            setEmpName(response.data[0].employer_name)
            setSelectedChat(response.data[0])
            setChatMessages([])
            connectToWebSocket(response.data[0].candidate,response.data[0].employer,response.data[0].employer)
          }
        }
        catch(error){
          // console.log(error)
        }
      }
      fetchMessageData()
    },[])

    const connectToWebSocket =(candidate_id,employer_id,user_id) =>{
      if(!candidate_id || !employer_id) return ;
      
      const newClint = new W3CWebSocket(
          `${baseURL}/ws/chat/${candidate_id}/${employer_id}/${user_id}`
      );
      setClient(newClint);
      newClint.onopen = () => {
          // console.log("WebSocket Client Connected");

        };
        newClint.onmessage = (message) => {
          // console.log("ayyooooooooooooooooooooooooooooooooooooooooooooooooooooo")
          const data = JSON.parse(message.data);
          setChatMessages((prevMessages) => [...prevMessages, data]);
         
      };
      // console.log("set chat messages from websocket",chatMessages)          
        return () => {
            newClint.close();
            };                
      };

    const handleChat = (room) =>{
      setChatMessages([])
      // console.log("roooooooooooooooooooom",room)
      connectToWebSocket(room.candidate,room.employer);
      setSelectedChat(room)
      // console.log("helloooooo")
    }
    
    const sendMessage = () =>{
      if (!client || client.readyState !== client.OPEN) {
          // console.error("WebSocket is not open");
          return;
        }
        const sendername = empName
        // console.log("SENDER NAME:", sendername);
        const messageData = { message, sendername };
        const messageString = JSON.stringify(messageData);
        // console.log("Sending Message:", messageString);
        client.send(messageString);
        setMessage("");
    }
    // console.log("chatt messgwws..........",chatMessages)
  return (
    <div className='flex'>
    <div>
        <SideBar/>
    </div>
    <div className='w-full '>
  
      <div className=' w-full h-screen pt-12'>
          <div className="grid min-h-full w-full lg:grid-cols-[280px_1fr] ">
            <div className="hidden border-r bg-gray-100/40 lg:block ">
              <div className="flex h-full max-h-screen flex-col gap-2">
              
                <nav className="flex flex-col gap-1 overflow-auto py-2">
                  {chatRooms.map((room,index)=>(
                    <div onClick={()=>handleChat(room)} className="flex items-center gap-3 px-4 py-2 text-sm font-medium bg-blue-50 rounded-md cursor-pointer" key={index}>
                      <div className="">
                        <img class="w-10 h-10 rounded-full" src={baseURL+room.candidate_pic} alt="Rounded avatar"></img>
                      </div>
                        <div className="flex-1 truncate font-bold text-gray-500">{room.candidate_name}</div>
                                     
                    </div>
                  ))}
                  
                </nav>
              </div>
            </div>
          <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8">
                    <img class="w-10 h-10 rounded-full" src={baseURL+selectedChat.candidate_pic} alt="Rounded avatar"></img>

                  </div>
                  <div>
                    <div className="font-medium">{selectedChat.candidate_name}</div>
                  </div>
                </div>
              </div>
            
            </header>
            <main className="flex-1  p-2 ">
              <div className=" flex px-5 w-full flex-col gap-3 overflow-auto max-h-128">
                {chatMessages.map((msg,index)=>(
                  <div key={index}>
                  {msg.sendername == empName ? (
                    <div className=' flex w-full justify-end'>
                       
                        <Message text={msg.message} send/>
                    </div>
                  ):(
                    <div className=' flex w-full justify-start'>
                       
                        <Message text={msg.message} recived/>
                    </div>
                  )}
                </div>
                ))}
              </div>
            </main>
            <div className="border-t bg-white px-4 py-2 dark:bg-gray-950">
              <div className="relative">
                <textarea
                  placeholder="Type your message..."
                  name="message"
                  id="message"
                  rows={1}
                  onChange={(e) => setMessage(e.target.value)}
                  value = {message}
                  className="min-h-[48px] w-full resize-none rounded-2xl border border-gray-200  bg-white p-3 pr-16 shadow-sm dark:border-gray-800 dark:bg-gray-950"
                />
                <button onClick={sendMessage} type="submit" className="absolute top-3 right-3 w-8 h-8" >
                  <IoSend size={25} />
                  <span className="sr-only">Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

</div>
  )
}

export default Chat
