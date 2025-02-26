import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { HoverPopover } from "@/components/ui/hover-popover";
import { useNavigate } from "react-router-dom";

function Header() {
    const { language } = useLanguage();
    const t = useTranslation(language);
    const navigate = useNavigate();

    return (
      <header className="h-16 bg-white shadow-md dark:bg-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-3">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink className="text-2xl font-bold text-gray-800 dark:text-white" asChild>
                  <Link to="/main">
                    Luvento
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="text-gray-700 hover:text-blue-700 dark:text-white">
                <Link to="/calendar">
                  <NavigationMenuLink>{t.menu.calendar}</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem className="text-gray-700 hover:text-blue-700 dark:text-white">
                <Link to="/channels">
                  <NavigationMenuLink>{t.menu.channels}</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <HoverPopover
                content={
                  <Button 
                    variant="ghost" 
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => navigate('/properties/new')}
                  >
                    <div className="flex items-center">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Добавить объект
                    </div>
                  </Button>
                }
              >
                <NavigationMenuItem className="text-gray-700 hover:text-blue-700 dark:text-white cursor-pointer">
                  <Link to="/properties">
                    <NavigationMenuLink>{t.menu.properties}</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </HoverPopover>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
    );
}

export default Header;