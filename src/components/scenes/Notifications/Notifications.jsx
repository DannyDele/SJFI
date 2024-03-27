










// import React, { useState, useEffect } from 'react';
// import {
//   Typography,
//   Box,
//   CircularProgress
// } from '@mui/material';
// import { Buffer } from 'buffer'; // Import Buffer polyfill
// import WebSocket from 'ws'; // Import WebSocket library
// import Cookies from 'js-cookie';
// import '../../../assets/styles/Notification.css'

// const NotificationPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const authToken = Cookies.get('authToken');
//     if (authToken) {
// const ws = new WebSocket('wss://api.stj-fertilityinstitute.com/api/notification');

//       ws.onmessage = (event) => {
//         const newNotification = JSON.parse(event.data);
//         setNotifications([newNotification, ...notifications]);
//       };

//       return () => {
//         ws.close();
//       };
//     }
//   }, [notifications]);

//   // Formated time
//   const formatCommentTime = (createdAt) => {
//     const commentDate = new Date(createdAt);
//     const currentDate = new Date();

//     if (
//       commentDate.getDate() === currentDate.getDate() &&
//       commentDate.getMonth() === currentDate.getMonth() &&
//       commentDate.getFullYear() === currentDate.getFullYear()
//     ) {
//       return commentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } else {
//       const options = { weekday: 'short', month: 'short', day: 'numeric' };
//       const formattedDate = commentDate.toLocaleDateString('en-US', options);
//       let day = commentDate.getDate();
//       let suffix = 'th';
//       if (day === 1 || day === 21 || day === 31) {
//         suffix = 'st';
//       } else if (day === 2 || day === 22) {
//         suffix = 'nd';
//       } else if (day === 3 || day === 23) {
//         suffix = 'rd';
//       }
//       const formattedTime = commentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//       return `${formattedDate}${suffix} ${commentDate.getFullYear()} ${formattedTime}`;
//     }
//   };

//   return (
//     <div className="container mx-auto p-6" style={{ marginLeft: '20px', width: "80vw" }}>
//       <Typography variant="h4" className="mb-4 font-bold text-gray-500">Notifications</Typography>

//       {notifications.slice().reverse().map(notification => (
//         <Box key={notification._id} style={{ marginTop: '2rem' }} className="left-box">
//           <Box className='commentPic'>
//             {/* You can place your existing UI content here */}
//           </Box>

//           <Box className='Box1' style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
//             <Box style={{ display: 'flex', alignItems: 'center' }}>
//               <Box>
//                 <p style={{ marginLeft: '5rem', position: 'relative', top: '2rem' }}>@{notification.sender?.username}</p>
//               </Box>
//               <Typography style={{ fontSize: '10px', color: '#4A0808', justifyContent: 'center', marginLeft: '1rem', position: 'relative', top: '2rem' }} className='text'>
//                 {formatCommentTime(notification?.createdAt)}
//               </Typography>
//             </Box>

//             <Box style={{ display: 'flex', flexDirection: 'column' }}>
//               <Box style={{ display: 'flex', alignItems: 'center' }}>
//                 <Box style={{ backgroundColor: 'pink', borderRadius: '100%', position: 'relative', marginRight: '1rem' }}>
//                   <img src={notification.sender?.profileimage} alt="Profile" width='60px' height='60px' />
//                 </Box>
//                 <Box>
//                   <h2 style={{ fontStyle: 'Poppins' }} className='text'>
//                     {notification?.post?.post}
//                   </h2>
//                 </Box>
//               </Box>
//               <Typography style={{ fontStyle: 'Poppins', justifyContent: 'center', alignItems: 'center', marginLeft: '4.8rem' }} className='text'>
//                 {notification?.message}
//               </Typography>
//               <Box style={{ display: 'flex', marginLeft: '4.8rem' }}>
//                 <Box style={{ justifyContent: 'start' }}>
//                   <FavoriteIcon style={{ color: 'red' }} />
//                   <p style={{ color: 'grey' }}>
//                     {(notification.post?.likes && notification.post.likes.length) || 0}{' '}
//                     {notification.post?.likes && notification.post.likes.length <= 1 ? 'like' : 'likes'}
//                   </p>
//                 </Box>
//                 <Box style={{ justifyContent: 'start', marginLeft: '1rem' }}>
//                   <CommentIcon style={{ color: 'blue' }} />
//                   <p style={{ color: 'grey' }} >{notification.post?.comments || 0}{' '} comments</p>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//           <hr style={{ borderTop: '2px solid black', width: '100%' }} />
//         </Box>
//       ))}

//       {loading && <CircularProgress />}
//     </div>
//   );
// };

// export default NotificationPage;


































































































































































































































































































import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Dialog,
  Button
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie';
import '../../../assets/styles/Notification.css'
import { Modal, TextField } from '@mui/material';






// Store the endpoint in a variable
const API_ENDPOINT = "https://api.stj-fertilityinstitute.com";


