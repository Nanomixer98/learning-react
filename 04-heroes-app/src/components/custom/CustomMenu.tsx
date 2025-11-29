import {
  NavigationMenuItem,
  NavigationMenuLink,
} from '@radix-ui/react-navigation-menu';
import { Link, useLocation } from 'react-router';
import { cn } from '../../lib/utils';
import { NavigationMenu, NavigationMenuList } from '../ui/navigation-menu';

export const CustomMenu = () => {
  const { pathname } = useLocation();
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <NavigationMenu className="mb-5">
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(isActive('/') && 'bg-slate-200 rounded-md p-2')}
          >
            <Link to="/">Documentation</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(isActive('/search') && 'bg-slate-200 rounded-md p-2')}
          >
            <Link to="/search">Search heroes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
