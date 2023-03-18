// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, ref, get, child, onValue, set } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
export function game(serverId){

    
    const ball = document.querySelector(".ball")
    const box = document.querySelector(".box")
    const paddle = document.querySelector(".paddle")
    const paddleTop = document.querySelector(".paddleTop")
    const paddleLeft = document.querySelector(".paddleLeft")
    const paddleRight = document.querySelector(".paddleRight")
    const brick = document.querySelector(".brick")

    const playerOnePoint = document.querySelector(".playerOnePoint")
    const playerTwoPoint = document.querySelector(".playerTwoPoint")
    const playerThreePoint = document.querySelector(".playerThreePoint")
    const playerFourPoint = document.querySelector(".playerFourPoint")
    
    const ballRadius = parseInt(getComputedStyle(ball).width.replace("px", ""))
    var delta
    
    var playerName = localStorage.getItem("player")
    var ballHolder = "playerOne"

    var x = 500
    var y = 300 //start game ball post
    var xAdd = -4;
    var yAdd = 4;

    const otherPaddle = (paddleData) => {
        if(playerName === "playerFour"){
            paddle.style.left = `${paddleData?.playerOne?.Paddle}px`
            paddleLeft.style.top = `${paddleData?.playerThree?.Paddle}px`
            paddleTop.style.left = `${paddleData?.playerTwo?.Paddle}px`
        }else if(playerName === "playerThree"){
            paddle.style.left = `${paddleData?.playerOne?.Paddle}px`
            paddleRight.style.top = `${paddleData?.playerFour?.Paddle}px`
            paddleTop.style.left = `${paddleData?.playerTwo?.Paddle}px`
        }else if(playerName === "playerTwo"){
            paddle.style.left = `${paddleData?.playerOne?.Paddle}px`
            paddleLeft.style.top = `${paddleData?.playerThree?.Paddle}px`
            paddleRight.style.top = `${paddleData?.playerFour?.Paddle}px`
        }else if(playerName === "playerOne"){
            paddleLeft.style.top = `${paddleData?.playerThree?.Paddle}px`
            paddleTop.style.left = `${paddleData?.playerTwo?.Paddle}px`
            paddleRight.style.top = `${paddleData?.playerFour?.Paddle}px`
        }
    }

    const reset = () => {
        stopRun()
        // set(ref(db, `hit-the-ball/${serverId}/ball`), {top: 300, left: 500})
        // .then(() => {
        // //   console.log("Success");
        // })
        // .catch((err) => {
        // console.log("Err");
        // })
    }
    
    // Fire base
    

    
      // Your web app's Firebase configuration
    //   const firebaseConfig = {
    //     apiKey: "AIzaSyDMtR1HjJJafyYWqzLxuppZiu-PBtfuLX0",
    //     authDomain: "paddle-hit.firebaseapp.com",
    //     projectId: "paddle-hit",
    //     storageBucket: "paddle-hit.appspot.com",
    //     messagingSenderId: "183694422838",
    //     appId: "1:183694422838:web:46cfc715a5c091354db997"
    //   };
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
        otherPaddle(snapshot.val()?.[serverId])
        if(snapshot.val()?.[serverId]?.ballMiss === true){
            console.log("ball miss")
            playerOnePoint.innerText = `(${snapshot.val()?.[serverId]?.playerOne?.point})`
            playerTwoPoint.innerText = `(${snapshot.val()?.[serverId]?.playerTwo?.point})`
            playerThreePoint.innerText = `(${snapshot.val()?.[serverId]?.playerThree?.point})`
            playerFourPoint.innerText = `(${snapshot.val()?.[serverId]?.playerFour?.point})`
            reset()
        }else if(snapshot.val()?.[serverId]?.ball){
            ball.setAttribute("style", `top: ${snapshot.val()?.[serverId]?.ball?.top}px; left: ${snapshot.val()?.[serverId]?.ball?.left}px;`)
        }
      });
    
      // Set data on button click
      const cngPaddle = (leftPost) => {
        set(ref(db, `hit-the-ball/${serverId}/${leftPost.identy}/Paddle`), leftPost.paddlePos)
        .then(() => {
            // if(leftPost.identy === "playerFour"){
            //     paddleRight.style.top = `${leftPost.paddlePos}px`
            // }else if(leftPost.identy === "playerThree"){
            //     paddleLeft.style.top = `${delta}px`
            // }else if(leftPost.identy === "playerTwo"){
            //     paddleTop.style.left = `${delta}px`
            // }else if(leftPost.identy === "playerOne"){
            //     paddle.style.left = `${delta}px`
            // }
        })
        .catch((err) => {
          console.log("Err");
        })
      }
    
    //   Paddle Move
    document.addEventListener("mousemove", (e) => {
        if(playerName === "playerFour"){
            // Right
        
            delta = e.clientY - 8 - (140 /2) ;
            if(delta > 0 && delta < 460){
                paddleRight.style.top = `${leftPost.paddlePos}px`
                cngPaddle({identy:"playerFour", paddlePos: delta})
            }
        }
        if(playerName === "playerThree"){
            // Left
        
            delta = e.clientY - 8 - (140 /2) ;
            if(delta > 0 && delta < 460){
                paddleLeft.style.top = `${delta}px`
                cngPaddle({identy:"playerThree", paddlePos: delta})
            }
        }
        if(playerName === "playerTwo"){
            // Top
    
            delta = e.clientX - 212 - (140 /2) ;
            if(delta > 0 && delta < 860){
                paddleTop.style.left = `${delta}px`
                cngPaddle({identy:"playerTwo", paddlePos: delta})
            }
        }
        if(playerName === "playerOne"){
            // Bottom
    
            delta = e.clientX - 212 - (140 /2) ;
            if(delta > 0 && delta < 860){
                paddle.style.left = `${delta}px`
                cngPaddle({identy:"playerOne", paddlePos: delta})
            }
        }
    })
    const dbRef = ref(getDatabase());

    
    function run() {
        console.log(ballHolder);
        // ball.setAttribute("style", `top: ${y}px; left: ${x}px;`)
        if(playerName === ballHolder){
            set(ref(db, `hit-the-ball/${serverId}/ball`), {top: y, left: x})
            .then(() => {
            //   console.log("Success");
            })
            .catch((err) => {
              console.log("Err");
            })
        }

        const boxWidth = parseInt(getComputedStyle(box).width.replace("px", ""))
        const boxHeight = parseInt(getComputedStyle(box).height.replace("px", ""))
        // Paddle bottom
        let paddleStart = parseInt(getComputedStyle(paddle).left.replace("px", ""))
        let paddleWidth = parseInt(getComputedStyle(paddle).width.replace("px", ""))
        let paddleHeight = parseInt(getComputedStyle(paddle).height.replace("px", ""))
        // Paddle top
        let paddleTopStart = parseInt(getComputedStyle(paddleTop).left.replace("px", ""))
        let paddleTopWidth = parseInt(getComputedStyle(paddleTop).width.replace("px", ""))
        let paddleTopTopPos = parseInt(getComputedStyle(paddleTop).top.replace("px", ""))
        let paddleTopHeight = parseInt(getComputedStyle(paddleTop).height.replace("px", ""))
    
        // Paddle Left
        let paddleLeftStart = parseInt(getComputedStyle(paddleLeft).left.replace("px", ""))
        let paddleLeftWidth = parseInt(getComputedStyle(paddleLeft).width.replace("px", ""))
        let paddleLeftTopPos = parseInt(getComputedStyle(paddleLeft).top.replace("px", ""))
        let paddleLeftHeight = parseInt(getComputedStyle(paddleLeft).height.replace("px", ""))
    
        // Paddle Right
        let paddleRightStart = parseInt(getComputedStyle(paddleRight).left.replace("px", ""))
        let paddleRightWidth = parseInt(getComputedStyle(paddleRight).width.replace("px", ""))
        let paddleRightTopPos = parseInt(getComputedStyle(paddleRight).top.replace("px", ""))
        let paddleRightHeight = parseInt(getComputedStyle(paddleRight).height.replace("px", ""))
    
        
        // if(x <= (boxWidth -(boxWidth - (paddleLeftWidth*2) ))){ //LEft
        if(x <= (0 + paddleLeftStart + paddleLeftWidth)){ //LEft
            get(child(dbRef, `hit-the-ball/`)).then((snapshot) => {
                if(snapshot.val()?.[serverId]?.playerThree){
                    if(y >= paddleLeftTopPos  && y <= (paddleLeftTopPos + paddleLeftHeight)){
                        xAdd = 4
                        console.log("Hit");
                    }else{
                        console.log("Not hit");
                        if(x === 0){
                            set(ref(db, `hit-the-ball/${serverId}/ballMiss`), true)
                            .then(() => {
                                
                                get(child(dbRef, `hit-the-ball/`)).then((snapshot) => {
                                    const point = parseInt(snapshot.val()?.[serverId]?.playerThree?.point)
                                    set(ref(db, `hit-the-ball/${serverId}/playerThree/point`), `${point - 1}`)
                                    .then(() => {
                                        console.log(point);
                                        // ballHolder = "playerThree"
                                    })
                                    .catch((err) => {
                                    console.log("Err");
                                    })
                                })
                                
                            })
                            .catch((err) => {
                            console.log("Err");
                            })
                        }
                    }
                }else{
                    xAdd = 4 
                }
            })
        }else if(x >= (boxWidth - (boxWidth- paddleRightStart + paddleRightWidth))){ //right
            get(child(dbRef, `hit-the-ball/`)).then((snapshot) => {
                if(snapshot.val()?.[serverId]?.playerFour){
                    if(y >= paddleRightTopPos  && y <= (paddleRightTopPos + paddleRightHeight)){
                        xAdd = -4
                        console.log("Hit");
                    }else{
                        console.log("Not hit");
                        if(x >= 965){
                            set(ref(db, `hit-the-ball/${serverId}/ballMiss`), true)
                            .then(() => {
                                
                                get(child(dbRef, `hit-the-ball/`)).then((snapshot) => {
                                    const point = parseInt(snapshot.val()?.[serverId]?.playerFour?.point)
                                    set(ref(db, `hit-the-ball/${serverId}/playerFour/point`), `${point - 1}`)
                                    .then(() => {
                                        // ballHolder = "playerOne"
                                    })
                                    .catch((err) => {
                                    console.log("Err");
                                    })
                                })
                            })
                            .catch((err) => {
                            console.log("Err");
                            })
                        }
                    }
                }else{
                    xAdd = -4
                }
            })
            
        }else if(y >= (boxHeight - ((paddleTopHeight*2) + (ballRadius/2)))){ //Bottom
            get(child(dbRef, `hit-the-ball/`)).then((snapshot) => {
                if(snapshot.val()?.[serverId]?.playerOne){
                    if(x >= paddleStart && x <= (paddleWidth + paddleStart)){
                        console.log("paddle acha");
                        yAdd = -4
                    }else{
                        console.log("paddle Nai");
                        if(y >= 582){
                            set(ref(db, `hit-the-ball/${serverId}/ballMiss`), true)
                            .then(() => {
                                
                                get(child(dbRef, `hit-the-ball/`)).then((snapshot) => {
                                    const point = parseInt(snapshot.val()?.[serverId]?.playerOne?.point)
                                    set(ref(db, `hit-the-ball/${serverId}/playerOne/point`), `${point - 1}`)
                                    .then(() => {
                                        // ballHolder = "playerOne"
                                    })
                                    .catch((err) => {
                                    console.log("Err");
                                    })
                                })
                            })
                            .catch((err) => {
                            console.log("Err");
                            })
                        }
                    }
                }else{
                    yAdd = -4
                }
            })
        }else if(y <= boxHeight - (boxHeight - (paddleTopHeight*2))){ // Top
                get(child(dbRef, `hit-the-ball/`)).then((snapshot) => {
                    if(snapshot.val()?.[serverId]?.playerTwo){
                        if(x >= paddleTopStart && x <= (paddleTopWidth + paddleTopStart)){
                            yAdd = 4
                        }else{
                            if(y === 0){
                                set(ref(db, `hit-the-ball/${serverId}/ballMiss`), true)
                                .then(() => {
                                    get(child(dbRef, `hit-the-ball/`)).then((snapshot) => {
                                        const point = parseInt(snapshot.val()?.[serverId]?.playerTwo?.point)
                                        set(ref(db, `hit-the-ball/${serverId}/playerTwo/point`), `${point - 1}`)
                                        .then(() => {
                                            // ballHolder = "playerOne"
                                        })
                                        .catch((err) => {
                                        console.log("Err");
                                        })
                                    })
                                })
                                .catch((err) => {
                                console.log("Err");
                                })
                            }
                        }
                    }else{
                        yAdd = 4
                    }
                })
        }
        x += xAdd
        y += yAdd
    }
    
    var interval
    
    function startRun(){
        clearInterval(interval)
        interval = setInterval(run, 17)
    }
    // startRun()
    function stopRun(){
        clearInterval(interval)
    }
    
    // stop.addEventListener("click", stopRun)
    box.addEventListener("click", () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `hit-the-ball/`)).then((snapshot) =>{
            if(snapshot.val()?.[serverId].ballMiss === true){
                if(playerName === ballHolder){
                    set(ref(db, `hit-the-ball/${serverId}/ballMiss`), false)
                    .then(() => {
                    //   console.log("Success");
                    })
                    .catch((err) => {
                    console.log("Err");
                    })
                    x = 500
                    y = 300
                    startRun()
                }
            }
        })
    })
}