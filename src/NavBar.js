import React, { useState } from 'react';
import './NavBar.css';
import { formatTime } from './components/Pomodoro/PomodoroClock';

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';

import { Link } from 'react-router-dom';

export const NavBar = ({ displayTime }) => {
	const [collapsed, setCollapsed] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<div>
			<Navbar color="" dark className="navbar">
				<div className="container">

				<NavbarToggler onClick={toggleNavbar} className="mr-2" />
				<NavbarBrand href="/" className="mr-auto">WorkTop</NavbarBrand>
				<NavbarBrand href="pomodoro" className="mr-auto">{formatTime(displayTime)}</NavbarBrand>


				
				<Collapse isOpen={!collapsed} navbar>
					<Nav navbar>
						<NavItem>
							<Link to="/notes/">
								<NavLink>Notes</NavLink>
							</Link>
						</NavItem>

						<NavItem>
							<Link to="/todo/">
								<NavLink>To Do List</NavLink>
							</Link>
						</NavItem>
						<NavItem>
							<Link to="/pomodoro">
								<NavLink>Pomodoro Clock</NavLink>
							</Link>
						</NavItem>
					</Nav>
				</Collapse>
			</div>
			</Navbar>

		</div>
	);
};

// export default Example;
