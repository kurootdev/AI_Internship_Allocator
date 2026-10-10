

import React from 'react';
import AIChatbot from '../components/AIChatbot'; 

const AISupport = () => {
  return (
    <div style={{ padding: '2rem' }}> {/* Added some padding for spacing */}
           
      {/* Here is where we render the actual chatbot */}
      <AIChatbot />
    </div>
  );
};

export default AISupport;