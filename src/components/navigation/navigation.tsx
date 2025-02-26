import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle, NavigationMenuLink } from "../ui/navigation-menu";
import { Link } from "react-router-dom"

export default function Navigation() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
            <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link to="/calendar">
              Calendar
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link to="/channels">
              Channels
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}