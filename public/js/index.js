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

socket.on("newMessage", (message) => {
  console.log("newMessage", message);
  let li = document.createElement("li");
  li.innerText = `${message.from}: ${message.text}`;
  document.querySelector("body").appendChild(li);
});

socket.on("newLocationMessage", (message) => {
  console.log("newLocationMessage", message);
  let li = document.createElement("li");
  let a = document.createElement('a')
  a.setAttribute('target', '_blank')
  a.setAttribute('href', message.url)
  a.innerHTML = 'My Current Location'
  li.appendChild(a);
  document.querySelector("body").appendChild(li);
});

socket.emit("createMessage", { from: "Noi", text: "Hey" }, (message) => {
  console.log("Got it" + message);
});

document.querySelector("#submit-btn").addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: document.querySelector('input[name="message"]').value,
    },
    () => {}
  );
});

document.querySelector("#send-location").addEventListener("click", (e) => {
  e.preventDefault();

  if (!navigator.geolocation) {
    return alert("Geolocation is not support your browser.");
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      socket.emit('createLocationMessage', {lat:position.coords.latitude, lng: position.coords.longitude})
    },
    () => {
      alert('Unable to fetch location.')
    }
  );

  // socket.emit(
  //   "createMessage",
  //   {
  //     from: "User",
  //     text: document.querySelector('input[name="message"]').value,
  //   },
  //   () => {}
  // );

});
