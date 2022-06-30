import { AnagraphicProvider } from "../contexts/anagraphic.context";
import { AuthProvider } from "../contexts/auth.context";
import { InvoiceProvider } from "../contexts/invoice.context";
import { QuoteProvider } from "../contexts/quote.context";

import 'bootstrap/dist/css/bootstrap.css';
import '../app.scss';

export default function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<AnagraphicProvider>
				<InvoiceProvider>
					<QuoteProvider>
						<Component {...pageProps} />
					</QuoteProvider>
				</InvoiceProvider>
			</AnagraphicProvider>
		</AuthProvider>
	)
}