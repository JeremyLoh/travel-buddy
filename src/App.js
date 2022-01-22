import React, { useEffect, useState } from "react"
import { CssBaseline, Grid } from "@material-ui/core"

import Header from "./components/Header/Header"
import List from "./components/List/List"
import Map from "./components/Map/Map"
import { getPlaces } from "./api"

function App() {
    const [places, setPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude})
        })
    }, [])

    useEffect(() => {
        console.log(coordinates, bounds)
        const data = [
            {
                "location_id": "11707706",
                "name": "Kincafe - Salvaged Ring Dien Khanh",
                "latitude": "12.264778",
                "longitude": "109.10869",
                "num_reviews": "1",
                "timezone": "Asia/Ho_Chi_Minh",
                "location_string": "Nha Trang, Khanh Hoa Province",
                "photo": {
                  "images": {
                    "small": {
                      "width": "150",
                      "url": "https://media-cdn.tripadvisor.com/media/photo-l/0d/53/95/c9/getlstd-property-photo.jpg",
                      "height": "150"
                    },
                    "thumbnail": {
                      "width": "50",
                      "url": "https://media-cdn.tripadvisor.com/media/photo-t/0d/53/95/c9/getlstd-property-photo.jpg",
                      "height": "50"
                    },
                    "original": {
                      "width": "2048",
                      "url": "https://media-cdn.tripadvisor.com/media/photo-o/0d/53/95/c9/getlstd-property-photo.jpg",
                      "height": "1365"
                    },
                    "large": {
                      "width": "1024",
                      "url": "https://media-cdn.tripadvisor.com/media/photo-w/0d/53/95/c9/getlstd-property-photo.jpg",
                      "height": "683"
                    },
                    "medium": {
                      "width": "550",
                      "url": "https://media-cdn.tripadvisor.com/media/photo-s/0d/53/95/c9/getlstd-property-photo.jpg",
                      "height": "367"
                    }
                  },
                  "is_blessed": true,
                  "uploaded_date": "2016-10-17T00:15:19-0400",
                  "caption": "getlstd_property_photo",
                  "id": "223581641",
                  "helpful_votes": "3",
                  "published_date": "2016-10-17T00:15:19-0400",
                  "user": {
                    "user_id": null,
                    "member_id": "0",
                    "type": "user"
                  }
                },
                "awards": [],
                "doubleclick_zone": "as.vietnam.khanh_hoa.nha_trang",
                "preferred_map_engine": "default",
                "raw_ranking": "3.0262691974639893",
                "ranking_geo": "Nha Trang",
                "ranking_geo_id": "293928",
                "ranking_position": "538",
                "ranking_denominator": "631",
                "ranking_category": "restaurant",
                "ranking": "#412 of 636 Restaurants in Nha Trang",
                "distance": "8.843051774354308",
                "distance_string": "8.8 km",
                "bearing": "south",
                "rating": "5.0",
                "is_closed": false,
                "open_now_text": "Open Now",
                "is_long_closed": false,
                "price_level": "$",
                "price": "SGD 18,836 - SGD 94,180",
                "description": "Kincafe - Salvaged Ring Dien Khanh is one of the world's top 20 architecture 2014.",
                "web_url": "https://www.tripadvisor.com/Restaurant_Review-g293928-d11707706-Reviews-Kincafe_Salvaged_Ring_Dien_Khanh-Nha_Trang_Khanh_Hoa_Province.html",
                "write_review": "https://www.tripadvisor.com/UserReview-g293928-d11707706-Kincafe_Salvaged_Ring_Dien_Khanh-Nha_Trang_Khanh_Hoa_Province.html",
                "ancestors": [
                  {
                    "subcategory": [
                      {
                        "key": "city",
                        "name": "City"
                      }
                    ],
                    "name": "Nha Trang",
                    "abbrv": null,
                    "location_id": "293928"
                  },
                  {
                    "subcategory": [
                      {
                        "key": "province",
                        "name": "Province"
                      }
                    ],
                    "name": "Khanh Hoa Province",
                    "abbrv": null,
                    "location_id": "1184689"
                  },
                  {
                    "subcategory": [
                      {
                        "key": "country",
                        "name": "Country"
                      }
                    ],
                    "name": "Vietnam",
                    "abbrv": null,
                    "location_id": "293921"
                  }
                ],
                "category": {
                  "key": "restaurant",
                  "name": "Restaurant"
                },
                "subcategory": [
                  {
                    "key": "cafe",
                    "name": "Café"
                  }
                ],
                "parent_display_name": "Nha Trang",
                "is_jfy_enabled": false,
                "nearest_metro_station": [],
                "phone": "+84 89 803 40 39",
                "website": "http://www.facebook.com/kincafenhatrang",
                "email": "minhkhangwood@gmail.com",
                "address_obj": {
                  "street1": "Hung Vuong",
                  "street2": "Dien Khanh",
                  "city": "Nha Trang",
                  "state": null,
                  "country": "Vietnam",
                  "postalcode": "650000"
                },
                "address": "Hung Vuong Dien Khanh, Nha Trang 650000 Vietnam",
                "hours": {
                  "week_ranges": [
                    [
                      {
                        "open_time": 360,
                        "close_time": 1320
                      }
                    ],
                    [
                      {
                        "open_time": 360,
                        "close_time": 1320
                      }
                    ],
                    [
                      {
                        "open_time": 360,
                        "close_time": 1320
                      }
                    ],
                    [
                      {
                        "open_time": 360,
                        "close_time": 1320
                      }
                    ],
                    [
                      {
                        "open_time": 360,
                        "close_time": 1320
                      }
                    ],
                    [
                      {
                        "open_time": 360,
                        "close_time": 1320
                      }
                    ],
                    [
                      {
                        "open_time": 360,
                        "close_time": 1320
                      }
                    ]
                  ],
                  "timezone": "Asia/Ho_Chi_Minh"
                },
                "is_candidate_for_contact_info_suppression": false,
                "cuisine": [
                  {
                    "key": "10642",
                    "name": "Cafe"
                  }
                ],
                "dietary_restrictions": [],
                "establishment_types": [
                  {
                    "key": "10591",
                    "name": "Restaurants"
                  }
                ]
              },
            {
                "location_id": "9982902",
                "name": "Yolo Man Restaurant",
                "latitude": "12.270622",
                "longitude": "109.108154",
                "num_reviews": "3",
                "timezone": "Asia/Ho_Chi_Minh",
                "location_string": "Dien Dien, Khanh Hoa Province",
                "photo": {
                  "images": {
                    "small": {
                      "width": "250",
                      "url": "https://media-cdn.tripadvisor.com/media/photo-f/0a/35/c6/91/getlstd-property-photo.jpg",
                      "height": "144"
                    },
                    "thumbnail": {
                      "width": "50",
                      "url": "https://media-cdn.tripadvisor.com/media/photo-t/0a/35/c6/91/getlstd-property-photo.jpg",
                      "height": "50"
                    },
                    "original": {
                      "width": "550",
                      "url": "https://media-cdn.tripadvisor.com/media/photo-s/0a/35/c6/91/getlstd-property-photo.jpg",
                      "height": "318"
                    },
                    "large": {
                      "width": "550",
                      "url": "https://media-cdn.tripadvisor.com/media/photo-s/0a/35/c6/91/getlstd-property-photo.jpg",
                      "height": "318"
                    },
                    "medium": {
                      "width": "438",
                      "url": "https://media-cdn.tripadvisor.com/media/photo-o/0a/35/c6/91/getlstd-property-photo.jpg",
                      "height": "254"
                    }
                  },
                  "is_blessed": true,
                  "uploaded_date": "2016-02-02T08:55:35-0500",
                  "caption": "getlstd_property_photo",
                  "id": "171296401",
                  "helpful_votes": "0",
                  "published_date": "2016-02-02T08:55:35-0500",
                  "user": {
                    "user_id": null,
                    "member_id": "0",
                    "type": "user"
                  }
                },
                "awards": [],
                "doubleclick_zone": "as.vietnam",
                "preferred_map_engine": "default",
                "raw_ranking": "3.060120105743408",
                "ranking_geo": "Dien Dien",
                "ranking_geo_id": "15296278",
                "ranking_position": "1",
                "ranking_denominator": "1",
                "ranking_category": "restaurant",
                "ranking": "#1 of 1 Restaurants in Dien Dien",
                "distance": "8.213921327616687",
                "distance_string": "8.2 km",
                "bearing": "south",
                "rating": "5.0",
                "is_closed": false,
                "open_now_text": "Open Now",
                "is_long_closed": false,
                "price_level": "$$ - $$$",
                "price": "SGD 26,909 - SGD 672,715",
                "description": "",
                "web_url": "https://www.tripadvisor.com/Restaurant_Review-g15296278-d9982902-Reviews-Yolo_Man_Restaurant-Dien_Dien_Khanh_Hoa_Province.html",
                "write_review": "https://www.tripadvisor.com/UserReview-g15296278-d9982902-Yolo_Man_Restaurant-Dien_Dien_Khanh_Hoa_Province.html",
                "ancestors": [
                  {
                    "subcategory": [
                      {
                        "key": "city",
                        "name": "City"
                      }
                    ],
                    "name": "Dien Dien",
                    "abbrv": null,
                    "location_id": "15296278"
                  },
                  {
                    "subcategory": [
                      {
                        "key": "province",
                        "name": "Province"
                      }
                    ],
                    "name": "Khanh Hoa Province",
                    "abbrv": null,
                    "location_id": "1184689"
                  },
                  {
                    "subcategory": [
                      {
                        "key": "country",
                        "name": "Country"
                      }
                    ],
                    "name": "Vietnam",
                    "abbrv": null,
                    "location_id": "293921"
                  }
                ],
                "category": {
                  "key": "restaurant",
                  "name": "Restaurant"
                },
                "subcategory": [
                  {
                    "key": "sit_down",
                    "name": "Sit down"
                  }
                ],
                "parent_display_name": "Dien Dien",
                "is_jfy_enabled": false,
                "nearest_metro_station": [],
                "phone": "+84 58 3772 279",
                "website": "https://www.facebook.com/YOLO-Man-Restaurant-1569064976708000/",
                "email": "thinn80@gmail.com",
                "address_obj": {
                  "street1": "24 Dong Khoi",
                  "street2": null,
                  "city": "Dien Dien",
                  "state": null,
                  "country": "Vietnam",
                  "postalcode": "650000"
                },
                "address": "24 Dong Khoi, Dien Dien 650000 Vietnam",
                "hours": {
                  "week_ranges": [
                    [
                      {
                        "open_time": 540,
                        "close_time": 1380
                      }
                    ],
                    [
                      {
                        "open_time": 540,
                        "close_time": 1380
                      }
                    ],
                    [
                      {
                        "open_time": 540,
                        "close_time": 1380
                      }
                    ],
                    [
                      {
                        "open_time": 540,
                        "close_time": 1380
                      }
                    ],
                    [
                      {
                        "open_time": 540,
                        "close_time": 1380
                      }
                    ],
                    [
                      {
                        "open_time": 540,
                        "close_time": 1380
                      }
                    ],
                    [
                      {
                        "open_time": 540,
                        "close_time": 1380
                      }
                    ]
                  ],
                  "timezone": "Asia/Ho_Chi_Minh"
                },
                "is_candidate_for_contact_info_suppression": false,
                "cuisine": [
                  {
                    "key": "10675",
                    "name": "Vietnamese"
                  }
                ],
                "dietary_restrictions": [],
                "establishment_types": [
                  {
                    "key": "10591",
                    "name": "Restaurants"
                  }
                ]
              }
        ]
        setPlaces(data)

        // getPlaces(bounds.sw, bounds.ne)
        //  .then((data) => {
        //         console.log("App useEffect data -->", data)
        //         setPlaces(data)
        //     })
    }, [coordinates, bounds])

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <List places={places} />
                </Grid>

                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates} 
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App