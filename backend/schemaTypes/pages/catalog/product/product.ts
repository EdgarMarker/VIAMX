import { createSection } from '../../../../utils/helper-createSection'
import {
  array,
  image,
  reference,
  richText,
  slug,
  stringText,
} from '../../../modules/modules'

const SECTIONS = [
  {
    group: { name: 'general', title: 'General' },
    fields: [
      stringText({
        type: 'string',
        context: 'general',
        purpose: 'name',
        title: 'Nombre del producto',
      }),
      slug({ value: 'general.string_general_name' }),
      stringText({
        type: 'textarea',
        context: 'general',
        purpose: 'card_dsc',
        title: 'Descripcion de tarjeta',
      }),
      image({
        type: 'img',
        context: 'general',
        purpose: 'card',
        title: 'Imagen de tarjeta',
      }),
      image({
        type: 'img',
        context: 'general',
        purpose: 'hero',
        title: 'Imagen de cabecera',
      }),
      {
        name: 'date',
        title: 'Fecha de publicación',
        type: 'date',
        options: {
          dateFormat: 'DD-MM-YYYY',
        },
      },
    ],
  },
  {
    group: { name: 'intro', title: 'Descripción' },
    fields: [
      richText({
        type: 'content',
        context: 'intro',
        purpose: 'title',
        title: 'Contenido Informativo',
      }),
      stringText({
        type: 'textarea',
        context: 'intro',
        purpose: 'p',
        title: 'Información',
      }),
      stringText({
        type: 'textarea',
        context: 'intro',
        purpose: 'p2',
        title: 'Información',
      }),
      array({
        context: 'intro',
        purpose: 'gallery',
        title: 'Galería',
        of: [
          image({
            type: 'img',
            context: 'intro',
            purpose: 'banner',
            title: 'Imagen de galería',
          }),
        ],
      }),
    ],
  },
  {
    group: { name: 'amenities', title: 'Amenidades' },
    fields: [
      richText({
        type: 'content',
        context: 'amenities',
        purpose: 'title',
        title: 'Contenido Informativo',
      }),
      reference({
        context: 'amenities',
        purpose: 'list',
        to: 'amenity',
        isArray: true,
        title: 'Amenidad',
      }),
    ],
  },
  {
    group: { name: 'location', title: 'Ubicación' },
    fields: [
      richText({
        type: 'content',
        context: 'location',
        purpose: 'title',
        title: 'Contenido Informativo',
      }),
      {
        name: 'string_location_maps',
        title: 'Url externo para google maps',
        type: 'string',
      },
      stringText({
        type: 'string',
        context: 'location',
        purpose: 'api',
        title: 'API - Google maps',
      }),
    ],
  },
]

export const product = {
  name: "product",
  type: 'document',
  groups: [...SECTIONS.map(({ group }) => group)],
  fields: [...SECTIONS.map(({ group, fields }) => createSection(group, fields))],
  preview: {
    select: {
      title: 'general.string_general_name',
      media: 'general.img_general_card',
    },
  },
}
