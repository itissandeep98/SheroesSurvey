import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from './Loading';

const Login = lazy(() => import('./Auth/Login'));
const Form = lazy(() => import('./Form/Form'));
const Admin = lazy(() => import('./Admin/Admin'));
const CreateForm = lazy(() => import('./Admin/CreateForm'));
const Responses = lazy(() => import('./Responses/Responses'));
const TopHeader = lazy(() => import('./Navigation/TopHeader'));
const ThankYou = lazy(() => import('./Form/ThankYou'));

export default function Routing() {
	return (
		<Suspense fallback={<Loading />}>
			<TopHeader />
			<Switch>
				<Route exact path="/admin" component={Admin} />
				<Route exact path="/admin/:id" component={CreateForm} />
				<Route exact path="/admin/:id/responses" component={Responses} />
				<Route exact path="/:id/thank" component={ThankYou} />
				<Route exact path="/:id" component={Form} />
				<Route exact path="/" component={Login} />
				<Redirect to="/" />
			</Switch>
		</Suspense>
	);
}
