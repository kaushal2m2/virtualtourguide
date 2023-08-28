import { Configuration, OpenAIApi } from "openai";

console.log("x")
const configuration = new Configuration({
  apiKey: process.env.VITE_APP_OPENAI_API_KEY,
});
console.log("f")
const openai = new OpenAIApi(configuration);
console.log("e")

export default async function (req, res) {
    console.log("x")
    if (!configuration.apiKey) {
        console.log("prob")
        res.status(500).json({
        error: {
            message: "OpenAI API key not configured, please follow instructions in README.md",
        }
    });
    return;
    }

  const l = req.body;
  console.log(l)
  console.log("wo")

  try {
    const completion = await openai.createChatCompletion({
      model: "text-davinci-003",
      messages: [{role: "user", content: generatePrompt(l)}],
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(loc) {
  return `Pretend you are a tour guide in ${loc}. 
  What would you tell a tourist who is new to the area? 
  Give a history and important sites and events in ${loc}, 
  and write it in a conversation form, 
  as if you are lecturing/talking to the tourist`;
}
