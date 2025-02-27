import { Menu } from "./Menu.tsx";
import { Outlet, useLocation } from "react-router-dom";

export function RootLayout() {
    const location = useLocation();
    const noMenuPaths = ['/signup', '/signin'];
    const noHeaderPaths = ['/signup', '/signin'];

    const headerClass = noHeaderPaths.includes(location.pathname) ? 'py-0' : 'pt-14 pb-2';
    return (
        <div className="flex h-screen">
            {!noMenuPaths.includes(location.pathname) && <Menu />}

            <div className="flex-1 flex flex-col transition-all duration-300">
                <header className={`bg-gray-800 text-white ${headerClass} flex items-center`}>
                    <h1 className="text-xl font-semibold"></h1>
                </header>
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
