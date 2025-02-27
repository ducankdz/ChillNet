import HomeIcon from '@mui/icons-material/Home';
import NotificationIcon from "@mui/icons-material/Notifications";
import ExploreIcon from "@mui/icons-material/Explore";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

export const navigationMenu = [
    {
        title: "Home",
        path: "/home",
        icon: HomeIcon
    },
    {
        title: "Search",
        path: "/search",
        icon: SearchIcon
    },
    {
        title: "Explore",
        path: "/explore",
        icon: ExploreIcon
    },
    {
        title: "Notifications",
        path: "/notifications",
        icon: NotificationIcon
    },
    {
        title: "Bookmark",
        path: "/bookmark",
        icon: BookmarkOutlinedIcon
    },
    // {
    //     title: "Messages",
    //     path: "/messages",
    //     icon: MessageIcon
    // },
    {
        title: "Profile",
        path: "/profile",
        icon: AccountCircleIcon
    },
]