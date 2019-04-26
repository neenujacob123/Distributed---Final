var Peer = require('simple-peer')

var broadcaster = new Peer()

broadcaster.on('signal', function (data) {
  document.getElementById('broadcastanswer').value = JSON.stringify(data)
  console.log('ANSWER GENERATED FOR BROADCASTER')
  })

document.getElementById('connect').addEventListener('click', function () {
  var broadcastoffer = JSON.parse(document.getElementById('broadcastoffer').value)
  broadcaster.signal(broadcastoffer)
  console.log('SIGNALLED BROADCOASTER TO GENERATE ANSWER')
})

broadcaster.on('connect', () => {
  broadcaster.send('hi broadcaster this is a peer')
  console.log('CONNECTED')
})

broadcaster.on('data', data => {
  console.log('got a message from broadcaster ' + data)
})

broadcaster.on('data', function (data) {
  document.getElementById('messages').textContent += data + '\n'
})


broadcaster.on('stream', function (stream) {
  var video = document.createElement('video')
  document.body.appendChild(video)
   video.srcObject = stream;
   video.play();

   var peer1 = new Peer({
    initiator: location.hash === '#broadcast',
    trickle: false,
    stream: stream
  })
  //video.src = window.URL.createObjectURL(stream)
 
 //peer 1 is initiator so it prints offer detals to the textbox for channel 1
  peer1.on('signal', function (data) {
    document.getElementById('peer_offer').value = JSON.stringify(data)
    console.log('OFFER FOR PEER1')
  })

//after the
  document.getElementById('connect_peer').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('peer_answer').value)
    peer1.signal(otherId)
    //broadcast.signal(otherId)
    console.log('ANSWER ACK FOR PEER')
  })

  peer1.on('connect', (stream) => {
    peer1.send('hi peer1, this is broadcaster : which is a peer')
  })

   peer1.on('data', data => {
    console.log('got a message from peer1: ' + data)
  })

    document.getElementById('send').addEventListener('click', function () {
    var yourMessage = document.getElementById('yourMessage').value
    peer1.send(yourMessage)
    peer1.addStream(global_stream)
  })

})
