import axios from "axios"
import { useToast } from "vue-toastification"

const API_BASE_URL = 'http://127.0.0.1:8000/api'

const toast = useToast()

export const handlePlaceRequest = async (requestFN) => {
        try {
            const res = await requestFN()
            if(res.data.error) {
                toast.error(res.data.error, { timeout: 3000 })
            } else {
                return res.data
            }
        } catch (error) {  
            if(error?.res?.status === 404) {
                    toast.error("Reservation not found.", {
                    timeout: 4000
                })
           }else {
                    toast.error("Something went wrong try again later.", {
                    timeout: 4000
                })
            }      
            console.log('Full error:', error);
        }
    }


export const reservePlaceApi = (placeId) => axios.post(`${API_BASE_URL}/book/reservation`, {
    place_id: placeId
})