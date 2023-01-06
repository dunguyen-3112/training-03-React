import React from "react";

import IdeaIcon from "./Idea";
import SettingIcon from "./Setting";
import OverviewIcon from "./Overview";
import AgentIcon from "./Agent";
import ArticlesIcon from "./Articles";
import ContactIcon from "./Contact";
import TicketIcon from "./Ticket";
import SubscriptionIcon from "./Subscription";
import EditImage from "../../../assets/images/Edit.svg";
import DeleteImage from "../../../assets/images/Trash.svg";
import ViewImage from "../../../assets/images/View.svg";
import NewImage from "../../../assets/images/New.svg";
import SortImage from "../../../assets/images/Sort.svg";
import FilterImage from "../../../assets/images/Filter.svg";
import SearchImage from "../../../assets/images/Search.svg";

export const EditIcon = () => <img src={EditImage} />;
export const DeleteIcon = () => <img src={DeleteImage} />;
export const ViewIcon = () => <img src={ViewImage} />;
export const NewIcon = () => <img src={NewImage} />;
export const SortIcon = () => <img src={SortImage} />;
export const FilterIcon = () => <img src={FilterImage} />;
export const SearchIcon = () => <img src={SearchImage} />;

export {
    IdeaIcon,
    SettingIcon,
    OverviewIcon,
    AgentIcon,
    ContactIcon,
    TicketIcon,
    ArticlesIcon,
    SubscriptionIcon,
};
