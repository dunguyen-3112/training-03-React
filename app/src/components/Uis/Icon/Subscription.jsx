import React from "react";
import PropTypes from "prop-types";
import { memo } from "react";

function SubscriptionIcon({ active }) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_597_254)">
                <path
                    opacity="0.4"
                    d="M5.035 11.3322C4.76344 11.0606 4.905 11.1372 4.25 10.9619C3.95281 10.8822 3.69156 10.7291 3.45531 10.5456L2.0375 14.0219C1.90031 14.3584 2.15656 14.7241 2.51969 14.7103L4.16625 14.6475L5.29875 15.8438C5.54875 16.1075 5.9875 16.0253 6.12469 15.6888L7.75125 11.7006C7.4125 11.8894 7.03656 12 6.64781 12C6.03844 12 5.46594 11.7628 5.035 11.3322ZM13.9625 14.0219L12.5447 10.5456C12.3084 10.7294 12.0472 10.8822 11.75 10.9619C11.0916 11.1381 11.2359 11.0613 10.965 11.3322C10.5341 11.7628 9.96125 12 9.35188 12C8.96313 12 8.58719 11.8891 8.24844 11.7006L9.875 15.6888C10.0122 16.0253 10.4513 16.1075 10.7009 15.8438L11.8338 14.6475L13.4803 14.7103C13.8434 14.7241 14.0997 14.3581 13.9625 14.0219ZM10.2188 10.625C10.6963 10.1391 10.7509 10.1809 11.4309 9.99563C11.865 9.87719 12.2044 9.53188 12.3206 9.09001C12.5544 8.20251 12.4938 8.3097 13.1316 7.66032C13.4494 7.33688 13.5734 6.86532 13.4572 6.42345C13.2238 5.53657 13.2234 5.66032 13.4572 4.77251C13.5734 4.33063 13.4494 3.85907 13.1316 3.53563C12.4938 2.88626 12.5544 2.99313 12.3206 2.10595C12.2044 1.66407 11.865 1.31876 11.4309 1.20032C10.5597 0.962508 10.6647 1.0247 10.0263 0.375008C9.70844 0.0515703 9.245 -0.0749922 8.81094 0.0434453C7.94 0.280945 8.06156 0.281258 7.18906 0.0434453C6.755 -0.0749922 6.29156 0.0512578 5.97375 0.375008C5.33594 1.02438 5.44094 0.962508 4.56938 1.20032C4.13531 1.31876 3.79594 1.66407 3.67969 2.10595C3.44625 2.99313 3.50656 2.88626 2.86875 3.53563C2.55094 3.85907 2.42656 4.33063 2.54313 4.77251C2.77656 5.65876 2.77688 5.53501 2.54313 6.42313C2.42688 6.86501 2.55094 7.33657 2.86875 7.66032C3.50656 8.3097 3.44594 8.20251 3.67969 9.09001C3.79594 9.53188 4.13531 9.87719 4.56938 9.99563C5.26875 10.1863 5.32094 10.1563 5.78125 10.625C6.19469 11.0459 6.83875 11.1213 7.33563 10.8069C7.53432 10.6807 7.76481 10.6138 8.00016 10.6138C8.23551 10.6138 8.466 10.6807 8.66469 10.8069C9.16125 11.1213 9.80531 11.0459 10.2188 10.625ZM5.05188 5.49876C5.05188 3.84157 6.37188 2.49813 8 2.49813C9.62813 2.49813 10.9481 3.84157 10.9481 5.49876C10.9481 7.15595 9.62813 8.49938 8 8.49938C6.37188 8.49938 5.05188 7.15595 5.05188 5.49876Z"
                    fill={active ? "#DDE2FF" : "#9FA2B4"}
                />
            </g>
            <defs>
                <clipPath id="clip0_597_254">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

SubscriptionIcon.propTypes = {
    active: PropTypes.bool,
};

export default memo(SubscriptionIcon);
