import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectGroup = ({
	name,
	value,
	error,
	info,
	onChange,
	option
}) => {
	const selectOptions = option.map((item) => (
		<option key={item.label} value={item.value}>
			{item.label}
		</option>
	));

	return (
		<div className="form-group">
          <select 
           className={classnames("form-control form-control-lg", {
           	'is-invalid' : error
           })} 
           value={value}
           onChange={onChange}
           name={name} >
           	{selectOptions}
           </select>
       	   {info && <small className="form-text text-muted">{info}</small>}
           {error && <div className="invalid-feedback">{error}</div>}
        </div>
	)
}

SelectGroup.propTypes = {
	name : PropTypes.string.isRequired,
	value : PropTypes.string.isRequired,
	error : PropTypes.string,
	info : PropTypes.string,
	onChange : PropTypes.func.isRequired
}

export default SelectGroup;