const NotificationPage = () => {
    const [token, setToken] = useState('');

  const [notifications, setNotifications] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentsDialogOpen, setCommentsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Current page number
  const notificationsPerPage = 7; // Number of notifications to display per page


  useEffect(() => {
const authToken = Cookies.get('authToken');

     if (authToken) {
      setToken(authToken);
      console.log('Token:', token)
    }
    // Fetch notifications from the endpoint
    const fetchNotifications = async (authToken) => {
      setLoading(true);
      try {
        const response = await fetch(`${API_ENDPOINT}/api/notification`, {
          headers: {
            "Authorization": `bearer ${authToken}`
          }
        });
        const data = await response.json();

const adminNotifications = data.filter(notification => notification.receiver && notification.receiver.role === 'admin');

        console.log('Notification Data:', data)
        console.log('Notification Admin Data:', adminNotifications)
        setNotifications(adminNotifications);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications(authToken);
  }, []);




  const handlePostClick = (post) => {
    setSelectedPost(post);
    setCommentsDialogOpen(true);
  };

  const handleCloseCommentsDialog = () => {
    setCommentsDialogOpen(false);
  };

 
 


  // Formated time
  const formatCommentTime = (createdAt) => {
  const commentDate = new Date(createdAt);
  const currentDate = new Date();

  // Check if the comment date is today
  if (
    commentDate.getDate() === currentDate.getDate() &&
    commentDate.getMonth() === currentDate.getMonth() &&
    commentDate.getFullYear() === currentDate.getFullYear()
  ) {
    // If it's today, return the time only
    return commentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    // If it's not today, format the date as desired
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const formattedDate = commentDate.toLocaleDateString('en-US', options);

    // Append 'th', 'st', 'nd', 'rd' suffix to the day
    let day = commentDate.getDate();
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 23) {
      suffix = 'rd';
    }

    // Format the time
    const formattedTime = commentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Construct the final formatted string
    return `${formattedDate}${suffix} ${commentDate.getFullYear()} ${formattedTime}`;
  }
};

  

  return (




    
        <div className=" min-h-screen py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-700 mb-6">Notifications</h1>
                <div className="grid gap-4">
          {notifications.slice().reverse().map(notification => (
                        <div key={notification._id} className="bg-white rounded-lg shadow-md p-4">
                            <div className="flex items-center mb-2">
               <div className="h-10  rounded-full  mr-3" style={{
  position: 'relative', 
  width: '50px', 
  height: '50px', 
}}>
  <img 
    src={notification.sender?.profileimage} 
    alt="" 
    style={{ 
      borderRadius: '50%', 
      width: '100%', 
      height: '100%', 
      position: 'absolute', 
    }}
  />
</div>

                                <div>
                                    <p className="text-gray-800 font-normal">{notification.sender?.username} commented on your post</p>
                                    {/* <p className="text-gray-800 font-normal">{notification?.message}</p> */}
                                    <p className="text-gray-600 text-sm"> {formatCommentTime(notification?.createdAt)}</p>
                                </div>
                            </div>
              <p style={{ display: 'flex', alignItems: 'end', marginLeft: '3.8rem', color: 'grey', fontWeight: '100', fontSize:'13px'}} >{notification?.post?.post}</p>
                        </div>
                    ))}
                </div>
      </div>
      
   {/* Loading indicator */}
      {loading && <CircularProgress style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '35vw',
        marginTop:'25vh'
      }} />}

        </div>
  












//     <div className="container mx-auto p-6" style={{ width:"80vw", padding:"2rem 4rem 4rem 4rem" }}>
//             <h1 className="text-3xl font-bold text-gray-500 mb-6">Notifications</h1>


// {notifications.slice().reverse().map(notification => (
//         <Box key={notification._id} style={{marginTop: '2rem'}} className="left-box">
//           <Box className='commentPic'>
//             {/* You can place your existing UI content here */}
//           </Box>

//           <Box className='Box1' style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
//             <Box style={{ display: 'flex',  alignItems:'center' }}>
//               <Box>
//                 <p style={{ marginLeft: '5rem', position:'relative', top:'2rem' }}>@{notification.sender?.username}</p>
//               </Box>
//          <Typography style={{ fontSize: '10px', color: '#4A0808', justifyContent: 'center', marginLeft:'1rem', position:'relative', top:'2rem'  }} className='text'>
//   {formatCommentTime(notification?.createdAt)}
// </Typography>

//          </Box>
         


//          {/* Comment Tab */}
//            <Box style={{display: 'flex', flexDirection: 'column'}}>

//             <Box style={{display: 'flex', alignItems: 'center'}}>
//               <Box style={{ backgroundColor: 'pink', borderRadius: '100%', position: 'relative', marginRight: '1rem' }}>
//                 <img src={notification.sender?.profileimage} alt="Profile" width='60px' height='60px' />
//            </Box>
           
//            <Box>
//            <p style={{ fontStyle: 'Poppins' }} className='text'>
//   {notification?.post?.post} {/* Render the 'post' property of the 'post' object */}
//              </p>
//              </Box>
//            </Box>
//               <Typography style={{ fontStyle: 'Poppins', justifyContent:'center', alignItems: 'center', marginLeft: '4.8rem' }} className='text'>
//                 {notification?.message}
//               </Typography>
            

//             <Box style={{ display: 'flex', marginLeft: '4.8rem'}}>
//                 {/* Action buttons */}
//              <Box style={{ justifyContent: 'start' }}>
//                <FavoriteIcon style={{color:'red'}}/>
// <p style={{ color: 'grey' }}>
//   {(notification.post?.likes && notification.post.likes.length) || 0}{' '}
//   {notification.post?.likes && notification.post.likes.length <= 1 ? 'like' : 'likes'}
// </p>
//               </Box>
              
//              <Box style={{ justifyContent: 'start', marginLeft: '1rem' }}>
//                <CommentIcon style={{color:'blue'}}/>
//                 <p style={{color: 'grey', }} >{notification.post?.comments || 0}{' '} comments</p>
//               </Box>
//            </Box>
           
//             </Box>
//           </Box>
//           <hr style={{ borderTop: '2px solid black', width: '100%' }}  />
//         </Box>
//       ))}










//     </div>
    
  );
};

export default NotificationPage;
