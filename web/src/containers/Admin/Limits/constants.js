import React from 'react';
import ReactSVG from "react-svg";

import { ICONS } from '../../../config/constants';
import STRINGS from '../../../config/localizedStrings';


export const COLUMNS_FEES = [
	{
		title: 'Verification Level',
		dataIndex: 'verification_level',
		key: 'verification_level'
	},
	{ title: 'Taker Fee', dataIndex: 'taker_fee', key: 'taker_fee' },
	{ title: 'Maker Fee', dataIndex: 'maker_fee', key: 'maker_fee' }
];

export const UPDATE_KEYS = [{ value: 1, label: 1 }, { value: 2, label: 2 }];

export const CURRENCY_KEYS = [
	{ value: 'fullname', label: 'fullname' },
	{ value: 'symbol', label: 'symbol' },
	{ value: 'active', label: 'active' },
	{ value: 'allow_deposit', label: 'allow_deposit' },
	{ value: 'allow_withdrawal', label: 'allow_withdrawal' },
	{ value: 'withdrawal_fee', label: 'withdrawal_fee' },
	{ value: 'min', label: 'min' },
	{ value: 'max', label: 'max' }
];

const returnArray = (obj, data, keyIndex, handleClick) => {
	return (<div className="d-flex">
		{/* <div>{keys.map((index) => ` ${obj[index]} `)}</div> */}
		<div className="blue-link pointer" onClick={() => handleClick(obj, data, keyIndex)}>{STRINGS.VIEW}</div>
		<div>
			{/* <ReactSVG path={ICONS.EDIT_ICON} wrapperClassName="edit_icon mx-2" /> */}
		</div>
	</div>);
};

export const getCurrencyColumns = (handleClick) => [
	{
		title: 'fullname',
		dataIndex: 'fullname',
		key: 'fullname',
		render: (v, data) => (<div className="d-flex">
			<div>{v}</div>
			<div className="pointer" onClick={() => handleClick(v, data, 'fullname')}>
				<ReactSVG path={ICONS.EDIT_ICON} wrapperClassName="edit_icon mx-2" />
			</div>
		</div>)
	},
	{
		title: 'symbol',
		dataIndex: 'symbol',
		key: 'symbol',
		render: (v, data) => (<div className="d-flex">
			<div>{v}</div>
			<div className="pointer" onClick={() => handleClick(v, data, 'symbol')}>
				<ReactSVG path={ICONS.EDIT_ICON} wrapperClassName="edit_icon mx-2" />
			</div>
		</div>)
	},
	{
		title: 'active',
		dataIndex: 'active',
		key: 'active',
		render: (v, data) => (<div className="d-flex">
			<div>{v ? 'active' : 'inactive'}</div>
			<div className="pointer" onClick={() => handleClick(v, data, 'active')}>
				<ReactSVG path={ICONS.EDIT_ICON} wrapperClassName="edit_icon mx-2" />
			</div>
		</div>)
	},
	{
		title: 'allow_deposit',
		dataIndex: 'allow_deposit',
		key: 'allow_deposit',
		render: (v, data) => (<div className="d-flex">
			<div>{v ? 'allow' : 'inallow'}</div>
			<div className="pointer" onClick={() => handleClick(v, data, 'allow_deposit')}>
				<ReactSVG path={ICONS.EDIT_ICON} wrapperClassName="edit_icon mx-2" />
			</div>
		</div>)
	},
	{
		title: 'allow_withdrawal',
		dataIndex: 'allow_withdrawal',
		key: 'allow_withdrawal',
		render: (v, data) => (<div className="d-flex">
			<div>{v ? 'allow' : 'inallow'}</div>
			<div className="pointer" onClick={() => handleClick(v, data, 'allow_withdrawal')}>
				<ReactSVG path={ICONS.EDIT_ICON} wrapperClassName="edit_icon mx-2" />
			</div>
		</div>)
	},
	{
		title: 'withdrawal_fee',
		dataIndex: 'withdrawal_fee',
		key: 'withdrawal_fee',
		render: (v, data) => (<div className="d-flex">
			<div>{v}</div>
			<div className="pointer" onClick={() => handleClick(v, data, 'withdrawal_fee')}>
				<ReactSVG path={ICONS.EDIT_ICON} wrapperClassName="edit_icon mx-2" />
			</div>
		</div>)
	},
	{
		title: 'min',
		dataIndex: 'min',
		key: 'min',
		render: (v, data) => (<div className="d-flex">
			<div>{v}</div>
			<div className="pointer" onClick={() => handleClick(v, data, 'min')}>
				<ReactSVG path={ICONS.EDIT_ICON} wrapperClassName="edit_icon mx-2" />
			</div>
		</div>)
	},
	{
		title: 'max',
		dataIndex: 'max',
		key: 'max',
		render: (v, data) => (<div className="d-flex">
			<div>{v}</div>
			<div className="pointer" onClick={() => handleClick(v, data, 'max')}>
				<ReactSVG path={ICONS.EDIT_ICON} wrapperClassName="edit_icon mx-2" />
			</div>
		</div>)
	},
	{
		title: 'increment_unit',
		dataIndex: 'increment_unit',
		key: 'increment_unit',
		render: (v, data) => (<div className="d-flex">
			<div>{v}</div>
			<div className="pointer" onClick={() => handleClick(v, data, 'increment_unit')}>
				<ReactSVG path={ICONS.EDIT_ICON} wrapperClassName="edit_icon mx-2" />
			</div>
		</div>)
	},
	{
		title: 'deposit_limits',
		dataIndex: 'deposit_limits',
		key: 'deposit_limits',
		render: (d, data) => returnArray(d, data, 'deposit_limits', handleClick)
	},
	{
		title: 'withdrawal_limits',
		dataIndex: 'withdrawal_limits',
		key: 'withdrawal_limits',
		render: (d, data) => returnArray(d, data, 'withdrawal_limits', handleClick)
	}
];

