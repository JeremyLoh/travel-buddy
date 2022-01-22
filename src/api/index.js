import axios from "axios"
import { nanoid } from "nanoid"


export async function getPlaces(type, sw, ne) {
    try {
        const LIST_PLACES_URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
        const options = {
            headers: {
                "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
                "x-rapidapi-key": "ADD_API_KEY_FROM_RAPID_API",
            },
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                limit: "30",
                currency: "SGD",
                open_now: "false",
                lunit: "km",
                lang: "en_US"
            },
        }
        const response = await axios.get(LIST_PLACES_URL, options)
        console.log("getPlaces data -->", response.data.data)
        return response.data.data
            .filter((place) => place.address != null)
            .map((place) => {
                return {
                    ...place,
                    id: nanoid()
                }
            })
    } catch (error) {
        console.log("getPlaces error -->", error)
    }
}
