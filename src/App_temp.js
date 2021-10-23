import React, { useState } from 'react';
import './App.css';
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

export const Example = ({ displayTime }) => {
	const [collapsed, setCollapsed] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<div>
			<Navbar color="" dark className="navbar">
				<NavbarToggler onClick={toggleNavbar} className="mr-2" />

				<NavbarBrand className="mr-auto">WorkTop</NavbarBrand>

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
							<Link to="/Pomodoro">
								<NavLink>Pomodoro {formatTime(displayTime)}</NavLink>
							</Link>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

// export default Example;
