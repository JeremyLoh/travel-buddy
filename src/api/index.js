import axios from "axios"
import { nanoid } from "nanoid"

const LIST_RESTAURANT_PLACES_URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary"

export async function getPlaces(sw, ne) {
    try {
        const options = {
            headers: {
                "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
                "x-rapidapi-key": "ADD_API_KEY_FROM_RAPID_API"
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
        const response = await axios.get(LIST_RESTAURANT_PLACES_URL, options)
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
