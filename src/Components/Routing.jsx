import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from './Loading';

const Login = lazy(() => import('./Auth/Login'));
const Form = lazy(() => import('./Form/Form'));
const Admin = lazy(() => import('./Admin/Admin'));
const TopHeader = lazy(() => import('./Navigation/TopHeader'));

export default function Routing() {
	return (
		<Suspense fallback={<Loading />}>
			<TopHeader />
			<Switch>
				<Route exact path="/:id/admin" component={Admin} />
				<Route exact path="/:id" component={Form} />
				<Route exact path="/" component={Login} />
			</Switch>
		</Suspense>
	);
}
