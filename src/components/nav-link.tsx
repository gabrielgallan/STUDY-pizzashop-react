import { Link, useLocation, type LinkProps } from "react-router-dom";

type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
    const { pathname } = useLocation()

    return <Link
        data-current={pathname === props.to}
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foregorund hover:text-muted-foreground/95 data-[current=true]:text-muted-foreground/95"
        {...props}
    />
}