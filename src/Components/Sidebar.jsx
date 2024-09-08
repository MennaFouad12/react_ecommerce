// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
// import Loading from './Loading';
// import { useState } from 'react';
// import { getCategories } from '../Apis/getCategories';
// import { getProductwithCategories } from '../Apis/getProducts';
// import { useEffect } from 'react';
// export default function AnchorTemporaryDrawer() {
//     const [categories, setCategories] = useState([]);
//   const [msg, setMsg] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [specificArr, setSpecificArr] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//     async function geCategoriesApi() {
//         setLoading(true);
//         let data = await getCategories();
//         if (data?.data) {
//           setCategories(data?.data);
//           setMsg('');
//         } else {
//           setMsg(data?.message);
//         }
//         setLoading(false);
//       }
    
//       // Fetch products by category
//       async function getProductwithCategoriesApi(id) {
//         setLoading(true);
//         let data = await getProductwithCategories(id);
//         if (data?.data) {
//           setSpecificArr(data?.data);
//           setFilteredProducts(data?.data); // Initialize filtered products
//           setMsg('');
//         } else {
//           setMsg(data?.message);
//         }
//         setLoading(false);
//       }
    
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {categories.map((ele, i) => (
//           <ListItem  onClick={() => {
//             getProductwithCategoriesApi(ele?._id);
            
//           }} key={ele?._id}  disablePadding>
//             <ListItemButton>
//               {/* <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon> */}
//               <ListItemText primary={ele.name} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
     
//     </Box>
//   );
//   useEffect(() => {
//     geCategoriesApi();
   
//   }, []);

//   return (
//     <div>
//       {['left'].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//           <Drawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//           >
//             {list(anchor)}
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }
import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function AnchorTemporaryDrawer({ categories, onSelectCategory }) {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {categories.map((ele) => (
          <ListItem 
            button 
            onClick={() => onSelectCategory(ele._id)} 
            key={ele._id} 
            disablePadding
          >
            <ListItemButton>
              <ListItemText primary={ele.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button sx={{bgcolor:'#03543F' ,color:'white'}} onClick={toggleDrawer(anchor, true)}>Show categories</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
    

     
  );
}
