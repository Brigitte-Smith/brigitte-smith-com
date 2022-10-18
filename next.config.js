/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	// i18n: {
	// 	locales: ["en", "de"],
	// 	defaultLocale: "de",
	// 	localeDetection: false,
	// },
	trailingSlash: true,
	compiler: {
		styledComponents: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
