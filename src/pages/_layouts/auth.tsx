
import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="grid grid-cols-2 min-h-screen">
            <div className="h-full bg-muted border-r border-foreground/5 p-10 text-muted-foreground flex flex-col">

            </div>

            <div>
                <Outlet />
            </div>
        </div>
    )
}