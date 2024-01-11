# GPT-CLI

A simple application that allows running the openAI API within the terminal.

## Installation
Project will require axios and dotenv.

The code uses your account's openAI API access key to run. 
Once you have pulled the code, create a .env file and specify your access key as such:
"OPENAI_API_KEY = "<your-access-key>""
You can run the app with the "node cli.js" command.

If you want to provide specific a specific system prompt for the API to use, you can do so by editing the 
"SYSTEM_MESSAGE" variable in your .env file to whatever you wish. E.g. "you are a helpful software engineering assistant"

The params.js file calls this environment variable and provides the necessarry parameters for the gpt API to use when running.