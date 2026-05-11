import { stringText, image } from "../../../modules/modules";

export const postAuthor = {
	name: "postAuthor",
	type: "document",
	title: "Autores de Artículos",
	fields: [
		stringText({
			type: "string",
			context: "author",
			purpose: "name",
			title: "Nombre del autor",
			dsc: "Nombre completo del autor",
		}),
		stringText({
			type: "string",
			context: "author",
			purpose: "position",
			title: "Puesto del autor",
			dsc: "Puesto o rol del autor",
		}),
		stringText({
			type: "textarea",
			context: "author",
			purpose: "bio",
			title: "Biografía del autor",
			dsc: "Breve biografía del autor",
		}),
		image({
			type: 'img',
			context: 'author',
			purpose: 'picture',
			title: `Imagen del autor`,
		}),
	],
	preview: {
		select: {
			title: "string_author_name",
		},
		prepare({ title }: { title: string }) {
			return {
				title: title || "Sin nombre",
			}
		},
	},
};

