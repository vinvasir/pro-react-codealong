import React, { Component, PropTypes } from 'react';
import CheckList from './CheckList';

let titlePropType = (props, propName, componentName) => {
	if (props[propName]) {
		let value = props[propName];

		if(typeof value !== 'string' || value.length > 80) {
			return new Error(
				'${propName} in ${componentName} is longer than 80 characters'
			);
		}
	}
}

class Card extends Component {
	constructor() {
		super();
		this.state = {
			showDetails: false
		};
	}

	toggleDetails() {
		this.setState({showDetails: !this.state.showDetails});
	}

	render() {
		let cardDetails;
		if (this.state.showDetails) {
			cardDetails = (
				<div className="card__details">
					{this.props.description}
					<CheckList cardId={this.props.id} tasks={this.props.tasks} />
				</div>
			);
		}

		return (
			<div className="card">
				<div className="card__title" 
					className={this.state.showDetails ? "card__title card__title--is-open" : "card__title"}
					onClick={this.toggleDetails.bind(this)}>
					{this.props.title}
				</div>
				{cardDetails}
			</div>
		);
	}
}

Card.propTypes = {
	id: PropTypes.number,
	title: titlePropType,
	description: PropTypes.string,
	color: PropTypes.string,
	tasks: PropTypes.arrayOf(PropTypes.object)
};

export default Card;