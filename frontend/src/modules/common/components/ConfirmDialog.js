import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

const ConfirmDialog = ({id, icon, headerTitle, bodyTitle, onConfirm}) => (

    <span>
        <button type="button" className="btn btn-link btn-sm" 
            data-toggle="modal" data-target={"#" + id}>
            <span className={"fas fa-" + icon}></span>
        </button>
        <div id={id} className="modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{headerTitle}</h5>
                    </div>
                    <div className="modal-body">
                        <p>{bodyTitle}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" 
                            data-dismiss="modal">
                            <FormattedMessage id="project.global.buttons.cancel"/>
                        </button>
                        <button type="button" className="btn btn-secondary" 
                            data-dismiss="modal" 
                            onClick={onConfirm}>
                            <FormattedMessage id="project.global.buttons.ok"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </span>

);


ConfirmDialog.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    headerTitle: PropTypes.string.isRequired,
    bodyTitle: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired
}

export default ConfirmDialog;
