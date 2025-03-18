// import React, { useState, useRef, useEffect } from 'react';
// import styled from 'styled-components';
// import { lexRuntime } from '../aws-config1';
// import chatIcon from '../assets/chatIcon.png';
// import closeIcon from '../assets/closeIcon.png';
// import { useMediaQuery } from 'react-responsive';

// const ChatbotButton = ({ isChatOpen, setIsChatOpen }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [language] = useState('en_US');
//   const [sessionId, setSessionId] = useState(Date.now().toString());
//   const messagesEndRef = useRef(null);
//   const isMobile = useMediaQuery({ maxWidth: 768 });

//   const position = {
//     x: window.innerWidth - 60,
//     y: window.innerHeight - 60,
//   };

//   const toggleChat = async () => {
//     setIsChatOpen(!isChatOpen);
//     if (!isChatOpen) {
//       resetChat();
//     }
//   };

//   // const sendMessageToLex = async (text = input, addToMessages = true) => {
//   //   if (!text.trim()) return;
//   //   if (addToMessages) {
//   //     setMessages((prev) => [...prev, { sender: 'user', text }]);
//   //   }

//   //   const params = {
//   //     botId: 'ZCEYYKYI4B',
//   //     botAliasId: 'TSTALIASID',
//   //     localeId: language,
//   //     sessionId,
//   //     text,
//   //   };

//   //   setInput('');
//   //   try {
//   //     const response = await lexRuntime.recognizeText(params).promise();
//   //     const botMessages = response.messages
//   //       .map((msg) => {
//   //         if (msg.contentType === 'PlainText') {
//   //           return { sender: 'bot', text: msg.content };
//   //         } else if (msg.contentType === 'ImageResponseCard') {
//   //           return {
//   //             sender: 'bot',
//   //             text: msg.imageResponseCard.title,
//   //             buttons: msg.imageResponseCard.buttons.map((btn) => ({
//   //               text: btn.text,
//   //               value: btn.value,
//   //             })),
//   //           };
//   //         }
//   //         return null;
//   //       })
//   //       .filter(Boolean);

//   //     if (!botMessages.length) {
//   //       botMessages.push({ sender: 'bot', text: "I didn't understand that." });
//   //     }

//   //     setMessages((prev) => [...prev, ...botMessages]);
//   //   } catch (error) {
//   //     console.error('Error with Lex:', error);
//   //     setMessages((prev) => [...prev, { sender: 'bot', text: "Something went wrong!" }]);
//   //   }
//   // };

//   const sendMessageToLex = async (text = input, addToMessages = true) => {
//     if (!text.trim()) return;
//     if (addToMessages) {
//       setMessages((prev) => [...prev, { sender: 'user', text }]);
//     }
  
//     const params = {
//       botId: 'ZCEYYKYI4B',
//       botAliasId: 'TSTALIASID',
//       localeId: language,
//       sessionId,
//       text,
//     };
  
//     setInput('');
//     try {
//       const response = await lexRuntime.recognizeText(params).promise();
//       const regex = /Financial Wellness Score:\s*(\d{1,3})\/100\s*Summary:\s*([\s\S]*?)\s*Suggestions:\s*(✅.*)/;
      
//       const botMessages = response.messages
//         .map((msg) => {
//           if (msg.contentType === 'PlainText') {
//             let content = msg.content;
  
//             // Apply regex to check if it's a financial wellness message
//             const match = content.match(regex);
//             if (match) {
//               const score = match[1];
//               const summary = match[2].trim();
//               const suggestions = match[3]
//                 .split('✅')
//                 .filter(Boolean)
//                 .map((s) => `✅ ${s.trim()}`)
//                 .join('\n');
  
//               // Format message using markdown
//               content = `**Financial Wellness Score:** ${score}/100\n\n` +
//                         `**Summary:** ${summary}\n\n` +
//                         `**Suggestions:**\n${suggestions}`;
//             } else {
//               // Remove 'Options' from the message if present
//               content = content.replace(/\bOptions\b[\s:,-]*/gi, '');
//               // con/tent = `**${content.trim()}**`;
//             }
  
