const axios = require("axios");
require("dotenv").config()

const apiKey = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/completions";
  
const client = axios.create({
  headers: {
    Authorization: "Bearer " + apiKey,
  },
});


async function interactWithChatGPT(prompt) {
  const params = {
    prompt: prompt,
    model: "text-davinci-003",
    max_tokens: 150,
    temperature: 0,
  };

  try {
    const result = await client.post(OPENAI_API_URL, params);
    console.log("ChatGPT: ", result.data.choices[0].text.trim());
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.warn("Rate limited. Retrying after a delay...");
      // Implement a backoff strategy, e.g., exponential backoff
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Retry after 5 seconds
      await interactWithChatGPT(prompt); // Retry the request
    } else console.error("Error interacting with ChatGPT:", error.message);
  }
}

async function startChatGPTCLI() {
  const inquirer = (await import("inquirer")).default;

  console.log("Welcome to ChatGPT CLI!");

  while (true) {
    const userPrompt = await askQuestion();
    if (userPrompt.toLowerCase() === "exit") {
      console.log("Exiting ChatGPT CLI. Goodbye!");
      break;
    }

    await interactWithChatGPT(userPrompt);
  }
}

async function askQuestion() {
  const inquirer = (await import("inquirer")).default;

  const { answer } = await inquirer.prompt([
    {
      type: "input",
      name: "answer",
      message: "Enter your custom prompt: ",
    },
  ]);
  return answer;
}

startChatGPTCLI();