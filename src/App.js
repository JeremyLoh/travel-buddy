import React, { useEffect, useState } from "react"
import { CssBaseline, Grid } from "@material-ui/core"
import Header from "./components/Header/Header"
import List from "./components/List/List"
import Map from "./components/Map/Map"
import { getPlaces } from "./api"

export const PlaceContext = React.createContext()

function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

function App() {
    const [places, setPlaces] = useState([])
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [mapMarkerClicked, setMapMarkerClicked] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState("restaurants")
    const [rating, setRating] = useState("")

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude})
        })
    }, [])

    useEffect(() => {
        const filteredPlaces = places?.filter((place) => Number(place.rating) >= rating)
        setFilteredPlaces(filteredPlaces || [])
    }, [rating])

    useEffect(() => {
        console.log(coordinates, bounds)
        if (isEmpty(coordinates) || isEmpty(bounds)) {
          return
        }
        setIsLoading(true)

        // const data = [
        //   {
        //     "id": "Exk1PZgGtjy7Z3rm9ax",
        //     "location_id": "5583593",
        //     "name": "Yan Palace Restaurant",
        //     "latitude": "1.38418",
        //     "longitude": "103.73712",
        //     "num_reviews": "22",
        //     "timezone": "Asia/Singapore",
        //     "location_string": "Singapore",
        //     "photo": {
        //       "images": {
        //         "small": {
        //           "width": "150",
        //           "url": "https://media-cdn.tripadvisor.com/media/photo-l/05/e1/cb/ef/seafood-crispy-noodles.jpg",
        //           "height": "150"
        //         },
        //         "thumbnail": {
        //           "width": "50",
        //           "url": "https://media-cdn.tripadvisor.com/media/photo-t/05/e1/cb/ef/seafood-crispy-noodles.jpg",
        //           "height": "50"
        //         },
        //         "original": {
        //           "width": "2048",
        //           "url": "https://media-cdn.tripadvisor.com/media/photo-o/05/e1/cb/ef/seafood-crispy-noodles.jpg",
        //           "height": "1536"
        //         },
        //         "large": {
        //           "width": "550",
        //           "url": "https://media-cdn.tripadvisor.com/media/photo-s/05/e1/cb/ef/seafood-crispy-noodles.jpg",
        //           "height": "412"
        //         },
        //         "medium": {
        //           "width": "250",
        //           "url": "https://media-cdn.tripadvisor.com/media/photo-f/05/e1/cb/ef/seafood-crispy-noodles.jpg",
        //           "height": "187"
        //         }
        //       },
        //       "is_blessed": true,
        //       "uploaded_date": "2014-05-18T06:05:06-0400",
        //       "caption": "Seafood Crispy Noodles",
        //       "id": "98683887",
        //       "helpful_votes": "2",
        //       "published_date": "2014-05-19T15:36:22-0400",
        //       "user": {
        //         "user_id": null,
        //         "member_id": "0",
        //         "type": "user"
        //       }
        //     },
        //     "awards": [],
        //     "doubleclick_zone": "as.singapore.singapore_city",
        //     "preferred_map_engine": "default",
        //     "raw_ranking": "3.117788314819336",
        //     "ranking_geo": "Singapore",
        //     "ranking_geo_id": "294265",
        //     "ranking_position": "4044",
        //     "ranking_denominator": "11081",
        //     "ranking_category": "restaurant",
        //     "ranking": "#3,518 of 12,558 Restaurants in Singapore",
        //     "distance": "1.0690707362122032",
        //     "distance_string": "1.1 km",
        //     "bearing": "east",
        //     "rating": "4.0",
        //     "is_closed": false,
        //     "open_now_text": "Closed Now",
        //     "is_long_closed": false,
        //     "price_level": "$$ - $$$",
        //     "neighborhood_info": [
        //       {
        //         "location_id": "15622349",
        //         "name": "Western Water Catchment"
        //       }
        //     ],
        //     "description": "",
        //     "web_url": "https://www.tripadvisor.com/Restaurant_Review-g294265-d5583593-Reviews-Yan_Palace_Restaurant-Singapore.html",
        //     "write_review": "https://www.tripadvisor.com/UserReview-g294265-d5583593-Yan_Palace_Restaurant-Singapore.html",
        //     "ancestors": [
        //       {
        //         "subcategory": [
        //           {
        //             "key": "city",
        //             "name": "City"
        //           }
        //         ],
        //         "name": "Singapore",
        //         "abbrv": null,
        //         "location_id": "294265"
        //       },
        //       {
        //         "subcategory": [
        //           {
        //             "key": "country",
        //             "name": "Country"
        //           }
        //         ],
        //         "name": "Singapore",
        //         "abbrv": null,
        //         "location_id": "294262"
        //       }
        //     ],
        //     "category": {
        //       "key": "restaurant",
        //       "name": "Restaurant"
        //     },
        //     "subcategory": [],
        //     "parent_display_name": "Singapore",
        //     "is_jfy_enabled": false,
        //     "nearest_metro_station": [],
        //     "phone": "+65 6760 6616",
        //     "website": "http://www.yanpalace.com.sg",
        //     "address_obj": {
        //       "street1": "81 Choa Chu Kang Way",
        //       "street2": "Warren Golf & Country Club",
        //       "city": "Singapore",
        //       "state": null,
        //       "country": "Singapore",
        //       "postalcode": "688263"
        //     },
        //     "address": "81 Choa Chu Kang Way Warren Golf & Country Club, Singapore 688263 Singapore",
        //     "hours": {
        //       "week_ranges": [
        //         [
        //           {
        //             "open_time": 600,
        //             "close_time": 855
        //           },
        //           {
        //             "open_time": 1110,
        //             "close_time": 1320
        //           }
        //         ],
        //         [
        //           {
        //             "open_time": 660,
        //             "close_time": 855
        //           },
        //           {
        //             "open_time": 1110,
        //             "close_time": 1320
        //           }
        //         ],
        //         [
        //           {
        //             "open_time": 660,
        //             "close_time": 855
        //           },
        //           {
        //             "open_time": 1110,
        //             "close_time": 1320
        //           }
        //         ],
        //         [
        //           {
        //             "open_time": 660,
        //             "close_time": 855
        //           },
        //           {
        //             "open_time": 1110,
        //             "close_time": 1320
        //           }
        //         ],
        //         [
        //           {
        //             "open_time": 660,
        //             "close_time": 855
        //           },
        //           {
        //             "open_time": 1110,
        //             "close_time": 1320
        //           }
        //         ],
        //         [
        //           {
        //             "open_time": 660,
        //             "close_time": 855
        //           },
        //           {
        //             "open_time": 1110,
        //             "close_time": 1320
        //           }
        //         ],
        //         [
        //           {
        //             "open_time": 660,
        //             "close_time": 855
        //           },
        //           {
        //             "open_time": 1110,
        //             "close_time": 1320
        //           }
        //         ]
        //       ],
        //       "timezone": "Asia/Singapore"
        //     },
        //     "is_candidate_for_contact_info_suppression": false,
        //     "cuisine": [
        //       {
        //         "key": "5379",
        //         "name": "Chinese"
        //       },
        //       {
        //         "key": "10659",
        //         "name": "Asian"
        //       }
        //     ],
        //     "dietary_restrictions": [],
        //     "establishment_types": [
        //       {
        //         "key": "10591",
        //         "name": "Restaurants"
        //       }
        //     ]
        //   },
        //   {
        //     "id": "fM4vGDm2DvRe6zfKOWXRW",
        //     "location_id": "11747195",
        //     "name": "Amber West Restaurant",
        //     "latitude": "1.376113",
        //     "longitude": "103.75284",
        //     "num_reviews": "11",
        //     "timezone": "Asia/Singapore",
        //     "location_string": "Singapore",
        //     "photo": {
        //       "images": {
        //         "small": {
        //           "width": "150",
        //           "url": "https://media-cdn.tripadvisor.com/media/photo-l/1a/ab/fa/32/let-our-chefs-whip-you.jpg",
        //           "height": "150"
        //         },
        //         "thumbnail": {
        //           "width": "50",
        //           "url": "https://media-cdn.tripadvisor.com/media/photo-t/1a/ab/fa/32/let-our-chefs-whip-you.jpg",
        //           "height": "50"
        //         },
        //         "original": {
        //           "width": "1280",
        //           "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/ab/fa/32/let-our-chefs-whip-you.jpg",
        //           "height": "1274"
        //         },
        //         "large": {
        //           "width": "1024",
        //           "url": "https://media-cdn.tripadvisor.com/media/photo-w/1a/ab/fa/32/let-our-chefs-whip-you.jpg",
        //           "height": "1019"
        //         },
        //         "medium": {
        //           "width": "452",
        //           "url": "https://media-cdn.tripadvisor.com/media/photo-s/1a/ab/fa/32/let-our-chefs-whip-you.jpg",
        //           "height": "450"
        //         }
        //       },
        //       "is_blessed": true,
        //       "uploaded_date": "2020-01-21T21:57:14-0500",
        //       "caption": "Let our chefs whip you up a salad and our bartended shake you a drink!",
        //       "id": "447478322",
        //       "helpful_votes": "0",
        //       "published_date": "2020-01-21T21:57:14-0500",
        //       "user": {
        //         "user_id": null,
        //         "member_id": "0",
        //         "type": "user"
        //       }
        //     },
        //     "awards": [],
        //     "doubleclick_zone": "as.singapore.singapore_city",
        //     "preferred_map_engine": "default",
        //     "raw_ranking": "3.236605167388916",
        //     "ranking_geo": "Singapore",
        //     "ranking_geo_id": "294265",
        //     "ranking_position": "2286",
        //     "ranking_denominator": "11081",
        //     "ranking_category": "restaurant",
        //     "ranking": "#2,002 of 12,558 Restaurants in Singapore",
        //     "distance": "2.999890179196784",
        //     "distance_string": "3 km",
        //     "bearing": "east",
        //     "rating": "5.0",
        //     "is_closed": false,
        //     "open_now_text": "Closed today",
        //     "is_long_closed": false,
        //     "price_level": "$$ - $$$",
        //     "price": "SGD 13 - SGD 19",
        //     "neighborhood_info": [
        //       {
        //         "location_id": "15622638",
        //         "name": "Keat Hong"
        //       },
        //       {
        //         "location_id": "15622337",
        //         "name": "Choa Chu Kang"
        //       }
        //     ],
        //     "description": "Amber West provides students in Nitec in Food & Beverage Operations, Asian Culinary, and Western Culinary a real industry-operational environment. Students serve real customers and face the realities of day-to-day running of a restaurant for both lunch and dinner operations. Amber serves a variety of cuisines, accommodating different concepts of service including tableside and buffet style. Our menu is Asian from January to June and Western Dining from July to November. It has a seating capacity for 60 diners within its main dining area and can accommodate up to 12 persons in a private dining room that is available upon special request. https://www.chope.co/singapore-restaurants/restaurant/amber-west",
        //     "web_url": "https://www.tripadvisor.com/Restaurant_Review-g294265-d11747195-Reviews-Amber_West_Restaurant-Singapore.html",
        //     "write_review": "https://www.tripadvisor.com/UserReview-g294265-d11747195-Amber_West_Restaurant-Singapore.html",
        //     "ancestors": [
        //       {
        //         "subcategory": [
        //           {
        //             "key": "city",
        //             "name": "City"
        //           }
        //         ],
        //         "name": "Singapore",
        //         "abbrv": null,
        //         "location_id": "294265"
        //       },
        //       {
        //         "subcategory": [
        //           {
        //             "key": "country",
        //             "name": "Country"
        //           }
        //         ],
        //         "name": "Singapore",
        //         "abbrv": null,
        //         "location_id": "294262"
        //       }
        //     ],
        //     "category": {
        //       "key": "restaurant",
        //       "name": "Restaurant"
        //     },
        //     "subcategory": [
        //       {
        //         "key": "sit_down",
        //         "name": "Sit down"
        //       }
        //     ],
        //     "parent_display_name": "Singapore",
        //     "is_jfy_enabled": false,
        //     "nearest_metro_station": [],
        //     "phone": "+65 6431 0178",
        //     "website": "http://www.ite.edu.sg/colleges/ite-college-west/facilities/school-of-hospitality",
        //     "address_obj": {
        //       "street1": "1 Choa Chu Kang Grove Ite College West",
        //       "street2": "Blk 2, Level 4, ITE College West",
        //       "city": "Singapore",
        //       "state": null,
        //       "country": "Singapore",
        //       "postalcode": "688236"
        //     },
        //     "address": "1 Choa Chu Kang Grove Ite College West Blk 2, Level 4, ITE College West, Singapore 688236 Singapore",
        //     "hours": {
        //       "week_ranges": [
        //         [],
        //         [
        //           {
        //             "open_time": 720,
        //             "close_time": 870
        //           }
        //         ],
        //         [
        //           {
        //             "open_time": 720,
        //             "close_time": 870
        //           },
        //           {
        //             "open_time": 1080,
        //             "close_time": 1230
        //           }
        //         ],
        //         [
        //           {
        //             "open_time": 720,
        //             "close_time": 870
        //           },
        //           {
        //             "open_time": 1080,
        //             "close_time": 1230
        //           }
        //         ],
        //         [
        //           {
        //             "open_time": 720,
        //             "close_time": 870
        //           },
        //           {
        //             "open_time": 1080,
        //             "close_time": 1230
        //           }
        //         ],
        //         [
        //           {
        //             "open_time": 720,
        //             "close_time": 870
        //           },
        //           {
        //             "open_time": 1080,
        //             "close_time": 1230
        //           }
        //         ],
        //         []
        //       ],
        //       "timezone": "Asia/Singapore"
        //     },
        //     "is_candidate_for_contact_info_suppression": false,
        //     "cuisine": [
        //       {
        //         "key": "5086",
        //         "name": "French"
        //       },
        //       {
        //         "key": "10648",
        //         "name": "International"
        //       },
        //       {
        //         "key": "10659",
        //         "name": "Asian"
        //       },
        //       {
        //         "key": "10714",
        //         "name": "Singaporean"
        //       }
        //     ],
        //     "dietary_restrictions": [],
        //     "booking": {
        //       "provider": "Chope.co",
        //       "url": "https://www.tripadvisor.com/Commerce?p=Restaurants_Chope&src=176773830&geo=11747195&from=api&area=reservation_button&slot=1&matchID=1&oos=0&cnt=1&silo=13539&bucket=485139&nrank=1&crank=1&clt=R&ttype=Restaurant&tm=222773882&managed=false&capped=false&gosox=2G39OwCtaobEl1sOYlGlULMgy70XepMCFLwvYHLkmqeeuev3FNMXaw-T0_oNJMD1NGi9I6nuBPmXmunT2F7Y2ZhVKCcaZcAixXwlU4C1V7c&cs=1d7c6ca9028a75a461fe6a7bca1fb5d09"
        //     },
        //     "reserve_info": {
        //       "id": "11747195",
        //       "provider": "Chope.co",
        //       "provider_img": "https://static.tacdn.com/img2/eateries/Chope_3.25.2019.png",
        //       "url": "https://www.tripadvisor.com/Commerce?p=Restaurants_Chope&src=176773830&geo=11747195&from=api&area=reservation_button&slot=1&matchID=1&oos=0&cnt=1&silo=13539&bucket=485139&nrank=1&crank=1&clt=R&ttype=Restaurant&tm=222773882&managed=false&capped=false&gosox=2G39OwCtaobEl1sOYlGlULMgy70XepMCFLwvYHLkmqeeuev3FNMXaw-T0_oNJMD1NGi9I6nuBPmXmunT2F7Y2ZhVKCcaZcAixXwlU4C1V7c&cs=1d7c6ca9028a75a461fe6a7bca1fb5d09",
        //       "booking_partner_id": null,
        //       "racable": false,
        //       "api_bookable": false,
        //       "timeslots": null,
        //       "bestoffer": null,
        //       "timeslot_offers": null,
        //       "button_text": "Reserve",
        //       "disclaimer_text": null,
        //       "banner_text": null
        //     },
        //     "establishment_types": [
        //       {
        //         "key": "10591",
        //         "name": "Restaurants"
        //       }
        //     ]
        //   },
        // ]
        // setPlaces(data)
        // setFilteredPlaces([])
        // setIsLoading(false)

        getPlaces(type, bounds.sw, bounds.ne)
         .then((data) => {
                console.log("App useEffect data -->", data)
                setPlaces(data)
                setFilteredPlaces([])
                setIsLoading(false)
            })
    }, [bounds, type])

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <PlaceContext.Provider value={{
                        type,
                        setType,
                        rating,
                        setRating,
                    }}>
                        <List
                          places={filteredPlaces.length ? filteredPlaces : places}
                          mapMarkerClicked={mapMarkerClicked}
                          isLoading={isLoading}
                        />
                    </PlaceContext.Provider>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setMapMarkerClicked={setMapMarkerClicked}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App