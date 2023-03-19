import { game } from "./game.js"

const serverContainer = document.querySelector(".server")
const createServer = document.querySelector("#createServer")
const serverInput = document.querySelector("#serverInput")
const joinServer = document.querySelector("#joinServer")

const selectionContainer = document.querySelector(".selection")
const playerOne = document.getElementById("playerOne")
const playerTwo = document.getElementById("playerTwo")
const playerThree = document.getElementById("playerThree")
const playerFour = document.getElementById("playerFour")
const nameInput = document.getElementById("nameInput")
const startBtn = document.querySelector(".buttonContainer")
const box = document.querySelector(".box")
const showServerId = document.querySelector("#showServerId")

const infoContainer = document.querySelector(".info")
const serverIdShow = document.querySelector(".serverIdShow")
const playerCount = document.querySelector(".playerCount")
const playerOneName = document.querySelector(".playerOneName")
const playerTwoName = document.querySelector(".playerTwoName")
const playerThreeName = document.querySelector(".playerThreeName")
const playerFourName = document.querySelector(".playerFourName")


let serverId = "";
let clickCount = 0;
nameInput.value = localStorage.getItem("name") || ""

// Fire base

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
  import { getDatabase, ref, onValue, set, get, child, remove } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

  // Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDs3JGOd62lI6bBrVfV4ih8XcPmq3zEGoM",
    authDomain: "hit-the-ball-2800b.firebaseapp.com",
    databaseURL: "https://hit-the-ball-2800b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hit-the-ball-2800b",
    storageBucket: "hit-the-ball-2800b.appspot.com",
    messagingSenderId: "449864635851",
    appId: "1:449864635851:web:0a255ef432d59c3de5924e"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();

 

  // Listen for real-time updates
  onValue(ref(db, `hit-the-ball/`), (snapshot) => {
      if(serverId){
        const data = snapshot.val()?.[serverId]
        // Start game for every one
        if(data?.gameInfo === "playing"){
            selectionContainer.style.display = "none"
            box.style.display = "block"
            startBtn.style.display = "none"
            game(serverId)

            set(ref(db, `hit-the-ball/${serverId}/gameInfo`), `started`)
            .then(() => {

            })
            .catch((err) => {
            console.log("Err");
            })
        }else if(data?.gameInfo === "selection"){ // Selection side before start game
            playerCount.innerText = data?.playersCount
            if(data?.playerOne){
                playerOne.classList.add("select")
                playerOne.firstElementChild.innerText = `(${data?.playerOne?.Name})`
                playerOneName.innerText = data?.playerOne?.Name
            }else{
                playerOne.classList.remove("select")
                playerOne.firstElementChild.innerText = ``
                playerOneName.innerText = ""
            }
            if(data?.playerTwo){
                playerTwo.classList.add("select")
                playerTwo.firstElementChild.innerText = `(${data?.playerTwo?.Name})`
                playerTwoName.innerText = data?.playerTwo?.Name
            }else{
                playerTwo.classList.remove("select")
                playerTwo.firstElementChild.innerText = ``
                playerTwoName.innerText = ""
            }
            if(data?.playerThree){
                playerThree.classList.add("select")
                playerThree.firstElementChild.innerText = `(${data?.playerThree?.Name})`
                playerThreeName.innerText = data?.playerThree?.Name
            }else{
                playerThree.classList.remove("select")
                playerThree.firstElementChild.innerText = ``
                playerThreeName.innerText = ""
            }
            if(data?.playerFour){
                playerFour.classList.add("select")
                playerFour.firstElementChild.innerText = `(${data?.playerFour?.Name})`
                playerFourName.innerText = data?.playerFour?.Name
            }else{
                playerFour.classList.remove("select")
                playerFour.firstElementChild.innerText = ``
                playerFourName.innerText = ""
            }
        }
    }
  });

