import React from "react"

import {
	Loader,
	NoticeCard
} from "@/components/index"

import Head from "next/head"
import { Stack, Typography } from "@mui/material"
import { locale } from "@/app/data/head"
import { Config } from "@/app/constant"

export interface IContentLayoutProps {
	children?: any;
	title?: any;
	theme?: any;
	className?: any;
	customTitle?: any;
	breadcrumbs?: any;
	hideTitle?: any;
	slot?: any;
	access?: any;
	showLoader?: boolean;
}

export interface IContentLayoutState {
	mainClassName: string;
	showLoader?: boolean;
}

class ContentLayout extends React.Component<IContentLayoutProps, IContentLayoutState> {


	// === Notes ===
	// => Handling Alert
	// => Handling Loader
	// => Handling Modal

	constructor(props: IContentLayoutProps) {
		super(props)

		this.state = {
			mainClassName: 'content-layout',
			showLoader: false,
		}
	}


	openLoader() {
		this.setState({
			showLoader: true,
		})
	}

	closeLoader() {
		this.setState({
			showLoader: false,
		})
	}

	assignPropsLoader() {
		this.setState({
			showLoader: this.props.showLoader,
		})
	}


	async componentDidMount() {

		await this.assignPropsLoader()

	}

	async componentDidUpdate(prevProps: { showLoader: any }) {

		if (prevProps.showLoader !== this.props.showLoader) {
			await this.assignPropsLoader()
		}

	}

	async componentWillUnmount() {

		try {

		}
		catch (err) {


		}

	}

	render() {
		const {
			state: {
				mainClassName,
				showLoader,
			},
			props: {
				children,
				title,
				theme,
				className,
				customTitle,
				breadcrumbs,
				hideTitle,
				slot,
				access,
			},
		} = this


		const isHeaderActive = Boolean((title && !hideTitle) || breadcrumbs || slot?.tools)

		return (
			<>
				<Head>

					<meta name="viewport" content="width=device-width, initial-scale=1.0" />

					{
						customTitle ?
							<title>
								{customTitle}
							</title>
							:
							<title>
								{Config.appName +
									(title ? " - " + locale({ label: title }) : "")}
							</title>

					}

				</Head>

				<div
					className={
						mainClassName + " " +
						(className || "")
						+ " " + (theme || "")
						+ " " + (!isHeaderActive ? 'header-disabled' : '')
					}
				>


					{
						(isHeaderActive && access) &&
						<Stack className={mainClassName + '-header'} direction={'row'} spacing={1} justifyContent='space-between'>
							{
								(title && !hideTitle) ?
									<Typography className={mainClassName + '-header-title'} variant='h6' component='h1'>{locale({ label: title })}</Typography>
									:
									<div></div>
							}

							{
								slot?.tools
							}
						</Stack>
					}

					<Loader isOpen={showLoader} />

					<div className={mainClassName + '-main'}>
						{children}
					</div>


				</div>
			</>
		)
	}
}


export default ContentLayout
