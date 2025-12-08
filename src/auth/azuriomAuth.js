const axios = require("axios")

const BASE_URL = "http://mysize.local.test/api/auth"

module.exports = {
    async login(email, password, code = null) {
        try {
            const body = { email, password }

            if (code) body.code = code

            let res = await axios.post(`${BASE_URL}/authenticate`, body)

            return {
                status: "success",
                user: res.data
            }
        } catch (err) {
            if (err.response?.data) return err.response.data
            return { status: "error", message: err.message }
        }
    },

    async verify(access_token) {
        try {
            let res = await axios.post(`${BASE_URL}/verify`, { access_token })
            return { status: "success", user: res.data }
        } catch (err) {
            return err.response?.data || { status: "error" }
        }
    },

    async logout(access_token) {
        try {
            await axios.post(`${BASE_URL}/logout`, { access_token })
            return { status: "success" }
        } catch (err) {
            return err.response?.data || { status: "error" }
        }
    }
}