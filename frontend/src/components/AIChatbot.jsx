import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './AIChatbot.css'; 


const API_KEY = "AIzaSyBIIW62d0U4be1bCmG2YmRjOTM0m3J99To";

// Initialize the Generative AI model
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// The context from your document remains the same
const knowledgeBase = `
    Site Name: Intern Setu.
    Project Name: AI-Based Smart Allocation Engine for the PM Internship Scheme.
    Project Goal: To streamline and optimize the PM Internship Scheme by using a data-driven AI approach to match students with the most suitable internship opportunities, while ensuring fairness, compliance with government policies, and fostering a skilled, diverse workforce.
    Problem Statement: The manual process of matching thousands of applicants with suitable internships is highly inefficient, leading to suboptimal selections, significant processing delays, and an administrative burden.

    Core Features:
    - AI-based Matchmaking Engine: Processes vast datasets of student profiles and internship requirements to intelligently find the most compatible matches.
    - Fairness Engine: Actively enforces government-mandated affirmative action policies and diversity quotas.
    - Real-time Dashboards: Dedicated, dynamic dashboards for Candidates, Employers, and Admins.
    - End-to-End Automation: Fully automates the entire lifecycle of the internship scheme from registration to offer letter generation.
    - Proactive Insights & Analytics: Identifies emerging skill demands, regional employment trends, and skill gaps.
    - Integrated Chatbot Support: A Gemini-powered chatbot provides instant, 24/7 assistance to all users.

    Candidate Journey:
    1. Register and Create a Profile.
    2. Receive personalized internship recommendations from the AI engine.
    3. Apply for internships with a single click.
    4. Track application status on a real-time dashboard.
    5. View final allocation results and download the offer letter.
    6. Provide feedback after the internship is complete.

    FAQs for Candidates:
    - Applying is free for all candidates.
    - You can apply for multiple internships.
    - To apply, you must register and create a complete profile.
    - After selection, you receive a notification and an offer letter on your dashboard.
`;


const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        role: 'model',
        parts: [{ text: 'Hello! I can answer questions about Intern Setu or general topics. How can I help?' }],
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      parts: [{ text: userInput }],
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setUserInput('');
    setError(null);

    // --- NEW HYBRID LOGIC ---
    let finalPrompt = userInput; // By default, use the user's question directly

    // A simple list of keywords to detect if the question is about the project
    const projectKeywords = ['intern', 'internship', 'setu', 'platform', 'apply', 'project', 'allocation', 'company', 'candidate'];
    
    // Check if the user's input contains any of the keywords
    const isProjectRelated = projectKeywords.some(keyword => userInput.toLowerCase().includes(keyword));

    if (isProjectRelated) {
      console.log("Project-related question detected. Using context.");
      // If it's a project-related question, build the detailed, contextual prompt
      finalPrompt = `
        You are a helpful assistant for the "Intern Setu" platform.
        Based ONLY on the following context, please answer the user's question.
        Do not use any external knowledge. If the answer is not found in the context, say "I'm sorry, I don't have information on that specific topic related to Intern Setu."

        CONTEXT:
        ---
        ${knowledgeBase}
        ---

        USER'S QUESTION:
        ${userInput}
      `;
    } else {
        console.log("General question detected. Using general knowledge.");
    }
    // If it's a general question, finalPrompt remains the original userInput

    try {
      const result = await model.generateContent(finalPrompt);
      const response = await result.response;
      const text = response.text();
      
      const modelMessage = {
        role: 'model',
        parts: [{ text }],
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, modelMessage]);

    } catch (err) {
      console.error('Error sending message to Gemini:', err);
      setError('Sorry, something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // The rest of the component (the return statement) remains exactly the same
  return (
    <div className="chatbot-container">
      <div className="chat-history" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message-wrapper ${msg.role}`}>
            <div className="avatar" style={{ backgroundColor: msg.role === 'model' ? '#6b7280' : '#8b5cf6' }}>
              {msg.role === 'model' ? 'Bot' : 'You'}
            </div>
            <div className="message-content">
              <div className={`chat-message ${msg.role}`}>
                <p>{msg.parts[0].text}</p>
              </div>
              <div className="timestamp">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat-message-wrapper model">
             <div className="avatar" style={{backgroundColor: '#6b7280'}}>Bot</div>
             <div className="message-content">
                <div className="chat-message model">
                    <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
             </div>
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
      </div>
      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask me anything..."
          aria-label="Chat input"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AIChatbot;
