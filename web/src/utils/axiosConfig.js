import axios from 'axios'

const AxiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
})

export default AxiosConfig
