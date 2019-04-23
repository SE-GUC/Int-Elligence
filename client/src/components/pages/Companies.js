import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import 'mdbreact/dist/css/mdb.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import trans from '../translations/companiesTranslation';
class Companies extends Component {
	state = {
		certainFormType: []
	};
	componentDidMount() {
		axios.get('/routes/api/dynamicForms/').then((res) => {
			if (Array.isArray(res.data.data)) {
				this.setState({ certainFormType: res.data.data });
			}
		});
	}
	getAttributes = () => {
		return this.state.certainFormType.map((Form, index) => {
			var KEYS = [];
			for (var key in Form) {
				KEYS.push(key);
			}
			return (
				<Flippy
					flipOnHover={false}
					flipOnClick={true}
					flipDirection="horizontal"
					ref={(r) => (this.flippy = r)}
					style={{ width: '100%', height: '500px' }}
				>
					<FrontSide
						style={{
							borderStyle: 'solid',
							borderWidth: '5px',
							backgroundSize: '464px 400px'
						}}
					>
						<div
							style={{
								textAlign: 'center',
								fontSize: '50px',
								textShadow: '-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white'
							}}
						>
							<h1
								style={{
									textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white',
									fontSize: '100px'
								}}
							>
								{Form.companyName}
							</h1>
							<i
								class="fas fa-angle-double-left"
								title="click to view details"
								style={{ paddingRight: '650px', paddingTop: '100px' }}
							/>
							<i
								class="fas fa-angle-double-right"
								title="click to view details"
								style={{ paddingLeft: '650px', paddingTop: '100px' }}
							/>
							<br />
						</div>
					</FrontSide>
					<BackSide
						style={{
							backgroundColor: '#f7f7f7',
							borderStyle: 'solid',
							borderWidth: '5px',
							paddingLeft: '60px'
						}}
					>
						<div>
							{KEYS.map((key, index) => {
								if (key !== '_id' && key !== 'formType' && key !== 'investorId' && key !== 'lawyerId') {
									var constraints = Form[key];
									for (var i in constraints) {
										if (Array.isArray(constraints)) return constraints.map((att, index) => {});
										return (
											<h5>
												<i class="fas fa-circle" style={{ fontSize: '13px' }} /> {key} :{' '}
												<span style={{ textAlign: 'center' }} />{' '}
												<span style={{ color: '#9ad1e7' }}>{constraints}</span>{' '}
											</h5>
										);
									}
								}
							})}
						</div>
					</BackSide>
				</Flippy>
			);
		});
	};
	render() {
		trans.setLanguage(this.props.lang);
		return (
			<div>
				<div
					style={{
						backgroundColor: '#a3dbf1',
						paddingBottom: '20px',
						paddingTop: '20px',
						textAlign: 'center',
						fontSize: '60px',
						color: 'dark',
						flexDirection: 'row',
						justifyContent: 'flex-end'
					}}
				>
					<h2 style={{ marginTop: '30px', paddingTop: '50px', fontSize: '50px' }}>{trans.title}</h2>
				</div>
				<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'right', justifyContent: 'right' }}>
					{this.getAttributes()}
				</div>
			</div>
		);
	}
}
export default Companies;
