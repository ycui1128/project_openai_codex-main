import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import { Configuration, OpenAIApi } from 'openai'
dotenv.config()
const apikey = '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'
const configuration = new Configuration({
  apiKey: apikey,
  // proxy: 'http://proxy.tc.inet:3128',
})
const openai = new OpenAIApi(configuration)

const app = express()
app.use(cors())
app.use(express.json())

// app.get('/', async (req, res) => {
//   res.status(200).send({
//     message: 'Hello from CodeX!',
//   })
// })

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'hello',
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    res.status(200).send({
      bot: response.data.choices[0].text,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong')
  }
})

app.listen(5000, () =>
  console.log('AI server started on http://localhost:5000'),
)
