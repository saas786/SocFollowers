import {
    createI18n
} from 'vue-i18n';

const locale = localStorage.getItem('locale') ?? 'en';

const messages = {
    en: {
        message: {
            buy: "Buy",
            what: "What",
            main: "Main",
            news: "News",
            coin: "coin | coins",
            total: "Total",
            likes: "Likes",
            select: "Select",
            active: "Active",
            orders: "Orders",
            history: "History",
            quantity: "Quantity",
            settings: "Settings",
            or_enter: "or enter",
            detailed: "More detailed",
            is_empty: "So far, it's empty.",
            social_net: "Social network",
            subscribers: "Subscribers",
            type_of_cheat: "Type",
            link_nickname: "Link/Nickname",
            order_not_loaded: "The order is not loaded",
            accept_and_continue: "Accept and continue"
        },
        socials: {
            likee: "Like",
            twitch: "Twi4",
            tiktok: "Tiktoc",
            youtube: "Youtube",
            instagram: "Insta"
        }
    },
    ru: {
        message: {
            buy: "Купить",
            what: "Что",
            main: "Главная",
            news: "Новости",
            total: "Итого",
            likes: "Лайки",
            active: "Активные",
            orders: "Заказы",
            history: "История",
            select: "Выберите",
            settings: "Настройки",
            detailed: "Подробнее",
            quantity: "Количество",
            or_enter: "или введите",
            is_empty: "Пока что пусто",
            social_net: "Соц сеть",
            subscribers: "Подписчики",
            type_of_cheat: "Тип",
            link_nickname: "Ссылка/Никнейм",
            order_not_loaded: "Заказ не загружен",
            accept_and_continue: "Принять и продолжить",
            coin: "0 коинов | {coin} коин | {coin} коина | {coin} коинов"
        },
        socials: {
            likee: "Лайки",
            twitch: "Тви4",
            tiktok: "Тиkтос",
            youtube: "Ютуб",
            instagram: "Инста"
        }
    }
};

function ruRules(choice: any, choicesLength: any) {
    if (choice === 0) {
        return 0;
    }
    const teen = choice > 10 && choice < 20;
    const endsWithOne = choice % 10 === 1;

    if (!teen && endsWithOne) {
        return 1;
    }
    if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2;
    }
    return choicesLength < 4 ? 2 : 3;
}

const i18n: any = createI18n({
    locale: locale,
    pluralizationRules: {
        ru: ruRules
    },
    fallbackLocale: 'en',
    messages,
});

export default i18n;