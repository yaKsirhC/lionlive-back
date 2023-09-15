// import dotenv from "dotenv";
// dotenv.config();
import { Server } from "socket.io";
import { Matchfilters, UserInfoRTC, webRTCPeerConfiguration } from "../types";

function ageFromDate(birthdate: Date) {
  const today = new Date();
  const age =
    today.getFullYear() -
	// @ts-ignore
    birthdate.getFullYear() - (today.getMonth() < birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
  return age;
}

class Pool {
  connections: { config: webRTCPeerConfiguration, socketID: string }[] = [];
  io: Server;
  
  constructor(io: Server) {
    this.io = io;
  }

  removeConnection(peer_id: string){
    const i = this.connections.findIndex(peer => peer.socketID === peer_id);
    if(i === -1) return;
    this.connections.splice(i,1);
  }

  addConnection(peer: { config: webRTCPeerConfiguration, socketID: string }) {
    const filterEntries = Object.entries(peer.config.filters);
    for (let i = 0; i < this.connections.length; i++) {
      const available = this.connections[i];
      const threshhold =
        Object.keys(available.config.filters).length +
        filterEntries.length;
      let highestPoint =
        this.calcualteScore(peer.config.filters, available.config.requestor) +
        this.calcualteScore(available.config.filters, peer.config.requestor);

      if (highestPoint == threshhold) {
        // Delete Old From pool
        this.connections.splice(i, 1)
        io.to(available.socketID).emit("caller", peer)
        io.to(peer.socketID).emit("callee", available)
          console.log('found match!')
        return;
      }
    }
    
    console.log('no match for you lol')

    this.connections.push(peer as any);
  }

  calcualteScore(filters1: Matchfilters, requestor2: UserInfoRTC) {
    let score = 0;

    if (filters1.age) {
      const [start, end] = filters1.age;
      const yold = ageFromDate(new Date(requestor2.birthDate))
      if (
        start <= yold &&
        yold <= end
      ) {
        score++;
      }
    }
    if (filters1.gender) {
      filters1.gender == requestor2.gender && score++;
    }
    if (filters1.region) {
      filters1.region == requestor2.geolocationCoordinates && score++;
    }

    return score;
  }

}

const io = new Server({
  cors: {
    origin: "*"
  }
});

const userPool = new Pool(io);

io.on("connection", (socket) => {

  console.log('connection made:', socket.id)

  socket.on("join-self", data => {
    console.log("joined self: ", data)
    socket.join(data)
  })

  socket.on("request-init", (config: any) => {
    // console.log(config)
    userPool.addConnection({config, socketID: socket.id});
  });

  socket.on("send-direct", data => {
    console.log('redirecting: ', data)
    const receiver = data.receiver;
    socket.to(receiver).emit(data.event, data.body) 
  })

  socket.on('disconnect-from-pool', () => {
    console.log('Disconnecting: ', socket.id)
    userPool.removeConnection(socket.id)
  })

});

io.listen(8080)