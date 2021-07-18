let handlefail = function(err){
    console.log(err)
}


function addVideoStream(streamId){
    console.log()
    let remoteContainer = document.getElementById("remoteStream");
    let streamDiv = document.createElement("div");
    streamDiv.id = streamId;
    streamDiv.style.transform = "rotateY(180deg)";
    streamDiv.style.height = "250px"
    remoteContainer.appendChild(streamDiv)
} 

function addVideoStream2(streamId){
    console.log()
    let remoteContainer = document.getElementById("remoteStream");
    let streamDiv2 = document.createElement("div");
    streamDiv2.id = streamId;
    streamDiv2.style.transform = "rotateY(180deg)";
    streamDiv2.style.height = "250px"
    remoteContainer.appendChild(streamDiv2)
} 

function addVideoStream3(streamId){
    console.log()
    let remoteContainer = document.getElementById("remoteStream");
    let streamDiv3 = document.createElement("div");
    streamDiv3.id = streamId;
    streamDiv3.style.transform = "rotateY(180deg)";
    streamDiv3.style.height = "250px"
    remoteContainer.appendChild(streamDiv3)
} 

function addVideoStream4(streamId){
    console.log()
    let remoteContainer = document.getElementById("remoteStream");
    let streamDiv4 = document.createElement("div");
    streamDiv4.id = streamId;
    streamDiv4.style.transform = "rotateY(180deg)";
    streamDiv4.style.height = "250px"
    remoteContainer.appendChild(streamDiv4)
} 



document.getElementById("join").onclick = function () {
    let channelName = document.getElementById("channelName").value;
    let Username = document.getElementById("username").value;
    let appId = "cb0782f7af9d478b9ceef8bd56714556";

    let client = AgoraRTC.createClient({
        mode: "live",
        codec: "h264"
    })

    client.init(appId,() => console.log("AgoraRTC Client Connected"),handlefail)

    client.join(
        null,
        channelName,
        Username,
        () =>{
            var localStream = AgoraRTC.createStream({
                video: true,
                audio: true,
            })

            localStream.init(function(){
                localStream.play("SelfStream")
                console.log(`App id: ${appId}\nChannel id: ${channelName}`)
                client.publish(localStream)
            })
        }
    )

    client.on("stream-added", function (evt){
        console.log("Added Stream");
        client.subscribe(evt.stream,handlefail)
    })

    client.on("stream-subscribed", function(evt){
        console.log("Subscribed Stream");
        let stream = evt.stream;
        addVideoStream(stream.getId());  
        stream.play(stream.getId());
    })

}