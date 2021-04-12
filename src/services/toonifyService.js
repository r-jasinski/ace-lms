import { get } from 'axios'
import deepai from 'deepai'

export const initializeToonify = () =>
  deepai.setApiKey(process.env.VUE_APP_DEEP_AI_KEY)

export const toonifyImage = async image =>
  await deepai.callStandardApi('toonify', {
    image: image
  })

export const getBase64FromExternalUrl = async externalUrl => {
  const response = await get(externalUrl, { responseType: 'arraybuffer' })
  const data = Buffer.from(response.data, 'binary').toString('base64')
  return data
}
