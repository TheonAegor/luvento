import { Link } from "react-router-dom";
                    import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";

function Header() {
    return (
      <header className="bg-white shadow-md dark:bg-gray-800">
                <NavigationMenu className="max-w-screen-xl mx-auto px-4 lg:px-6 py-3 flex justify-between items-center">
            <NavigationMenuList>
            <NavigationMenuItem>
          <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-2xl font-bold text-gray-800 dark:text-white`} asChild>
            <Link to="/main">
              Luvento
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
            <NavigationMenuItem className="block py-2 px-4 text-gray-700 hover:text-blue-700 dark:text-white">
          <NavigationMenuLink asChild>
            <Link to="/calendar">
              Calendar
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="block py-2 px-4 text-gray-700 hover:text-blue-700 dark:text-white">
          <NavigationMenuLink asChild>
            <Link to="/channels">
              Channels
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>           
      </header>
    );
  }
  
  export default Header;