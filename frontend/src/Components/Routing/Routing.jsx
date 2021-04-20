import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from '../Loading';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Login = lazy(() => import('../Auth/Login'));
const Form = lazy(() => import('../Form/Form'));
const Admin = lazy(() => import('../Admin/Admin'));
const CreateForm = lazy(() => import('../Admin/CreateForm'));
const Responses = lazy(() => import('../Responses/Responses'));
const TopHeader = lazy(() => import('../Navigation/TopHeader'));
const ThankYou = lazy(() => import('../Form/ThankYou'));

export default function Routing() {
	const routes = [
		{
			path: '/admin',
			private: true,
			layout: true,
			render: () => <Admin />,
		},
		{
			path: '/login',
			private: false,
			layout: true,
			restricted: true,
			render: () => <Login />,
		},
		{
			path: '/admin/:id',
			private: true,
			layout: true,
			render: props => <CreateForm key={props.match.params.id} {...props} />,
		},
		{
			path: '/admin/:id/responses',
			private: true,
			layout: true,
			render: props => <Responses key={props.match.params.id} {...props} />,
		},
		{
			path: '/:id/thank',
			private: true,
			layout: true,
			render: props => <ThankYou key={props.match.params.id} {...props} />,
		},
		{
			path: '/:id',
			private: true,
			layout: true,
			render: props => <Form key={props.match.params.id} {...props} />,
		},
		{
			path: '/',
			private: false,
			layout: true,
			restricted: true,
			render: () => <Login />,
		},
	];
	return (
		<Suspense fallback={<Loading />}>
			<Switch>
				{routes.map((route, index) =>
					route.private ? (
						<PrivateRoute
							restricted={route.restricted}
							key={index}
							exact
							path={route.path}>
							<Layout layout={route.layout}>
								<route.render />
							</Layout>
						</PrivateRoute>
					) : (
						<PublicRoute
							restricted={route.restricted}
							exact
							path={route.path}
							key={index}>
							<Layout layout={route.layout}>
								<route.render />
							</Layout>
						</PublicRoute>
					)
				)}
				<Redirect to="/" />
			</Switch>
		</Suspense>
	);
}

function Layout(params) {
	const { children, layout, ...props } = params;
	return (
		<>
			{layout && <TopHeader />}
			<Suspense fallback={<Loading />}>
				{React.cloneElement(children, { ...props })}
			</Suspense>
		</>
	);
}
