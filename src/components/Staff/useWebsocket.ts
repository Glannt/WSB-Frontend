import React, { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
const useWebSocket = (refetchOrderBooking: () => void) => {
  const [url, setUrl] = React.useState<string>('ws://localhost:8080/ws');
  useEffect(() => {
    const client = new Client({
      brokerURL: url, // WebSocket server URL
      reconnectDelay: 3000, // Reconnect after 3 seconds if disconnected
      heartbeatIncoming: 12000, // Incoming heartbeat interval
      heartbeatOutgoing: 10000, // Outgoing heartbeat interval
    });

    // Connect and set up subscription
    const connectAndSubscribe = () => {
      client.onConnect = () => {
        console.log('Connected to WebSocket STOMP');
        refetchOrderBooking();

        client.subscribe('/booking/bookings/status', (message) => {
          const updatedBooking = JSON.parse(message.body);
          console.log('Updated booking:', updatedBooking);
          // Handle the updated booking data
        });
      };

      client.onStompError = (error) => {
        console.error('STOMP error:', error);
      };

      client.activate();
    };

    // Start connection and subscription
    connectAndSubscribe();

    // Cleanup on component unmount
    return () => {
      client.deactivate();
      console.log('WebSocket connection closed');
    };
  }, [refetchOrderBooking]);
};

export default useWebSocket;
