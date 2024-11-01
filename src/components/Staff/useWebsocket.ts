import React, { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useWebSocket = (refetchOrderBooking: () => void) => {
  const socketUrl = 'http://localhost:8080/ws';

  useEffect(() => {
    const client = new Client({
      brokerURL: socketUrl, // WebSocket server URL
      reconnectDelay: 3000, // Reconnect after 3 seconds if disconnected
      heartbeatIncoming: 12000, // Incoming heartbeat interval
      heartbeatOutgoing: 10000, // Outgoing heartbeat interval
      // Sử dụng SockJS nếu không dùng brokerURL trực tiếp
      webSocketFactory: () => new SockJS(socketUrl),
    });

    // Kết nối và đăng ký nhận dữ liệu
    const connectAndSubscribe = () => {
      client.onConnect = () => {
        console.log('Connected to WebSocket STOMP');
        refetchOrderBooking();

        // Đăng ký nhận các cập nhật từ server
        client.subscribe('/booking/bookings/status', (message) => {
          const updatedBooking = JSON.parse(message.body);
          console.log('Updated booking:', updatedBooking);
          // Xử lý dữ liệu booking đã cập nhật
        });
      };

      client.onStompError = (error) => {
        console.error('STOMP error:', error);
      };

      // Kích hoạt client để bắt đầu kết nối
      client.activate();
    };

    // Bắt đầu kết nối và đăng ký
    connectAndSubscribe();

    // Dọn dẹp khi component unmount
    return () => {
      client.deactivate();
      console.log('WebSocket connection closed');
    };
  }, [refetchOrderBooking]);
};

export default useWebSocket;
