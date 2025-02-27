import logo from '../assets/Logo.png'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOutUser } from '../Reducers/sign-reducer.ts';

export function Menu() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(logOutUser());
    };

    return (
        <header className="absolute bg-[#333] top-0 left-0 py-2 px-0 flex items-center justify-between w-full lg:py-0">
            <div>
                <Link to="/home">
                    <img src={logo} alt="SpaceX" className="w-16 py-1 px-2 self-center" />
                </Link>
            </div>

            <nav className="navbar">
                <ul className="">
                    <li><Link to="launches" className="linkBtn">Launches</Link></li>
                    <li><Link to="launchpads" className="linkBtn">LaunchPads</Link></li>
                    <li><Link to="landpads" className="linkBtn">LandPads</Link></li>
                    <li><Link to="payloads" className="linkBtn">PayLoads</Link></li>
                    <li><Link to="crew" className="linkBtn">Crew</Link></li>
                    <li><Link to="myaccount" className="linkBtn">Profile</Link></li>
                    <li><button onClick={handleLogout}><Link to="signin" className="linkBtn">LogOut</Link></button></li>
                </ul>
            </nav>
        </header>
    );
}
