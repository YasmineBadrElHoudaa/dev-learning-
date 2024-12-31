import React from "react";
import img from "./images.jpg"
import "./Notification.css"
function CV(){
    return(
<div id="koul">
<div id="div1">
<h1>N <br></br>---Mdi</h1>
<i id="prof">Web Developper</i>
<img src={img} id="chira"></img>
<h2>A propos</h2>
<h4>Ne le </h4>
<i>30</i><i>*</i><i>06</i><i>*</i><i>2022</i>
<h4>Wilaya</h4>
<p>31</p>
<h6>Permis de Conduite :</h6>
<p>Oui</p>
<p>Message</p>
<h2>Contact</h2>
<i>n.aodi</i>
<p>0000</p>

</div>
<div id="div2">
    <h1>Expèriences</h1>
    <p>Message</p>
    <span id="span1">
        <h3>Competences techniques</h3>
        <p>message</p>
    </span>
    <span id="span2">
        <h3>Competences Generales</h3>
        <p>choix1</p>
        <p>choix2</p>
        <p>xhoix3</p>
    </span>
    <span id="span3">
        <h1>Education</h1>
        <h4>Langages maitrises</h4>
        <i>choix1</i><h6>C1</h6>
        <i>choix2</i><h6>B1</h6>
    </span>
    <span id="span4">
        <h4>Niveau Academique:</h4>
         <p>Liscence</p>
    </span>

</div>
</div>
);
}
export default CV;