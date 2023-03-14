import { Configuration, OpenAIApi } from 'openai'
const apiKey = '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'
const configuration = new Configuration({
  apiKey: apiKey,
  //   proxy: 'http://proxy.tc.inet:3128',
})
const openai = new OpenAIApi(configuration)

const response = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt: '',
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
})
