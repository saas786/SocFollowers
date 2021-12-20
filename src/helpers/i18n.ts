import {
    createI18n
} from 'vue-i18n';

const locale = localStorage.getItem('locale') ?? 'en';
const messages = {
    en: {
        message: {
            ru: "Russian",
            en: "English",
            lang: "Language",
            min: "Minimum",
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
            settings: "Settings",
            quantity: "Quantity",
            or_enter: "or enter",
            detailed: "More detailed",
            is_empty: "So far, it's empty.",
            buy_coins: "Buy coins",
            dark_theme: "Dark Theme",
            social_net: "Social network",
            subscribers: "Subscribers",
            please_wait: "Please, wait...",
            empty_photo: "Photo is not specified",
            only_android: "This feature is only available for Android",
            type_of_cheat: "Type",
            your_quantity: "your quantity",
            link_nickname: "Link/Nickname",
            order_not_loaded: "The order is not loaded",
            accept_and_continue: "Accept and continue"
        },
        socials: {
            likee: "Likee",
            twitch: "Twitch",
            tiktok: "Tiktok",
            youtube: "Youtube",
            instagram: "Insta"
        }
    },
    ru: {
        message: {
            ru: "Русский",
            en: "Английский",
            lang: "Язык",
            min: "Минимум",
            buy: "Купить",
            what: "Что",
            main: "Главная",
            news: "Новости",
            total: "Итого",
            likes: "Лайки",
            coins: "Коины",
            active: "Активные",
            orders: "Заказы",
            history: "История",
            select: "Выберите",
            settings: "Настройки",
            detailed: "Подробнее",
            quantity: "Количество",
            or_enter: "или введите",
            is_empty: "Пока что пусто",
            buy_coins: "Купить коины",
            social_net: "Соц сеть",
            dark_theme: "Темная тема",
            subscribers: "Подписчики",
            empty_photo: "Фото не указано",
            please_wait: "Пожалуйста, подождите...",
            only_android: "Эта функция доступна только для Android",
            type_of_cheat: "Тип",
            your_quantity: "ваше кол-во",
            link_nickname: "Ссылка/Никнейм",
            order_not_loaded: "Заказ не загружен",
            accept_and_continue: "Принять и продолжить",
            coin: "0 коинов | {coin} коин | {coin} коина | {coin} коинов"
        },
        socials: {
            likee: "Likee",
            twitch: "Твич",
            tiktok: "Тиkток",
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