//   creating a new server
  createServer.addEventListener("click", () => {
    if(nameInput.value === ""){
        alert("Input your name")
    }else{
        // create server name
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let uniqueCode = '';
        for (let i = 0; i < 8; i++) { // generate an 8-letter code
          let randomIndex = Math.floor(Math.random() * letters.length);
          uniqueCode += letters[randomIndex];
        }
        uniqueCode += clickCount; // append the click count to make the code unique
        serverId = uniqueCode
        clickCount++; // increment the counter variable on every click
    
        // added some info in server
        showServerId.innerText = serverId
        serverIdShow.innerText = serverId
        const creatorName = nameInput.value
        localStorage.setItem("name", creatorName)
        set(ref(db, `hit-the-ball/${serverId}/`), {owner: creatorName, playersCount: "1",gameInfo: "selection", ballMiss: true, ballHolder: "" })
        .then(() => {
        //   console.log("Success");
        })
        .catch((err) => {
          console.log("Err");
        })

        // display side selection
        serverContainer.style.display = "none"
        selectionContainer.style.display = "block"
        startBtn.style.display = "block"
        startBtn.classList.remove("disable")
        infoContainer.style.display = "block"
    }
  })

//   join other player in server
  joinServer.addEventListener("click", () => {
    const dbRef = ref(getDatabase());
    serverId = serverInput.value

    if(nameInput.value === ""){
        alert("Input your name!")
    }else{
        if(serverId === ""){
            alert("Input the server id!")
        }else{
            get(child(dbRef, `hit-the-ball/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val()?.[serverId]);
                    if(snapshot.val()?.[serverId] ){

                        // if server exist in you can select side
                        showServerId.innerText = serverId
                        serverIdShow.innerText = serverId
                        serverContainer.style.display = "none"
                        selectionContainer.style.display = "block"
                        startBtn.style.display = "block"
                        infoContainer.style.display = "block"
                        localStorage.removeItem("player")
                        localStorage.setItem("name", nameInput.value)

                        // added a new player join
                        const playerCount = parseInt(snapshot.val()?.[serverId].playersCount)
                        set(ref(db, `hit-the-ball/${serverId}/playersCount`), `${(playerCount + 1).toString()}`)
                        .then(() => {
                        //   console.log("Success");
                        })
                        .catch((err) => {
                        console.log("Err");
                        })
                    }else{
                        alert("server does not exist!")
                    }
                    
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              });
            

        }
    }
  })

  // change the side owner
  const cngName = (leftPost) => {
    set(ref(db, `hit-the-ball/${serverId}/${leftPost.identy}`), {Name: leftPost.name, point: 10})
    .then(() => {
    //   console.log("Success");
    })
    .catch((err) => {
      console.log("Err");
    })
  }

//   selecting which side you select
const selected = (which) => {
    const selectedId = document.getElementById(which)
    if(selectedId.classList.contains("select")){
        console.log("This acha");
        alert("select another")
    }else{
        console.log("This Nai");
        const prevSelection = localStorage.getItem("player")
        remove(ref(getDatabase(), `hit-the-ball/${serverId}/${prevSelection}`))

        const selected = document.querySelector(".select")
        if(selected){
            selected.classList.remove("select")
        }
        selectedId.classList.add("select")
        localStorage.setItem("player", which)
        cngName({identy: which, name: `${nameInput.value}`})
    }

}

// all selection button
playerOne.addEventListener("click", () => {
    selected("playerOne")
    
})

playerTwo.addEventListener("click", () => {
    selected("playerTwo")
    // cngName({identy:"playerTwo", name: `${nameInput.value}`})
})

playerThree.addEventListener("click", () => {
    selected("playerThree")
    // cngName({identy:"playerThree", name: `${nameInput.value ? nameInput.value : "playerThree"}`})
})

playerFour.addEventListener("click", () => {
    selected("playerFour")
    // cngName({identy:"playerFour", name: `${nameInput.value ? nameInput.value : "playerFour"}`})
})


// Only server owner can start the game
startBtn.addEventListener("click", () => {
    set(ref(db, `hit-the-ball/${serverId}/gameInfo`), `playing`)
    .then(() => {
        selectionContainer.style.display = "none"
        box.style.display = "block"
        startBtn.style.display = "none"
        set(ref(db, `hit-the-ball/${serverId}/ballHolder`), `${localStorage.getItem("player")}`)
        .then(() => {
            
        })
        .catch((err) => {
        console.log("Err");
        })
        game(serverId)
    })
    .catch((err) => {
    console.log("Err");
    })
})