const getDepositWithdrawFields = (userTier, key, onchange) => {
	const userFields = {};
	userTier.map((level) => {
		userFields[level] = {
			[`${key}_${level}`]: {
				type: 'select',
				options: [
					{ label: 'unlimited', value: '0' },
					{ label: 'disabled', value: '-1' },
					{ label: 'custom', value: '1'}
				],
				onChange: (event) => onchange(event, level)
			}
		}
		return 0;
	});
	return userFields;
};

export const getCoinsFormFields = (config = {}, onchange) => {
	const userLevels = [];
	const tiers = config.tiers ? parseInt(config.tiers) : 4;
	for (var i = 1; i <= tiers; i++) {
		userLevels.push(i)
	};
	return ({
		'fullname': {
			fullname: {
				type: 'text',
				label: 'fullname'
			}
		},
		'symbol': {
			symbol: {
				type: 'text',
				label: 'symbol'
			}
		},
		'active': {
			active: {
				type: 'select',
				label: 'active',
				options: [
					{ label: 'active', value: 'true' },
					{ label: 'deactive', value: 'false' }
				]
			}
		},
		'allow_deposit': {
			allow_deposit: {
				type: 'select',
				label: 'allow deposit',
				options: [
					{ label: 'allow', value: 'true' },
					{ label: 'disallow', value: 'false' }
				]
			}
		},
		'allow_withdrawal': {
			allow_withdrawal: {
				type: 'select',
				label: 'allow withdrawal',
				options: [
					{ label: 'allow', value: 'true' },
					{ label: 'disallow', value: 'false' }
				]
			}
		},
		'withdrawal_fee': {
			withdrawal_fee: {
				type: 'number',
				label: 'withdrawal fee',
			}
		},
		'min': {
			min: {
				type: 'number',
				label: 'min',
			}
		},
		'max': {
			max: {
				type: 'number',
				label: 'max',
			}
		},
		'increment_unit': {
			increment_unit: {
				type: 'number',
				label: 'increment unit',
			}
		},
		'deposit_limits': getDepositWithdrawFields(userLevels, 'deposit_limits', onchange),
		'withdrawal_limits': getDepositWithdrawFields(userLevels, 'withdrawal_limits', onchange)
	})
};
