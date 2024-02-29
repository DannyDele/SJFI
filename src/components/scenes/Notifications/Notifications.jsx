import React, { useState } from 'react';
import { Modal, TextField } from '@mui/material';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            text: 'John Doe liked your post.',
            time: '2 hours ago',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor, enim eu viverra porta, nisi metus volutpat magna.'
        },
        {
            id: 2,
            text: 'Jane Smith commented on your post.',
            time: '1 hour ago',
            content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
        },
        {
            id: 2,
            text: 'Jane Smith commented on your post.',
            time: '1 hour ago',
            content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
        },
        {
            id: 2,
            text: 'Jane Smith commented on your post.',
            time: '1 hour ago',
            content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
        },
        {
            id: 2,
            text: 'Jane Smith commented on your post.',
            time: '1 hour ago',
            content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
        },
        {
            id: 2,
            text: 'Jane Smith commented on your post.',
            time: '1 hour ago',
            content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
        },
        {
            id: 2,
            text: 'Jane Smith commented on your post.',
            time: '1 hour ago',
            content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
        },
        // Add more notifications here
    ]);

    return (
        <div className=" min-h-screen py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-700 mb-6">Notifications</h1>
                <div className="grid gap-4">
                    {notifications.map(notification => (
                        <div key={notification.id} className="bg-white rounded-lg shadow-md p-4">
                            <div className="flex items-center mb-2">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 mr-3"></div>
                                <div>
                                    <p className="text-gray-800 font-normal">{notification.text}</p>
                                    <p className="text-gray-600 text-sm">{notification.time}</p>
                                </div>
                            </div>
                            <p className="text-gray-400 font-thin">{notification.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotificationPage;
