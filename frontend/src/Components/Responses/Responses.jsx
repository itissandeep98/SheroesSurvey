/**
 * @module Responses
 */
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { formFetch } from '../../Store/ActionCreators/form';
import Section from './Section';
import NavigationBar from '../Navigation/NavigationBar';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {
	generateExcel,
	responseFetch,
} from '../../Store/ActionCreators/response';
import { Placeholder } from 'semantic-ui-react';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { showAlert } from '../Alert';
import { frontUrl } from '../../Store/Url';
/**
 * Represents the Responses received for a form.
 * @param {Integer} id - Unique ID of the Form.
 *
 * @property {Object} details -Details of the form
 * @property {String} details.heading -Heading of form
 * @property {List} structure -List of section IDs in form
 *
 */
function Responses(props) {
	const { id } = props?.match?.params;
	const [curr, setCurr] = useState(1);
	const [details, setDetails] = useState('');
	const [structure, setStructure] = useState([]);
	const [responses, setResponses] = useState(null);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(true);
	const [downloadLoading, setDownloadLoading] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(responseFetch(id)).then(res => {
			setResponses(res);
			setTotal(res?.length);
			setLoading(false);
		});
		dispatch(formFetch(id)).then(res => {
			setStructure(res?.section_sequence);
			setDetails(res);
		});
	}, [dispatch]);

	const generateDownload = () => {
		setDownloadLoading(true);
		dispatch(generateExcel(id)).then(res => {
			const filename =
				details?.heading?.replace(' ', '_') +
				new Date().toISOString().slice(0, 16) +
				'.csv';
			if (window.navigator.msSaveBlob) {
				var blobObject = new Blob([res], { type: 'text/csv' });
				window.navigator.msSaveBlob(blobObject, filename);
			} else {
				var anchor = document.createElement('a');
				anchor.download = filename;
				if (window.URL.createObjectURL) {
					var blobObject = new Blob([res], { type: 'text/csv' });
					anchor.href = window.URL.createObjectURL(blobObject);
				} else {
					anchor.href =
						'data:text/csv;charset=utf-8,' + encodeURIComponent(res);
				}
				if (document.createEvent) {
					var event = document.createEvent('MouseEvents');
					event.initEvent('click', true, true);
					anchor.dispatchEvent(event);
				} else {
					anchor.click();
				}
			}
			setDownloadLoading(false);
		});
	};
	return (
		<Container>
			<Row>
				<Col className="text-center mt-1">
					<NavigationBar form_id={id} />
					<h1 className="d-inline text-capitalize">{details.heading}</h1>
					{responses?.length > 0 && (
						<Tooltip title="Download All Responses">
							<IconButton
								className="float-right"
								onClick={generateDownload}
								disabled={downloadLoading}>
								<ListAltIcon fontSize="large" />
							</IconButton>
						</Tooltip>
					)}
				</Col>
			</Row>
			<Row className="bg-white p-3 mt-3 rounded_lg">
				{!loading ? (
					<>
						{responses?.length > 0 ? (
							<Col>
								<h3>Total {responses.length} Responses</h3>
								<IconButton onClick={() => setCurr(Math.max(1, curr - 1))}>
									<ArrowBackIosIcon />
								</IconButton>
								<p className="text-danger d-inline">{curr}</p> of {total}{' '}
								Responses
								<IconButton onClick={() => setCurr(Math.min(total, curr + 1))}>
									<ArrowForwardIosIcon />
								</IconButton>
								<p className="text-muted float-right">
									Response by {responses?.[curr - 1]?.[1]}
								</p>
							</Col>
						) : (
							<Col className="text-muted">
								<h3>No One has Responded to this form yet</h3>
								<Button
									onClick={() => {
										navigator.clipboard.writeText(`${frontUrl}/${id}`);
										showAlert('URL Copied to Clipboard');
									}}>
									<FileCopyIcon />
									Copy form Url
								</Button>
							</Col>
						)}
					</>
				) : (
					<Col>
						<Placeholder fluid>
							<Placeholder.Paragraph>
								<Placeholder.Line />
								<Placeholder.Line />
							</Placeholder.Paragraph>
						</Placeholder>
					</Col>
				)}
			</Row>
			{responses?.length > 0 && (
				<Row className="bg-white p-3 mt-3 rounded_lg">
					<Col>
						{structure.map((sectionId, index) => (
							<Section
								key={sectionId}
								index={index + 1}
								id={sectionId}
								formId={id}
								response={responses?.[curr - 1]?.[2]}
							/>
						))}
					</Col>
				</Row>
			)}
		</Container>
	);
}

export default Responses;
