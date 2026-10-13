const site = "https://www.voltable.com";
const base = "/game/numberbee/";
const baseURL = `${site}${base}`;

/**
 * Defines the default SEO configuration for the website.
 */
export const seoconfig = {
	site,
	base,
	baseURL,
	description:
		"NumberBee Game by Voltable.com - online game, binary number, fun discovery number game",
	type: "website",
	image: {
		url: `${baseURL}favicon-325.png`, 
		alt: "Yellow bee in rectagular shape", 
		width: 325,
		height: 325
	},
	siteName: "NumberBee Game by Voltable.com",
	twitter: {
		card: "summary_large_image",
        site: "@VoltableCom",
        title: "NumberBee Game by Voltable.com - online game, binary number, fun discovery number game",
        description: "NumberBee Game by Voltable.com - online game, binary number, fun discovery number game",
        image: `${baseURL}favicon-250.png`,
        imageAlt: "Yellow bee in rectagular shape",
        creator: "@VoltableCom"

	}
}