//             return { sender: 'bot', text: content };
//           } else if (msg.contentType === 'ImageResponseCard') {
//             return {
//               sender: 'bot',
//               text: msg.imageResponseCard.title,
//               buttons: msg.imageResponseCard.buttons.map((btn) => ({
//                 text: btn.text,
//                 value: btn.value,
//               })),
//             };
//           }
//           return null;
//         })
//         .filter(Boolean);
  
//       if (!botMessages.length) {
//         botMessages.push({ sender: 'bot', text: "I didn't understand that." });
//       }
  
//       setMessages((prev) => [...prev, ...botMessages]);
//     } catch (error) {
//       console.error('Error with Lex:', error);
//       setMessages((prev) => [...prev, { sender: 'bot', text: "Something went wrong!" }]);
//     }
//   };
  
//   const resetChat = async () => {
//     setMessages([]);
//     setSessionId(Date.now().toString());
//     await sendMessageToLex("Hello", false);
//   };

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   return (
//     <StyledWrapper>
//       <FloatingButton 
//         onClick={toggleChat}
//         style={{ 
//           bottom: position.y, 
//           right: isMobile ? '10px' : '20px',
//           width: isMobile ? '45px' : '50px',
//           height: isMobile ? '45px' : '50px'
//         }}
//       >
//         <ChatIcon>
//           <img 
//             src={isChatOpen ? closeIcon : chatIcon} 
//             alt={isChatOpen ? "Close chat" : "Open chat"} 
//             className="icon-image" 
//           />
//         </ChatIcon>
//       </FloatingButton>

//       {isChatOpen && (
//         <ChatWindow style={{
//           width: isMobile ? '90%' : '500px',
//           right: isMobile ? '5%' : '20px',
//           height: isMobile ? '70vh' : '450px',
//           bottom: isMobile ? '70px' : '80px'
//         }}>
//           <ChatHeader>
//             <FloatingButton onClick={toggleChat} style={{ position: 'static', boxShadow: 'none' }}>

//             </FloatingButton>
//           </ChatHeader>

//           <ChatMessages>
//             {messages.map((msg, index) => (
//               <Message key={index} sender={msg.sender}>
//                 {msg.text && <MessageBubble sender={msg.sender}>{msg.text}</MessageBubble>}
//                 {msg.buttons && (
//                   <ButtonContainer>
//                     {msg.buttons.map((button, btnIndex) => (
//                       <BotButton
//                         key={btnIndex}
//                         onClick={() => sendMessageToLex(button.value)}
//                       >
//                         {button.text}
//                       </BotButton>
//                     ))}
//                   </ButtonContainer>
//                 )}
//                 <div ref={messagesEndRef} />
//               </Message>
//             ))}
//           </ChatMessages>

//           <ChatInput>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && sendMessageToLex()}
//               placeholder="Reply..."
//             />
//             <button onClick={() => sendMessageToLex()}>Send</button>
//           </ChatInput>
//         </ChatWindow>
//       )}
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.div`
//   position: relative;
// `;

// const FloatingButton = styled.button`
//   position: fixed;
//   border-radius: 50%;
//   background: #e0ccb1;
//   border: none;
//   padding: 0;
//   cursor: pointer;
//   z-index: 1001;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.57);
//   transition: background 0.3s ease;
//   &:hover {
//     background: rgba(122, 107, 89, 0.77);
//   }
// `;

// const ChatIcon = styled.span`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   height: 100%;
//   padding: 10px;
//   .icon-image {
//     width: 100%;
//     height: 100%;
//     object-fit: contain;
//   }
// `;

// const ChatWindow = styled.div`
//   position: fixed;
//   bottom: 80px;
//   background: rgba(230, 219, 205, 0.72);
//   border-radius: 10px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.52);
//   display: flex;
//   flex-direction: column;
//   z-index: 1000;
//   overflow: hidden;
  
//   @media (max-width: 768px) {
//     bottom: 70px;
//   }
// `;

// const ChatHeader = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   padding: 10px;
//   background: rgba(82, 76, 67, 0.45);
// `;

// const ChatMessages = styled.div`
//   flex: 1;
//   padding: 15px;
//   overflow-y: auto;
//   display: flex;
//   flex-direction: column;
// `;

// const Message = styled.div`
//   margin: 8px 0;
//   display: flex;
//   flex-direction: column;
//   align-items: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
// `;

// const MessageBubble = styled.div`
//   padding: 8px 12px;
//   border-radius: 8px;
//   display: inline-block;
//   background: ${(props) => (props.sender === 'user' ? '#b1b488' : '#ffffff')};
//   color: ${(props) => (props.sender === 'user' ? '#fff' : '#282936')};
//   max-width: 80%;
//   word-break: break-word;
// `;

// const ButtonContainer = styled.div`
//   margin-top: 8px;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 8px;
// `;

// const ChatInput = styled.div`
//   display: flex;
//   padding: 10px;
//   border-top: 1px solid #ddd;
//   background: rgba(68, 78, 53, 0.32);
//   input {
//     flex: 1;
//     padding: 8px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     outline: none;
//     background: rgba(164, 142, 112, 0.83);
//   }
//   button {
//     margin-left: 10px;
//     padding: 8px 12px;
//     border: none;
//     background: rgba(164, 142, 112, 0.83);
//     color: white;
//     border-radius: 5px;
//     cursor: pointer;
//     &:hover {
//       background: rgba(87, 73, 55, 0.83);
//     }
//   }
  
//   @media (max-width: 480px) {
//     input {
//       padding: 6px;
//       font-size: 14px;
//     }
//     button {
//       padding: 6px 10px;
//       font-size: 14px;
//     }
//   }
// `;

// const BotButton = styled.button`
//   padding: 6px 12px;
//   background: rgb(89, 98, 9);
//   color: #fff;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   font-size: 14px;
//   transition: background 0.3s ease;
//   &:hover {
//     background: rgb(52, 57, 6);
//   }
  
//   @media (max-width: 480px) {
//     padding: 5px 10px;
//     font-size: 13px;
//   }
// `;

// export default ChatbotButton;



import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { lexRuntime } from '../aws-config1';
import chatIcon from '../assets/chatIcon.png';
import closeIcon from '../assets/closeIcon.png';
import { useMediaQuery } from 'react-responsive';

const ChatbotButton = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [language] = useState('en_US');
  const [sessionId, setSessionId] = useState(Date.now().toString());
  const messagesEndRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  const toggleChat = async () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      resetChat();
    }
  };

  const [isFirstMessage, setIsFirstMessage] = useState(true);

  const sendMessageToLex = async (text = input, addToMessages = true) => {
    console.log('sendMessageToLex called with text:', text);
    
    if (!text.trim()) {
      console.log('Empty input, returning early.');
      return;
    }
  
    if (addToMessages) {
      console.log('Adding user message to state:', text);
      setMessages((prev) => [...prev, { sender: 'user', text }]);
    }
  
    setInput(''); // Clear input field after sending
    console.log('Input cleared');
  
    if (isFirstMessage) {
      console.log('First message detected. Setting isFirstMessage to false and starting 2-second delay.');
      setIsFirstMessage(false);
  
      setTimeout(() => {
        console.log('2-second delay complete. Sending first message to Lex.');
        sendToLex(text);
      }, 2000);
    } else {
      console.log('Not the first message. Sending message to Lex immediately.');
      sendToLex(text);
    }
  };
  
