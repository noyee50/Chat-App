let socket = io();

socket.on("connect", () => {
  console.log("Connected to server");

  /* socket.emit('createMessage',{
      from: "Client",
      text: "Wats going on!"
  }) */
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on('newMessage', (message)=>{
    console.log("newMessage", message)
})

socket.emit('createMessage',{from:"Noi",text:'Hey'}, (message)=>{
    console.log('Got it' + message)
})