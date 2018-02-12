import {PromoObjective} from "../../../../types/constants/PromoObjective";

export const PROMO_OBJECTIVES = [
    {
        label: "Views",
        subItems: [
            {
                label: "Photo",
                value: PromoObjective.PROMO_OBJECTIVE_VIEWS_PHOTO,
            },
            {
                label: "Video",
                value: PromoObjective.PROMO_OBJECTIVE_VIEWS_VIDEO,
            },
        ],
    },
    {
        label: "Traffic",
        subItems: [
            {
                label: "Website",
                value: PromoObjective.PROMO_OBJECTIVE_TRAFFIC_WEBSITE,
            },
            {
                label: "Social media",
                value: PromoObjective.PROMO_OBJECTIVE_TRAFFIC_SOCIAL_MEDIA,

            },
        ],
    },
    {
        label: "Action",
        subItems: [
            {
                label: "Likes",
                value: PromoObjective.PROMO_OBJECTIVE_ACTION_LIKE,
            },
            {
                label: "Subscriptions",
                value: PromoObjective.PROMO_OBJECTIVE_ACTION_SUBSCRIPTION,
            },
            {
                label: "Downloads",
                value: PromoObjective.PROMO_OBJECTIVE_ACTION_DOWNLOAD,
            },
            {
                label: "App installs",
                value: PromoObjective.PROMO_OBJECTIVE_ACTION_APP_INSTALL,
            },
        ],
    },
    {
        label: "Purchases",
        subItems: [
            {
                label: "Registrations",
                value: PromoObjective.PROMO_OBJECTIVE_PURCHASE_REGISTRATION,
            },
            {
                label: "Sales",
                value: PromoObjective.PROMO_OBJECTIVE_PURCHASE_SALE,
            },
        ],
    },
];
