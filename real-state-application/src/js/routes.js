import home from "../pages/home";
import cardDetails from "../pages/CardDetails";
import favorites from "../pages/Favorites";
const routes=[
    {
        path: "/",
        component: home,
      },
      {
        path: "/cardDetails/:id",
        component: cardDetails,
      },
      {
        path: "/favorites/",
        component: favorites,
      },
]
export default routes