let isSending = false;

const sendToLex = async (text) => {
  if (isSending) return; // Prevent duplicate calls
  isSending = true;

  console.log('sendToLex called with text:', text);

  const params = {
    botId: 'ZCEYYKYI4B', 
    botAliasId: 'TSTALIASID', 
    localeId: language,
    sessionId,
    text,
  };

  console.log('Lex request params:', params);

  try {
    console.log('Sending request to Lex...');
    const response = await lexRuntime.recognizeText(params).promise();
    console.log('Lex response received:', response);

    const botMessages = response.messages
      .map((msg) => {
        console.log('Processing message:', msg);
        if (msg.contentType === 'PlainText') {
          return { sender: 'bot', text: msg.content };
        } else if (msg.contentType === 'ImageResponseCard') {
          return {
            sender: 'bot',
            text: msg.imageResponseCard.title,
            buttons: msg.imageResponseCard.buttons.map((btn) => ({
              text: btn.text,
              value: btn.value,
            })),
          };
        }
        return null;
      })
      .filter(Boolean);

    if (!botMessages.length) {
      console.log('No valid response from Lex. Adding fallback message.');
      botMessages.push({ sender: 'bot', text: "I didn't understand that." });
    }

    console.log('Adding bot messages to state:', botMessages);
    setMessages((prev) => [...prev, ...botMessages]);
  } catch (error) {
    console.error('Error with Lex:', error);
    setMessages((prev) => [...prev, { sender: 'bot', text: "Something went wrong!" }]);
  } finally {
    isSending = false; // Reset the flag after the request finishes
  }
};

  
  


  const resetChat = async () => {
    setMessages([]);
    setSessionId(Date.now().toString());
    await sendMessageToLex("Hello", false);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <StyledWrapper>
      <FloatingButton 
        onClick={toggleChat}
        style={{ 
          bottom: isMobile ? '20px' : '30px', 
          right: isMobile ? '10px' : '20px',
          width: isMobile ? '45px' : '50px',
          height: isMobile ? '45px' : '50px'
        }}
      >
        <ChatIcon>
          <img 
            src={isChatOpen ? closeIcon : chatIcon} 
            alt={isChatOpen ? "Close chat" : "Open chat"} 
            className="icon-image" 
          />
        </ChatIcon>
      </FloatingButton>

      {isChatOpen && (
        <ChatWindow style={{
          width: isMobile ? '90%' : isTablet ? '70%' : '500px',
          right: isMobile ? '5%' : '20px',
          height: isMobile ? '70vh' : '450px'
        }}>
          <ChatHeader>
            <FloatingButton onClick={toggleChat} style={{ position: 'static', boxShadow: 'none' }}>
              {/* <ChatIcon>
                <img src={closeIcon} alt="Close chat" className="icon-image" />
              </ChatIcon> */}
            </FloatingButton>
          </ChatHeader>

          <ChatMessages>
            {messages.map((msg, index) => (
              <Message key={index} sender={msg.sender}>
                {msg.text && <MessageBubble sender={msg.sender}>{msg.text}</MessageBubble>}
                {msg.buttons && (
                  <ButtonContainer>
                    {msg.buttons.map((button, btnIndex) => (
                      <BotButton
                        key={btnIndex}
                        onClick={() => sendMessageToLex(button.value)}
                      >
                        {button.text}
                      </BotButton>
                    ))}
                  </ButtonContainer>
                )}
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>

          <ChatInput>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessageToLex()}
              placeholder="Reply..."
            />
            <button onClick={() => sendMessageToLex()}>Send</button>
          </ChatInput>
        </ChatWindow>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
`;

const FloatingButton = styled.button`
  position: fixed;
  border-radius: 50%;
  background:rgb(127, 127, 127);
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.57);
  transition: background 0.3s ease;
  &:hover {
    background: rgba(68, 68, 68, 0.88);
  }
`;

const ChatIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  .icon-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 85px;
  background: rgba(116, 116, 116, 0.53);
  backdrop-filter: blur(9px);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.52);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
  height: 500px; /* Set desired height */

  @media (max-width: 768px) {
    bottom: 70px;
    height: 400px; /* Adjust height for smaller screens */
  }
`;


const ChatHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background: rgba(82, 82, 82, 0.45);
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  margin: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div`
  padding: 8px 12px;
  border-radius: 8px;
  display: inline-block;
  background: ${(props) => (props.sender === 'user' ? '#b1b488' : '#ffffff')};
  color: ${(props) => (props.sender === 'user' ? '#fff' : '#282936')};
  max-width: 80%;
  word-break: break-word;
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ChatInput = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background: rgba(95, 95, 95, 0.32);
  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    background: rgba(163, 163, 163, 0.83);
  }
  button {
    margin-left: 10px;
    padding: 8px 12px;
    border: none;
    background: rgba(185, 184, 184, 0.83);
    color:rgb(36, 34, 34);
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background: rgba(87, 73, 55, 0.83);
    }
  }
  
  @media (max-width: 480px) {
    input {
      padding: 6px;
      font-size: 14px;
    }
    button {
      padding: 6px 10px;
      font-size: 14px;
    }
  }
`;

const BotButton = styled.button`
  padding: 6px 12px;
  background: rgb(92, 92, 92);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
  &:hover {
    background: rgb(52, 57, 6);
  }
  
  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 13px;
  }
`;

export default ChatbotButton;
