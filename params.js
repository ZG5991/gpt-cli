require('dotenv').config();

function getParams(userPrompt) {
    return {
        messages: [
          {
            role: 'system',
            content: process.env.SYSTEM_MESSAGE,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        model: "gpt-4",
        max_tokens: 500,
        temperature: 0,
      };
  };

  module.exports = getParams;