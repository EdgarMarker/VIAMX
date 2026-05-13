import { amenity } from "./amenity";
import { company } from "./company";
import { marketing } from "./marketing";
import {
	aboutPage,
	blogPage,
	catalogPage,
	contactPage,
	homePage,
	locationsPage,
	post,
	postAuthor,
	postCategory,
	product,
	product2,
	product2Category,
	productCategory,
} from "./pages";
import { testimonial } from "./testimonial";

export const schemaTypes = [
	homePage,
	aboutPage,
	catalogPage,
	blogPage,
	contactPage,
	locationsPage,

	product,
	product2,
	post,
	testimonial,

	productCategory,
	product2Category,
	postCategory,
	postAuthor,

	amenity,

	company,
	marketing
];
