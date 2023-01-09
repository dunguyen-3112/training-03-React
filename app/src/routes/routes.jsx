import { TicketPage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import React from "react";
import { ErrorPage } from "../pages/Error";
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
import NewTicket from "../pages/Home/NewTicket/NewTicket";
import EditTicket from "../pages/Home/EditTicket/EditTicket";

export const routes = [
    {
        title: "Overview",
        path: "/",
        element: <ErrorPage />,
        icon: <OverviewIcon />,
    },
    {
        path: "/tickets",
        element: <TicketPage />,
        icon: <TicketIcon />,
        title: "Tickets",
    },
    {
        path: "/tickets/new_ticket",
        element: <NewTicket />,
    },
    {
        path: "/tickets/edit_ticket/:ticketId",
        element: <EditTicket />,
    },
    {
        title: "Ideas",
        path: "/ideas",
        icon: <IdeaIcon />,
        element: <ErrorPage />,
    },
    {
        title: "Contacts",
        path: "/contacts",
        element: <ErrorPage />,
        icon: <ContactIcon />,
    },
    {
        title: "Agents",
        path: "/agents",
        icon: <AgentIcon />,
        element: <ErrorPage />,
    },
    {
        title: "Articles",
        path: "/acticles",
        icon: <ArticlesIcon />,
        element: <ErrorPage />,
    },
    {
        title: "Settings",
        path: "/settings",
        icon: <SettingIcon />,
        element: <ErrorPage />,
    },
    {
        title: "Subscription",
        path: "/subscription",
        icon: <SubscriptionIcon />,
        element: <ErrorPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/notfound/:id",
        element: <ErrorPage />,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
];
