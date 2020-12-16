import React, { useEffect, useState } from "react";
import { Profile } from "../models/profile";
import "./App.scss";
import User from "./User";

interface State extends Profile {}

const App: React.FunctionComponent<{}> = () => {
  const [fullName, setFullName] = useState("Stephane");
  const [title, setTitle] = useState("Architecte");
  const [country, setCountry] = useState("New York");
  const [imageUrl, setImage] = useState("https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png");
  useEffect(() => {
    if(chrome &&chrome.tabs){
      chrome.tabs.query({ currentWindow: true, active: true}, tabs => {
        const tab = tabs[0]
        chrome.tabs.sendMessage(tab.id || 0, {from: "popup", subject: "getFullName"}, response => {
          setFullName(response.fullName);
          setTitle(response.title)
          setCountry(response.country)
          setImage(response.imageUrl)
        })
      })
    }
  })
  return (
    <div className="app">
      <User fullName={fullName} title={title} country={country} imageUrl={imageUrl}/>
    </div>
  );
}

export default App;
