import React from 'react';
import {ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent} from 'react-pro-sidebar';
import '../custom.scss';
import CompilerAndWorkerManager from "./CompilerAndWorkerManager";
import CellType from "./CellTypeEnum";

function Sidebar(props) {
	return (
		<ProSidebar>
			<SidebarContent>
				<div className="side-bar-content">
					<Menu iconShape="square">
						<MenuItem>Dashboard</MenuItem>
						<SubMenu title="Add Cell">
							<MenuItem onClick={() => props.addNewCell("markdown")}>Add Markdown Cell</MenuItem>
							<MenuItem onClick={() => props.addNewCell("empty")}>Add Java Empty Cell</MenuItem>
							<MenuItem onClick={() => props.addNewCell("minimal-node")}>Add Minimal Node</MenuItem>
							<MenuItem onClick={() => props.addNewCell("periodic-node")}>Add Periodic Action Node</MenuItem>
						</SubMenu>
					</Menu>
				</div>
			</SidebarContent>
			<SidebarFooter>
				<div className="side-bar-footer">
					<CompilerAndWorkerManager cells={props.cells}
											  changeConsoleCellCode={(newCode) => props.changeConsoleCellCode(newCode)}
											  addConsoleCellCode={(newCode) => props.addConsoleCellCode(newCode)}
											  incrementCheerpJPackageCounter={() => props.incrementCheerpJPackageCounter()}
					/>
				</div>
			</SidebarFooter>
		</ProSidebar>
	);
}

export default Sidebar;
