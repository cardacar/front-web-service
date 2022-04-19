import axios from "axios"

const APIURL = "http://localhost:8089/Lab7Back/personas"

export const getAllEmployees = async () => {
    const response = await axios.get(APIURL)
    return response
}

export const updateEmployees = async (id, data) => {
    await axios.put(`${APIURL}/${id}`, data)
}

export const createEmplotees = async (data) => {
    await axios.post(`${APIURL}`, data)
}

export const deleteEmployee = async (id) => {
    await axios.delete(`${APIURL}/${id}`)
}