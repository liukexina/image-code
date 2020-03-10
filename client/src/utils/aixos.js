import axios from "axios"

const axiosIns = axios.create({
    baseURL: "/",
    timeout: 10000,
    responseType: "json",
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
})

axiosIns.interceptors.request.use(
    config => {
        return config
    },
    error => Promise.reject(error)
)

axiosIns.interceptors.response.use(result => result.data, error => Promise.reject(error))

const get = (url, params = null, config = {}) => axiosIns.get(url, { ...config, params })
const post = axiosIns.post
const all = axiosIns.all
export { get, post, all }
