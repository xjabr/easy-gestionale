import { Html, Head, Main, NextScript } from 'next/document'

import Sidebar from '../ui-components/sidebar';

export default function Document() {
	// const { isLoggedIn } = useAuth();

	return (
		<Html>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<body>
				<Sidebar />
				<div className='wrapper-main'>

					<Main />
				</div>
				
				<NextScript />
			</body>
		</Html>
	)
}