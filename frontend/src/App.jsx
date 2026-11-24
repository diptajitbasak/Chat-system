import { useState, useEffect } from 'react'
import ChatSection from './Components/ChatSection.jsx'
import ChatFrom from './Components/ChatFrom.jsx'


function App() {
  const [serverStatus, setServerStatus] = useState("Checking...");
  const [data, setData] = useState([
    {
      text: "hi",
      isBot: false
    }, {
      text: "hello",
      isBot: true
    },
  ])


    useEffect(() => {
        fetch("http://localhost:5000/api/health")
            .then((response) => response.json())
            .then((data) => {
                console.log("Backend response:", data);
                setServerStatus(data.message);
            })
            .catch((error) => {
                console.error("API Error:", error);
                setServerStatus("Backend connection failed");
            });
    }, []);


  const _addValue = (senderText) => {
    console.log("senderText ?", senderText);
    
    setData([...data,
      { text: senderText, isBot: false}
    ])
  }

  return (
    <>
      <p>Backend Status: {serverStatus}</p>
      <ChatSection data={data} />
      <ChatFrom sendValue={_addValue} />
    </>
  )
}

export default App
