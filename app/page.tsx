'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';

interface ApiData {
    ip: String,
  network: String,
  version: String,
  city: String,
  region: String,
  region_code: String,
  country: String,
  country_name: String,
  country_code: String,
  country_code_iso3: String,
  country_capital: String,
  country_tld: String,
  continent_code: String,
  in_eu: boolean,
  postal: String,
  latitude: Number,
  longitude: Number,
  timezone: String,
  utc_offset: String,
  country_calling_code: String,
  currency: String,
  currency_name: String,
  languages: String,
  country_area: Number,
  country_population: Number,
  asn: String,
  org: String
}

const Api = async () => {
  const [apiData, setApiData] = useState<ApiData>();
  fetch('https://ipapi.co/8.8.8.8/json/')
.then((response) => {
   response.json().then(jsonData => {
    console.log(jsonData);
    setApiData(jsonData);
  });
})
.catch(function(error) {
  console.log(error)
});
  console.log(apiData)
}

export default function Home() {
  
  return (
   <div>
    
   </div> 
  )
}
