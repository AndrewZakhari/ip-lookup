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



export default function Home() {

  const [Error, setError] = useState<string | null>(null)
  const [ipData , setIpData] = useState<ApiData | null>(null)
  const [input ,setInput] = useState<string | null>(null)

 

  const handleSubmit = async (e : any) => { 
    e.preventDefault() 
    const res = await fetch(`https://ipapi.co/${input}/json/`);
    const data = await res.json();
    if(data.error){
      setError("Invalid IP Address")
    }
    else if(!data){
      setError("Error connecting to the server")
    }else{
    setIpData(data)
    
    setError(null)
    }
  }
  const getUserIP = async (e: any) => {
        e.preventDefault()
        const ipRes = await fetch("https://api.ipify.org/?format=json")
        const ipData = await ipRes.json()
        const res = await fetch(`https://ipapi.co/${ipData.ip}/json/`)
        const data = await res.json();
        setIpData(data)
  }
  return (
   <div className={styles.container}>
    {Error &&
    <div className={styles.error}>
      <p>{Error}</p>
    </div> 
    }
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} onChange={(e) => setInput(e.target.value)} name='ip' placeholder='ex: 8.8.8.8'/>   
      {input && 
      <button className={styles.button}>Find</button> 
      }
      {!input && 
      <button className={styles.button} type='button' onClick={getUserIP}>Lookup Your IP</button>
      }
    </form>
    { ipData && 
      <div className={styles.table}>
       <tr className={styles.mainRow}>
        <th className={styles.ip}>IP</th>
        <th className={styles.city}>City</th>
        <th className={styles.region}>Region</th>
        <th className={styles.regionCode}>Region Code</th>
        <th className={styles.country}>Country</th>
        <th className={styles.countryName}>Country Name</th>
        <th className={styles.latitude}>Latitude</th>
        <th className={styles.longitude}>Longitude</th>
        <th className={styles.timezone}>Timezone</th>
        <th className={styles.currency}>Currency</th>
        <th className={styles.languages}>Languages</th>
        </tr> 
        <tr className={styles.infoRow}>
          <td className={styles.ip}>{ipData.ip}</td>
          <td className={styles.city}>{ipData.city}</td>
          <td className={styles.countryName}>{ipData.country_name}</td>
          <td className={styles.region}>{ipData.region}</td>
          <td className={styles.regionCode}> {ipData.region_code}</td>
          <td className={styles.country}>{ipData.country}</td>
          <td className={styles.latitude}>{ipData.latitude.toString()}</td>
          <td className={styles.longitude}>{ipData.longitude.toString()}</td>
          <td className={styles.timezone}>{ipData.timezone}</td>
          <td className={styles.currency}>{ipData.currency}</td>
          <td className={styles.languages}>{ipData.languages}</td>
        </tr>
      </div>
    }
   </div> 
  )
}
