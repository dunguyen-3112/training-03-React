import { TicketPage } from "../pages/Ticket";
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
import { NewTicket } from "../pages/Ticket/NewTicket";
import { EditTicket } from "../pages/Ticket/EditTicket";

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
    path: "/notfound/:id",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
