import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from Op" })
})

router.route('/').post(async (req, res) => {
  try {
    const prompt = req.body.prm;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "system", "content": "You are a helpful tour guide." }, { "role": "user", "content": prompt }],
      temperature: 0.7,
      max_tokens: 200
    });

    // const completion = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: prompt,
    //     temperature: 0.7,
    //     max_tokens: 100
    // });

    //res.status(200).json({ result: completion.data.choices[0].text });
    res.status(200).json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})

export default router;