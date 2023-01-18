import TicketPage from "@pages/TicketPage";
import React from "react";
import NotFoundPage from "@pages/NotFoundPage";
import {
  OverviewIcon,
  AgentIcon,
  ArticlesIcon,
  ContactIcon,
  IdeaIcon,
  SettingIcon,
  TicketIcon,
  SubscriptionIcon,
} from "@components/Icon";
import { NewTicket, EditTicket } from "@pages/TicketPage/components";
import LoginPage from "@pages/LoginPage";

export const routes = [
  {
    title: "Overview",
    path: "/",
    element: <NotFoundPage />,
    icon: (active) => <OverviewIcon active={active} />,
  },
  {
    path: "/tickets",
    element: <TicketPage />,
    icon: (active) => <TicketIcon active={active} />,
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
    icon: (active) => <IdeaIcon active={active} />,
    element: <NotFoundPage />,
  },
  {
    title: "Contacts",
    path: "/contacts",
    element: <NotFoundPage />,
    icon: (active) => <ContactIcon active={active} />,
  },
  {
    title: "Agents",
    path: "/agents",
    icon: (active) => <AgentIcon active={active} />,
    element: <NotFoundPage />,
  },
  {
    title: "Articles",
    path: "/acticles",
    icon: (active) => <ArticlesIcon active={active} />,
    element: <NotFoundPage />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: (active) => <SettingIcon active={active} />,
    element: <NotFoundPage />,
  },
  {
    title: "Subscription",
    path: "/subscription",
    icon: (active) => <SubscriptionIcon active={active} />,
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
