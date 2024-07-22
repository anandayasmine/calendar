import React, { Component } from "react"
import Router, { withRouter } from "next/router"
import _ from 'lodash'
import Link from "next/link"
import Image from "next/image"

import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse,
	Stack,
	ListItem,
} from "@mui/material"

import {
	ExpandLess,
	ExpandMore,
} from "@mui/icons-material"

import {
	getHead,
} from "@/app/data/head"

import {
	IconCustom,
	IconButton,
	LinkWrapper,
} from "@/components/index"


import { locale } from "@/app/data/head"
import { Helpers } from "@/app/utils"
import { Url } from "next/dist/shared/lib/router/router"

interface INavigationProps {
	assignMainLayout?: (params: any) => void;
	navAction?: (params: any) => void;
	handleOpenModalConfirmLeave?: (params: any) => void;
	showAlertOnLeave?: boolean;
}

interface INavigationState {
	mainClassName: string;
	activePage: string;
	minimize: boolean;
	showNavigation: boolean;
	head: any;
}

class Navigation extends React.Component<INavigationProps, INavigationState> {
	constructor(props: INavigationProps) {
		super(props)

		this.state = {
			mainClassName: 'main-layout-section-navigation',
			activePage: '/',
			minimize: false,
			showNavigation: false,
			head: []
		}
		Router.events.on('routeChangeComplete', () => {
			const activePage = Router.pathname
			this.setState({
				activePage
			})
		})
	}




	async assignHead() {

		try {

			const activePage = Router?.pathname

			const head = await getHead({ name: 'headNavigation' })

			await this.setState({
				head,
				activePage
			})

		}
		catch (err) {


		}

	}

	async handleEvent(params: { type: any; index?: any }) {

		try {

			switch (params?.type) {

				case 'click-parent-menu': {

					let head = this.state.head

					const isOpen = head[params?.index]['open']
					head[params?.index]['open'] = !isOpen


					this.setState({
						head,
					})

				} break

				case 'click-nav-action': {

					this.setState({
						showNavigation: !this.state.showNavigation
					})

				} break

			}

		}
		catch (err) {

		}

	}


	async setActivePageFromPath(params: { activePage: any; head?: any }) {

		try {

			const activePage = params?.activePage || Router.pathname

			const head = params?.head || this.state.head

			let foundIndex = -1

			head?.forEach((menu: { child: any[] }, indexMenu: any) => {

				const found = menu?.child?.find((subMenu: { href: any }) => subMenu.href == activePage)

				if (found) {
					foundIndex = indexMenu
				}

			})

			if (foundIndex >= 0) {

				await this.handleEvent({
					type: 'click-parent-menu',
					index: foundIndex,
				})

			}

			return activePage

		}
		catch (err) {


		}

	}

	async componentDidMount() {

		await this.assignHead()

		await this.setState({
			minimize:
				window.innerWidth > 768 && window.innerWidth < 1100
					? true
					: false,
		})


	}

	async componentDidUpdate(prevProps: any, prevState: { activePage: string }) {

		if (prevState?.activePage != this.state.activePage) {

			await this.setActivePageFromPath({ activePage: this.state.activePage })

		}


	}

	componentDidCatch(error: any, errorInfo: any) {


	}

	render() {

		const {
			state: {
				activePage,
				head,
				mainClassName,
			},
			props: {
			}
		} = this

		return (
			<nav
				className={
					mainClassName + " " + (this.state.minimize ? "minimized" : "")
				}
			>

				<List
					className={mainClassName + '-list'}
				>

					{
						head?.length > 0 &&
						head.map((menu: {
							child?: any[];
							className?: any;
							icon?: any;
							label?: {
								label?: string;
								key?: string;
								value?: object
							};
							open?: boolean;
							id?: string;
							href?: string;
						}, indexMenu?: string
						) => {

							if (menu?.child && menu?.child?.length > 0) {


								return (
									<>

										{/* === PARENT === */}

										<ListItemButton
											key={'menu-' + indexMenu}
											className={mainClassName + '-list-menu ' + (menu?.className || '')}
											href={menu?.href || ''}
										>
											{
												menu.icon &&
												<ListItemIcon>
													<IconCustom icon={menu.icon} />
												</ListItemIcon>
											}
											<ListItemText primary={locale({ label: menu?.label }) || ''} />
											<Stack className={mainClassName + '-list-menu-expand'}>
												{menu?.open ? <ExpandLess /> : <ExpandMore />}
											</Stack>
										</ListItemButton>



										{/* === CHILD === */}

										<Collapse in={menu?.open} timeout="auto" unmountOnExit>
											<List
												component="div"
												disablePadding
											>
												{
													menu.child.map((subMenu: {
														href?: Url;
														icon?: any;
														label?: string | {
															label?: string;
															key?: string;
															value?: object
														}
													}, indexSubMenu: number) =>
														<ListItemButton
															key={'sub-menu-' + indexMenu + '-' + indexSubMenu}
															className={mainClassName + '-list-sub-menu ' + (activePage == subMenu.href ? 'active' : '')}
														>
															<LinkWrapper href={subMenu?.href}>
																{
																	subMenu.icon &&
																	<ListItemIcon>
																		<IconCustom icon={subMenu.icon} />
																	</ListItemIcon>
																}
																<ListItemText primary={locale({ label: subMenu?.label }) || ''} />
															</LinkWrapper>
														</ListItemButton>

													)
												}
											</List>
										</Collapse >

									</>
								)

							}
							else {
								return (
									<ListItemButton
										key={'nav-' + indexMenu + '-' + menu.id}
										className={mainClassName + '-content-menu ' + (activePage == menu.href ? 'active' : '')}

									>
										<LinkWrapper href={menu?.href}>
											{
												menu.icon &&
												<ListItemIcon>
													<IconCustom icon={menu.icon} />
												</ListItemIcon>
											}

											<ListItemText primary={locale({ label: menu?.label }) || ''} />
										</LinkWrapper>

									</ListItemButton>

								)
							}

						})
					}

				</List>

			</nav >
		)
	}
}
export default (Navigation)