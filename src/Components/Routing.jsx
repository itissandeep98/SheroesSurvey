import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Divider, Icon } from 'semantic-ui-react';
import Loading from './Loading';

const Login = lazy(() => import('./Auth/Login'));
const TopHeader = lazy(() => import('./Navigation/TopHeader'));

export default function Routing() {
	return (
		<Suspense fallback={<Loading />}>
			<TopHeader />
			<Switch>
				<Route path="/" component={Login} />
			</Switch>
			<Divider horizontal className="fixed-bottom">
				<Icon name="times" />
			</Divider>
		</Suspense>
	);
}
