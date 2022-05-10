import React from 'react';
import {ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent} from 'react-pro-sidebar';
import '../custom.scss';
import LoadCheerpJAndCompileCode from "./LoadCheerpJAndCompileCode";

function Sidebar() {
	return (
		<ProSidebar>
			<SidebarContent>
				<div className="side-bar-content">
					<Menu iconShape="square">
						<MenuItem>Dashboard</MenuItem>
						<SubMenu title="Components">
							<MenuItem>Component 1</MenuItem>
							<MenuItem>Component 2</MenuItem>
						</SubMenu>
					</Menu>
				</div>
			</SidebarContent>
			<SidebarFooter>
				<div className="side-bar-footer">
					<LoadCheerpJAndCompileCode/>
				</div>
			</SidebarFooter>
		</ProSidebar>
	);
}

export default Sidebar;
