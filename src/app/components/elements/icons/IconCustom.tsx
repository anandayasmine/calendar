"use client"
import React from 'react'
import classnames from 'classnames'

import { ImageHandler } from '../image'

function MuiIcon(props: { theme: any; iconName: any; color: any; className: any; }) {

	const {
		theme,
		iconName,
		color,
		className,
	} = props

	const capitalize = (str: string) => {
		return str?.replace(/\b\w/g, function (m: string) { return m.toUpperCase() })
	}

	const arrName = iconName?.split('_')

	let muiIconName = capitalize(iconName)

	if (arrName?.length > 0) {

		muiIconName = arrName.map((item: any) => capitalize(item)).join('')

	}

	if (muiIconName && muiIconName != ' ') {

		let MuiCustomIcon: any

		try {

			const Icons = require("@mui/icons-material")

			MuiCustomIcon = Icons && Icons[muiIconName as keyof object]

		}
		catch (err) {

			console.log("🚀 ~ file: IconCustom.jsx ~ line 140 ~ MuiIcon ~ err", err)

		}

		if (MuiCustomIcon) {

			return (
				<MuiCustomIcon
					className={className + ' mui-icon'}
					color={theme}
					style={{ color: color }}
				/>

			)

		}
		else {

			return <></>

		}

	}

	else {

		return <></>

	}

}

export default function IconCustom(props: {
	icon?: any;
	name?: any;
	theme?: any;
	type?: any;
	color?: any;
	className?: any;
	transform?: any;
	size?: any;
	disableLoader?: any;
}) {

	const {
		icon,
		name,
		theme,
		type,
		color,
		className,
		transform,
		size,
		disableLoader,
	} = props

	const iconName = icon?.constructor?.name == 'Object' ? icon?.name : (icon || name)

	if (iconName) {

		const refactorClassName = classnames(
			'elements-icon-custom',
			className,
			theme,
			(size ? 'size-' + size : ''),
			transform,
			'icon-name-' + iconName,
		)

		const imageConfig = {
			width: 'auto',
			height: 'auto',
			disableLoader,
		}

		if (type == 'mui') {

			return (
				<MuiIcon
					iconName={iconName}
					theme={theme}
					color={color}
					className={refactorClassName}
				/>
			)

		} else {
			switch (iconName) {
				default:
					return <MuiIcon iconName={iconName} className={refactorClassName} theme={theme} color={color} />
					break
			}
		}

	}

	else {
		return <></>
	}

}
