/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ['mongoose'],
	},
	images: {
		domains: [
			'lh3.googleusercontent.com',
			'cdn.dribbble.com',
			'avatars.githubusercontent.com',
			'phinf.pstatic.net',
			'k.kakaocdn.net',
		],
	},
	webpack(config) {
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		};
		return config;
	},
};

module.exports = nextConfig;
