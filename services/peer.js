class PeerService {
  constructor() {
    if (typeof window !== "undefined") {
      if (!this.peer) {
        this.peer = new RTCPeerConnection({
          iceServers: [
            {
              urls: 'stun:global.stun.twilio.com:3478',
            },
            {
              urls: 'stun:stun.l.google.com:19302'
            },
            {
              urls: "turn:relay1.expressturn.com:3478",
              username: "efD08GKZ1QV5X7KPMN",
              credential: "2vS3rl5sPO0tp3P9",
            },
          ],
        });

        // Add error handling
        this.peer.oniceconnectionstatechange = (event) => {
          console.log("ICE Connection State Change: ",this.peer.iceConnectionState);
          if (this.peer.iceConnectionState === 'failed') {
            console.error('ICE Connection failed');
            // Handle connection failure
          }
        };

        this.peer.onsignalingstatechange = (event) => {
          console.log("Signaling State Change: ",this.peer.signalingState);
          if (this.peer.signalingState === 'closed') {
            console.error('Signaling state is closed');
            // Handle closed signaling state
          }
        };

        // Log ICE candidates
        this.peer.onicecandidate = (event) => {
          if (event.candidate) {
            console.log("ICE candidate: ",event.candidate.candidate);
          }
        };
      }
    }
  }

  async getAnswer(offer) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
  }

  async setLocalDescription(ans) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }
}

export default new PeerService();