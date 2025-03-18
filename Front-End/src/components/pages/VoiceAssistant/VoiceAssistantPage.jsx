import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import environment from '../../../config/environment';
import assistantVideo from '../../../assets/videos/assistant.mp4';
import './VoiceAssistant.css';

const VoiceAssistantPage = () => {
  const location = useLocation();
  const buttonContainerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    if (location.pathname !== '/voice-assistant') return;

    const buttonConfig = {
      position: 'bottom-right',
      color: '#4f95aa',
      icon: 'microphone',
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js';
    script.async = true;

    script.onload = () => {
      if (window.vapiSDK && buttonContainerRef.current) {
        window.vapiSDK.run({
          apiKey: environment.vapi.apiKey,
          assistant: environment.vapi.assistantId,
          config: buttonConfig,
          container: buttonContainerRef.current,
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup code...
    };
  }, [location.pathname]);

  // Rest of the component...
};

export default VoiceAssistantPage; 
