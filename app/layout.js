import './globals.css';
import Provider from '@/components/Provider';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<Provider>
					<Navbar />
					{children}
				</Provider>
			</body>
		</html>
	);
}
