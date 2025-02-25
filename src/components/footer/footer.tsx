import { useLanguage } from '@/contexts/LanguageContext';
import { type Language, languageOptions } from '@/lib/i18n';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function Footer() {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="bg-white shadow-md dark:bg-gray-800 py-4 fixed bottom-0 w-full">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          © 2025 Luvento. All rights reserved.
        </div>
        <div>
        <Select onValueChange={(value) => setLanguage(value as Language)}>
          <SelectTrigger className="bg-transparent border border-gray-300 rounded-md px-2 py-1 text-sm">
            <SelectValue placeholder={languageOptions[language]} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ru">Русский</SelectItem>
            <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 