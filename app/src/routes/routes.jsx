import { TicketPage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import React from "react";
import { NotFoundPage } from "../pages/NotFound";
import {
    OverviewIcon,
    AgentIcon,
    ArticlesIcon,
    ContactIcon,
    IdeaIcon,
    SettingIcon,
    TicketIcon,
    SubscriptionIcon,
} from "../components/Uis/Icon";

export const routes = [
    {
        title: "Overview",
        path: "/",
        element: <NotFoundPage />,
        icon: <OverviewIcon />,
    },
    {
        path: "/tickets",
        element: <TicketPage />,
        icon: <TicketIcon />,
        title: "Tickets",
    },
    {
        title: "Ideas",
        path: "/ideas",
        icon: <IdeaIcon />,
        element: <NotFoundPage />,
    },
    {
        title: "Contacts",
        path: "/contacts",
        element: <NotFoundPage />,
        icon: <ContactIcon />,
    },
    {
        title: "Agents",
        path: "/agents",
        icon: <AgentIcon />,
        element: <NotFoundPage />,
    },
    {
        title: "Articles",
        path: "/acticles",
        icon: <ArticlesIcon />,
        element: <NotFoundPage />,
    },
    {
        title: "Settings",
        path: "/settings",
        icon: <SettingIcon />,
        element: <NotFoundPage />,
    },
    {
        title: "Subscription",
        path: "/subscription",
        icon: <SubscriptionIcon />,
        element: <NotFoundPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
];
