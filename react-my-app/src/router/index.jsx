import { createBrowserRouter } from "react-router-dom";
import { SizeBar } from "../components/layout/sidebar";
import { PAGES } from "../constants";

import { Homepage } from '../pages/homePage'
import { TransactionPage } from "../pages/transactionPage";
import { InVoicesPage } from "../pages/invoicesPage"
import { MyWalletsPage } from "../pages/myWalletsPage"
import { SettingPage } from "../pages/settingPage"
import { HelpPage } from "../pages/helpPage"
import { NotFoundPage } from "../pages/NotFoundPage";
import { Login } from "../pages/LoginPage";

const router = createBrowserRouter(
    [
        {

            path: `/`,
            element: (
                <>
                    <SizeBar />
                    <Homepage />
                </>
            )
        },

        {

            path: `${PAGES[0].title}`,
            element: (
                <>
                    <SizeBar />
                    <Homepage />
                </>
            )
        },
        {
            path: `${PAGES[1].title}`,
            element: (
                <>
                    <SizeBar />
                    <TransactionPage />
                </>
            )
        }
        ,
        {
            path: `${PAGES[2].title}`,
            element: (
                <>
                    <SizeBar />
                    <InVoicesPage />
                </>
            )
        }
        ,
        {
            path: `${PAGES[3].title.replace(" ", "")}`,
            element: (
                <>
                    <SizeBar />
                    <MyWalletsPage />
                </>
            )
        }
        ,
        {
            path: `${PAGES[4].title}`,
            element: (
                <>
                    <SizeBar />
                    <SettingPage />
                </>
            )
        }
        ,
        {
            path: `${PAGES[5].title}`,
            element: (
                <>
                    <SizeBar />
                    <HelpPage />
                </>
            )
        },
        {
            path: `${PAGES[6].title}`,
            element: (
                <>
                    <SizeBar />
                    <HelpPage />
                </>
            )
        },


    ])

export default router;

