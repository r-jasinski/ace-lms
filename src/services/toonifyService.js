import { handleToonifyErrors } from '@/services/errorsService'
import { get } from 'axios'
import deepai from 'deepai'

export const initializeToonify = () => {
  deepai.setApiKey(process.env.VUE_APP_DEEP_AI_KEY)
}

export const toonifyImage = async image => {
  try {
    return await deepai.callStandardApi('toonify', { image: image })
  } catch (error) {
    handleToonifyErrors()
    return error
  }
}

export const getBase64FromExternalUrl = async externalUrl => {
  try {
    const response = await get(externalUrl, { responseType: 'arraybuffer' })
    const data = Buffer.from(response.data, 'binary').toString('base64')
    return data
  } catch (error) {
    handleToonifyErrors()
    return error
  }
}
