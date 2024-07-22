import React, { Component } from "react";
import Image from 'next/image'
import Link from "next/link";
import { locale } from '@/app/data/head'

import { connect } from 'react-redux'
import { assignMainLayout } from '@/app/contexts/redux/actions'

import {
	AppBar,
	Toolbar,
	Typography,
	MenuItem,
	Menu,
	Avatar,
	Tooltip,
	ListItemIcon,
	Button,
	Stack,
} from '@mui/material'

import {
	IconCustom,
	IconButton,
	SelectLanguage,
	Dropdown,
	ButtonDropdown,
	ImageHandler,
} from '@/components/index'

import { getHead } from "@/app/data/head";
import { Auth } from "@/app/data/local";
import Router from "next/router";
import { Config } from "@/app/constant";


export interface IHeaderMainLayoutProps {
	assignMainLayout: (params: any) => void;
	navAction: (params: any) => void;
}

export interface IHeaderMainLayoutState {
	mainClassName: string;
	showUserDetail: boolean;
	showNavigation: boolean;
	head: any;
	dataUser: any;
	anchorEl: any;
}


class HeaderMainLayout extends React.Component<IHeaderMainLayoutProps, IHeaderMainLayoutState> {
	constructor(props: IHeaderMainLayoutProps) {
		super(props);

		this.state = {
			mainClassName: 'main-layout-section-header',
			showUserDetail: false,
			showNavigation: true,
			head: {},
			dataUser: {},
			anchorEl: {},
		}
	}

	async handleEvent(params: { type: any; event?: any; id?: any; }) {

		try {


			switch (params?.type) {

				case 'click-user-card': {

					this.setState({
						anchorEl: params?.event?.currentTarget,
						showUserDetail: params?.event?.currentTarget
					})

				} break

				case 'click-user-card-close': {


					this.setState({
						showUserDetail: false
					})

					switch (params?.id) {

						case 'sign-out': {

							this.props.assignMainLayout({
								type: 'ASSIGN_OPEN_LOADER',
							})

							await Auth.logout()

						} break

					}

				} break

				case 'click-nav-action': {

					this.props.navAction({
						type: params?.type,
						showNavigation: !this.state.showNavigation
					})

					this.setState({
						showNavigation: !this.state.showNavigation
					})


				} break

				case 'event-profile': {

				} break

			}

		}
		catch (err) {

			this.props.assignMainLayout({
				type: 'ASSIGN_CLOSE_LOADER',
			})

		}

	}

	async assignHead() {

		try {

			const head = getHead({
				name: 'headHeaderMainLayout'
			})

			const dataUser = Auth.getDataUser()


			this.setState({
				head,
				dataUser,
			})

		}
		catch (err) {


		}

	}

	componentDidMount() {
		this.assignHead()

	}
	componentDidUpdate(prevProps: any, prevState: any) {

	}

	render() {
		const {
			state: {
				mainClassName,
				showUserDetail,
				head,
				dataUser,
				showNavigation,
				anchorEl,
			},
			props: {
			},
		} = this;

		return (
			<>
				{
					head &&
					<div className={mainClassName}>
						<AppBar className={mainClassName + '-app-bar'} position="static">
							<Toolbar className={mainClassName + '-tool-bar'}>
								<Stack className={mainClassName + '-action-start'}>
									<Stack className={mainClassName + '-nav-button'}>
										<IconButton
											icon={showNavigation ? 'MenuOpen' : 'Menu'}
											handleClick={this.handleEvent.bind(this, {
												type: 'click-nav-action'
											})}
										/>
									</Stack>
									<Stack className={mainClassName + '-logo'}>
										<Link href='/'>
											<ImageHandler
												src={Config.LogoProject}
												alt={"Logo " + Config.appName}
												className="image-contain"
											/>
										</Link>
									</Stack>
								</Stack>
								<Stack className={mainClassName + '-action-end'} direction={'row'} spacing={1} alignItems={'center'}>
									<Tooltip title={"Open settings for " + (dataUser?.name || '')}>
										<Button
											className={mainClassName + '-user-button card-button'}
											onClick={(event) => this.handleEvent({
												type: 'click-user-card',
												event,
											})}
										>
											<Avatar alt={dataUser?.name} src={dataUser?.image} />
											<Typography className="text-subtitle" variant='subtitle2'>{dataUser?.role?.name || ''}</Typography>
											<Typography className="text-title" variant='h6'>{dataUser?.name || ''}</Typography>

										</Button>
									</Tooltip>
									<Menu
										sx={{ mt: '45px' }}
										className={mainClassName + '-menu'}
										id="menu-user-card"
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
										keepMounted
										transformOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
										open={Boolean(showUserDetail)}
										onClose={this.handleEvent.bind(this, {
											type: 'click-user-card-close'
										})}
									>
										{
											head?.userSetting?.length > 0 &&
											head?.userSetting?.map((setting: { id: string; icon: any; label: { label?: string | undefined; key?: string | undefined; value?: object | undefined; }; }, indexSetting: string) => (
												<MenuItem
													key={'menu-setting-' + setting.id + '-' + indexSetting}
													onClick={this.handleEvent.bind(this, {
														type: 'click-user-card-close',
														id: setting.id
													})}
												>
													<ListItemIcon>
														<IconCustom icon={setting.icon} />
													</ListItemIcon>
													<Typography>{locale({ label: setting.label })}</Typography>
												</MenuItem>
											))}
									</Menu>
								</Stack>
							</Toolbar>
						</AppBar>
					</div>
				}
			</>
		)
	}
}

export default connect(null, { assignMainLayout })(HeaderMainLayout)
