import * as dotenv from 'dotenv'
import express from 'express'
import { Configuration, OpenAIApi } from 'openai'

const app = express()
app.use(express.json())
dotenv.config()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  proxy: process.env.HTTP_PROXY,
})
const openai = new OpenAIApi(configuration)

const port = process.env.PORT || 5000

app.post('/ask', async (req, res) => {
  const prompt = req.body.prompt
  try {
    if (prompt == null) {
      throw new Error('Uh oh, no prompt was provided')
    }
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
    })
    const completion = response.data.choices[0].text
    return res.status(200).json({
      success: true,
      message: completion,
    })
  } catch (error) {
    console.log(error.message)
  }
})

app.listen(port, () => console.log(`Server is running on port ${port}!!`))
