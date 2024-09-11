import styles from "../styles/callPage.module.css";
import { getSocket } from '../socket';
import { useEffect, useRef, useState } from 'react';
import DiamondLoader from "../components/loaders/DiamondLoader";
// import Peer from 'simple-peer';

/*
Start video
get your Own Call id (initiator) --> Node Server --> other Peer signal(initId) --> Node Server --> Initiator --> signal(otherId)

*/

export default function CallPage() {
    // const [socket, setSocket] = useState(null);
    const [stream, setStream] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [connected,setConnected] = useState(false);
    const [messageList,setMessageList] = useState([
        {recievedMessage:'Hi!',myMessage:true},
        {recievedMessage:'Hey! Whatup Rameez',myMessage:false},
        {recievedMessage:'Im Good.How are you?',myMessage:true},
        {recievedMessage:'Im Good.How are you?',myMessage:true},
        {recievedMessage:'Im Good.How are you?',myMessage:false},
        {recievedMessage:'Im Good.How are you?',myMessage:true},
        {recievedMessage:'Im Good.How are you?',myMessage:true},
        {recievedMessage:'Im Good.How are you?',myMessage:false},
        {recievedMessage:'Im Good.How are you?',myMessage:true},
        {recievedMessage:'Im Good.How are you?',myMessage:false},
        {recievedMessage:'Im Good.How are you?',myMessage:true},
        {recievedMessage:'Im Good.How are you?',myMessage:false},
        {recievedMessage:'Im Good.How are you?',myMessage:true},
        {recievedMessage:'Im Good.How are you?',myMessage:true},
        {recievedMessage:'Im Good.How are you?',myMessage:true},
        {recievedMessage:'Im Good.How are you?',myMessage:true},
        {recievedMessage:'Im Good.How are you?',myMessage:false},
        {recievedMessage:'Im Good.How are you?',myMessage:false},
        {recievedMessage:'Im Good.How are you?',myMessage:true},
        {recievedMessage:'Im Good.How are you?',myMessage:true},
        {recievedMessage:'Im Good.How are you?',myMessage:false},
        {recievedMessage:'Im Good.How are you?',myMessage:false},
        {recievedMessage:'Im Good.How are you?',myMessage:true},
        {recievedMessage:'Im Good.How are you?',myMessage:false},
        {recievedMessage:'Im Good.How are you?',myMessage:true},
        {recievedMessage:'Im Good.How are you?',myMessage:false},
        {recievedMessage:'Awesome!',myMessage:false},
    ]);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerRef = useRef(null);
    const socketRef = useRef(null);


    function startCall() {
        let peerSocketId;
        setLoading(true);
        // Get the user's media stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((mediaStream) => {
                setStream(mediaStream);
                localVideoRef.current.srcObject = mediaStream;

                if (true) {
                // if (!socketRef.current) {
                    const socketInstance = getSocket();
                    // setSocket(socketInstance);
                    socketRef.current = getSocket()
                    
                    // get available initiator from the server
                    socketInstance.on('initiator-status', (numberOfInitiators) => {
                        console.log('got init', numberOfInitiators);
                        if (numberOfInitiators > 0) {

                            if (!peerRef.current) {
                                // make normal Peer
                                console.log('make normal peer');
                                const newPeer = new window.SimplePeer({
                                    initiator: false,
                                    trickle: false,
                                    stream: mediaStream
                                });

                                peerRef.current = newPeer;

                                newPeer.on('signal', (data) => {
                                    console.log('created answer', data);
                                    console.log('created answer peerId', peerSocketId);
                                    // // emit initiator 
                                    socketInstance.emit('answer', {
                                        signalData: JSON.stringify(data),
                                        sokcetId: peerSocketId
                                    })
                                })

                                socketInstance.on('get-initiator', (data) => {
                                    console.log('initirtaotr offerr gfot', data);
                                    // got the initiator offer 
                                    // now signal for answer
                                    peerSocketId = data.socketId;
                                    newPeer.signal(JSON.parse(data.signalData));
                                })

                                newPeer.on('stream', (remoteStream) => {
                                    // Set the remote stream to the video element
                                    remoteVideoRef.current.srcObject = remoteStream;
                                });

                                newPeer.on('data', (incomingData) => {
                                    let decoder = new TextDecoder();
                                    let recievedMessage = decoder.decode(incomingData);
                                    console.log('RECIEVED MESSAGE', recievedMessage);
                                    setMessageList(prevList => [...prevList,{ recievedMessage,myMessage:false}]);
                                })

                                newPeer.on('connect', () => {
                                    setLoading(false);
                                    console.log('connected success');
                                    setConnected(true);
                                })
                                newPeer.on('error',(error) => {
                                    console.log('An Error Occirredddddddddddddddddddddddddddddddddddddd',error);  
                                })
                                newPeer.on('close',() => {
                                    console.log('cloooooooooooooooooooosed NORMAL');
                                    // socketInstance.emit('initiator-closed');
                                    endCall();  
                                })
                            }
                        }

                        else {
                            if (!peerRef.current) {
                                // make INITIATOR
                                console.log('make INITIATOR');
                                const newPeer = new window.SimplePeer({
                                    initiator: true,
                                    trickle: false,
                                    stream: mediaStream
                                });

                                peerRef.current = newPeer;

                                newPeer.on('signal', (data) => {
                                    console.log('EMIT INITIATOR', data);
                                    // emit initiator 
                                    socketInstance.emit('create-initiator', {
                                        signalData: JSON.stringify(data)
                                    })
                                })

                                socketInstance.on('get-answer', (data) => {
                                    console.log('initaoprr answerrrrrrrrrrrrrr', data);

                                    newPeer.signal(JSON.parse(data.signalData))
                                })

                                newPeer.on('stream', (remoteStream) => {
                                    // Set the remote stream to the video element
                                    remoteVideoRef.current.srcObject = remoteStream;
                                });

                                newPeer.on('data', (incomingData) => {
                                    let decoder = new TextDecoder();
                                    let recievedMessage = decoder.decode(incomingData);
                                    console.log('RECIEVED MESSAGE', recievedMessage);
                                    setMessageList(prevList => [...prevList,{ recievedMessage,myMessage:false}]);
                                    console.log('msgsss',messageList);
                                    
                                })
                                newPeer.on('connect', () => {
                                    setLoading(false);
                                    console.log('connected success');
                                    setConnected(true);
                                })
                                newPeer.on('error',(error) => {
                                    console.log('An Error Occirredddddddddddddddddddddddddddddddddddddd',error);  
                                })
                                newPeer.on('close',() => {
                                    console.log('cloooooooooooooooooooosed INITIATOR');
                                    socketInstance.emit('initiator-closed');
                                    endCall();  
                                })

                            }
                        }
                    })
                }
            })
            .catch((err) => console.error('Error accessing media devices.', err));
    }

    function endCall() {
        setConnected(false);
        setLoading(false);
        if(stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        // Destroy the current peer
        if (peerRef.current) {
            peerRef.current.destroy();
            peerRef.current = null;  // Optionally clear the reference
        }
        setMessageList([]);
    }
    // console.log(messageList);
    
    function sendMessage() {
        if(connected) {
            if(!message) {
                alert('messsage emtpy')
            }
            console.log('send button clicked');
            setMessageList(prevList => [...prevList,{ recievedMessage:message,myMessage:true}])
            peerRef.current.send(message);
            setMessage('');
        }
        else {
            alert('cant send message without connection')
        }
    }

    return (
        <div>
            <h1 className={styles.heading}>Call PAGE</h1>
            <div className={styles.container}>
                <div className={styles.videosContainer}>
                    <div className={styles.videoDiv}>
                        {
                        loading && <DiamondLoader/> 
                        }
                        <video ref={remoteVideoRef} autoPlay style={{ width: '300px' }}>
                        </video>
                    </div>
                    <div className={styles.videoDiv}>
                        {/* <DiamondLoader/> */}
                        <video ref={localVideoRef} autoPlay muted style={{ width: '300px' }}></video>
                    </div>
                </div>

                <div className={styles.chatContainer}>
                    <div className={styles.messagaesContainer}>
                        {messageList && messageList.map((msg,index) => 
                            (   <div key={index}> 
                                <p className={msg.myMessage ? styles.me : styles.other}>{msg.recievedMessage}</p>
                            </div>
                            )
                        )}
                    </div>

                    <div className={styles.messageActionsContaier}>
                        <div>
                            <input type="text" placeholder="message..." value={message} onChange={(e) => setMessage(e.target.value)} className={styles.messageInput} />
                        </div>
                        <div>
                            <button onClick={sendMessage} className={styles.sendBtn}><i className="far fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>

            </div>

            <button onClick={() => startCall()} className={styles.startCallBtn}>Start Call <i className="fa-solid fa-phone"></i></button>
            <button onClick={() => endCall()} className={styles.endCallBtn}>End Call <i className="fa-solid fa-phone"></i></button>
        </div>
    )
}
