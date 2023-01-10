import React, {
    useRef,
    useEffect,
    useContext,
    useState,
    memo,
    useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "../../../components/Forms/Input";
import { DropDown } from "../../../components/Forms/DropDown";
import { TextReal } from "../../../components/Forms/TextArea";
import { getFormData } from "../../../utils/form";
import { validate } from "../../../utils/validate";
import { Button } from "../../../components/Uis/Button";
import classes from "../TicketPage.module.sass";
import { Context } from "../../../context/Context";
import * as API from "../../../utils/api";
import { Search } from "../../../components/Forms/Search";
import { useFetch } from "../../../hooks";

function FormNewTicket() {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [ticket, setTicket] = useState();
    const [loading1, data1, error1] = useFetch(`/users/${ticket?.assignBy}`);

    let { statuses, priorities } = useContext(Context);
    statuses = statuses || JSON.parse(localStorage.getItem("statuses"));
    priorities = priorities || JSON.parse(localStorage.getItem("priorities"));

    const handleNew = useCallback(() => {
        const formData = getFormData(formRef.current);
        console.log(formData);
    }, []);

    const handleSelect = useCallback(
        (id) => {
            setTicket({ ...ticket, assignBy: id });
        },
        [ticket]
    );

    const handleSearchUsers = useCallback(async (query) => {
        const response = await API.get(`/users?_query=${query}`);
        const users = response.data.data;
        console.log("123");
        return users;
    }, []);

    useEffect(() => {
        setUser(data1);
    }, [ticket, user, data1]);

    useEffect(() => {
        const form = formRef.current;
        console.log(form);
        if (form) {
            console.log("re-rendering...");
            const formData = getFormData(form);

            if (formData) {
                validate(
                    form,
                    [
                        {
                            selector: "name",
                            parentSelector: ".form-group",
                            messageSelector: ".form-message",
                            rules: [
                                {
                                    validator: (value) =>
                                        validate.isRequired(value),
                                    message: "Name is required",
                                },
                                {
                                    validator: (value) =>
                                        validate.minLength(value, 6),
                                    message: "Name min length is 6 characters!",
                                },
                            ],
                        },
                        {
                            selector: "description",
                            parentSelector: ".form-group",
                            messageSelector: ".form-message",
                            rules: [
                                {
                                    validator: (value) =>
                                        validate.isRequired(value),
                                    message: "Description is required",
                                },
                                {
                                    validator: (value) =>
                                        validate.minLength(value, 20),
                                    message:
                                        "Description min length is 20 characters!",
                                },
                            ],
                        },
                        {
                            selector: "status",
                            parentSelector: ".form-group",
                            messageSelector: ".form-message",
                            rules: [
                                {
                                    validator: (value) =>
                                        validate.isRequired(value),
                                    message: "Status is required",
                                },
                            ],
                        },
                        {
                            selector: "priority",
                            parentSelector: ".form-group",
                            messageSelector: ".form-message",
                            rules: [
                                {
                                    validator: (value) =>
                                        validate.isRequired(value),
                                    message: "Priority is required",
                                },
                            ],
                        },
                        {
                            selector: "due_date",
                            parentSelector: ".form-group",
                            messageSelector: ".form-message",
                            rules: [
                                {
                                    validator: (value) =>
                                        validate.isRequired(value),
                                    message: "Due date is required",
                                },
                                {
                                    validator: (value) =>
                                        validate.isDate(value),
                                    message: "Date is Invalid",
                                },
                            ],
                        },
                    ],
                    handleNew
                );
            }
        }
    }, [formRef]);

    return (
        <div className={classes["form__ticket"]}>
            <form ref={formRef}>
                <span className={classes["form-row"]}>
                    <Input
                        title="Name"
                        value={ticket?.name || ""}
                        message=""
                        placeholder=""
                        type="text"
                        tabIndex={1}
                        onChange={(event) =>
                            setTicket({ ...ticket, name: event.target.value })
                        }
                    />
                    <Input
                        title="Due Date"
                        value={ticket?.dueDate || "2022-01-01"}
                        message=""
                        placeholder=""
                        type="date"
                        tabIndex={2}
                        onChange={(event) =>
                            setTicket({
                                ...ticket,
                                dueDate: event.target.value,
                            })
                        }
                    />
                </span>
                <span className={classes["form-row"]}>
                    <Input
                        title="Assign By"
                        value={ticket?.assignBy || ""}
                        message=""
                        placeholder=""
                        type="text"
                        tabIndex={3}
                        onChange={(event) =>
                            setTicket({
                                ...ticket,
                                assignBy: event.target.value,
                            })
                        }
                    />
                </span>
                <span className={classes["form-row"]}>
                    <DropDown
                        title="Status"
                        options={statuses}
                        value={ticket?.status || 0}
                        onChange={(event) =>
                            setTicket({ ...ticket, status: event.target.value })
                        }
                        tabIndex={3}
                    />
                    <DropDown
                        title="Priority"
                        options={priorities}
                        value={ticket?.priority}
                        onChange={(event) =>
                            setTicket({
                                ...ticket,
                                priority: event.target.value,
                            })
                        }
                        tabIndex={4}
                    />
                </span>
                <span className={classes["form-row"]}>
                    <TextReal
                        title="Description"
                        value={ticket?.description || ""}
                        onChange={(event) =>
                            setTicket({
                                ...ticket,
                                description: event.target.value,
                            })
                        }
                        tabIndex={5}
                    />
                </span>
                <span className={classes["nav__action"]}>
                    <Button type="submit" tabIndex={6}>
                        <span className={classes["item__title"]}>Save</span>
                    </Button>
                    <Button onClick={() => navigate("/tickets")} tabIndex={7}>
                        <span className={classes["item__title"]}>Cancel</span>
                    </Button>
                </span>
            </form>
            <div className={classes["info"]}>
                <Search
                    onSearch={handleSearchUsers}
                    title="AssignBy"
                    onSelect={handleSelect}
                />
                <figure className={classes["avatar"]}>
                    <img
                        src={
                            user?.avatar ||
                            "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
                        }
                        alt=""
                    />
                    <figcaption>{data1?.name || ""}</figcaption>
                </figure>
            </div>
        </div>
    );
}

FormNewTicket.propTypes = {};

export default memo(FormNewTicket);
