import { ru } from 'date-fns/locale';
import { enUS } from 'date-fns/locale';

export type Language = 'ru' | 'en';

export const dateLocales = {
  ru,
  en: enUS,
};

export const formatOptions = (lang: Language) => ({
  locale: dateLocales[lang],
  weekStartsOn: 1 as const, // Неделя начинается с понедельника
});

export const languageOptions = {
  ru: 'Русский',
  en: 'English',
}

export const translations = {
  ru: {
    menu: {
      calendar: 'Календарь',
      bookings: 'Бронирования',
      rooms: 'Номера',
      settings: 'Настройки',
      channels: 'Каналы',
      properties: 'Объекты',
    },
    table: {
      object: 'Объект',
      price: '₽',
      noData: 'Нет данных',
      searchPlaceholder: 'Поиск объектов...',
    },
    actions: {
      create: 'Создать',
      edit: 'Редактировать',
      delete: 'Удалить',
      cancel: 'Отмена',
      save: 'Сохранить',
    },
    footer: {
      pickLanguage: 'Выберите язык',
    }
  },
  en: {
    menu: {
      calendar: 'Calendar',
      bookings: 'Bookings',
      rooms: 'Rooms',
      settings: 'Settings',
      channels: 'Channels',
      properties: 'Properties',
    },
    table: {
      object: 'Property',
      price: '$',
      noData: 'No data',
      searchPlaceholder: 'Search properties...',
    },
    actions: {
      create: 'Create',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',
    },
    footer: {
      pickLanguage: 'Pick language',
      copyright: '© 2025 Luvento. All rights reserved.',
    }
  }
};

export const useTranslation = (lang: Language) => translations[lang]; 