"use strict";var main=document.getElementById("main"),start=document.getElementById("start"),levelHTML=document.getElementById("level"),startConfirm=document.getElementById("startConfirm"),input=document.getElementById("input"),select=document.getElementById("select"),fomr=document.getElementById("form"),pattern=[],userSlected=[],on=!1,index=0,level=0,enabled=!1,time=500,gameOver=!1,name="",dificult="";main.addEventListener("click",(function(e){if(console.log(userSlected),"start"==e.target.id&&(e.target.disabled=!0,document.getElementById("lightbox").classList.add("lightbox--show")),enabled){switch(e.target.id){case"green":userSlected.push("green");break;case"red":userSlected.push("red");break;case"yellow":userSlected.push("yellow");break;case"blue":userSlected.push("blue")}validate()}})),startConfirm.addEventListener("click",(function(e){if(e.preventDefault(),name=input.value,dificult=select[select.selectedIndex].value,form.checkValidity()){switch(levelHTML.style.display="block",gameOver=!1,document.getElementById("lightbox").classList.remove("lightbox--show"),dificult){case"easy":time=1e3;break;case"medium":time=600;break;case"hard":time=200}console.log("".concat(name,": ").concat(dificult)),setTimeout("setColor()",500)}else""==name&&alert("Insert a name")}));var setColor=function(){switch(level+=1,start.innerHTML="...",levelHTML.firstElementChild.innerHTML=level,Math.floor(4*Math.random())+1){case 1:pattern.push("green");break;case 2:pattern.push("red");break;case 3:pattern.push("yellow");break;case 4:pattern.push("blue")}var e=setInterval((function(){console.log(pattern),index>=pattern.length?(index=0,on=!1,start.innerHTML="Select",document.getElementById("green").classList.add("green__enabled"),document.getElementById("red").classList.add("red__enabled"),document.getElementById("yellow").classList.add("yellow__enabled"),document.getElementById("blue").classList.add("blue__enabled"),enabled=!0,clearInterval(e)):on?(document.getElementById(pattern[index]).classList.remove("".concat(pattern[index],"__light")),on=!1,index+=1):(document.getElementById(pattern[index]).classList.add("".concat(pattern[index],"__light")),on=!0)}),time)},validate=function(){var e=userSlected.length-1;userSlected[e]==pattern[e]?(console.log("correct"),e+=1):(start.disabled=!1,e=0,start.innerHTML="Error",console.log("error"),gameOver=!0,reset()),e!=pattern.length||gameOver||(start.innerHTML="Correct",userSlected=[],document.getElementById("green").classList.remove("green__enabled"),document.getElementById("red").classList.remove("red__enabled"),document.getElementById("yellow").classList.remove("yellow__enabled"),document.getElementById("blue").classList.remove("blue__enabled"),enabled=!1,setTimeout("setColor()",time))},reset=function(){pattern=[],userSlected=[],level=0,start.innerHTML="Start",levelHTML.firstElementChild.innerHTML=level,levelHTML.style.display="none"};