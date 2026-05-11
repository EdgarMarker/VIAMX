import { createSection } from '../../../../utils/helper-createSection'
import {
  array,
  bool,
  image,
  obj,
  reference,
  richText,
  SEO,
  slug,
  stringText,
} from '../../../modules/modules'

const MAGIC_TITLE = 'Producto-2'

const SECTIONS = [
  {
    group: { name: 'general', title: 'General' },
    fields: [
      stringText({
        type: 'string',
        context: 'general',
        purpose: 'title',
        title: `Titulo del ${MAGIC_TITLE}`,
      }),
      slug({ value: 'general.string_general_title' }),
      reference({
        context: 'general',
        purpose: 'category',
        title: `Categoría del ${MAGIC_TITLE}`,
        to: 'product2Category',
      }),
      {
        name: 'date',
        title: 'Fecha de publicación',
        type: 'date',
        options: {
          dateFormat: 'DD-MM-YYYY',
        },
      },
      stringText({
        type: 'textarea',
        context: 'general',
        purpose: 'cardExcerpt',
        title: `Descripción breve de ${MAGIC_TITLE}`,
      }),
      image({
        type: 'img',
        context: 'general',
        purpose: 'primaryImg',
        title: `Imagen de ${MAGIC_TITLE}`,
      }),
    ],
  },
  {
    group: { name: 'intro', title: 'Introducción' },
    fields: [
      richText({
        type: 'content',
        context: 'intro',
        purpose: 'description',
        title: `Descripción "Completa" de ${MAGIC_TITLE}`,
      }),
      image({
        type: 'img',
        context: 'intro',
        purpose: 'img',
        title: `Imagen de introducción de ${MAGIC_TITLE}`,
      }),
    ],
  },
  {
    group: { name: 'models', title: 'Modelos' },
    fields: [
      richText({
        type: 'content',
        context: 'models',
        purpose: 'title',
        title: `Titulo y descripción de la sección de modelos`,
      }),
      array({
        context: 'models',
        purpose: 'list',
        title: 'Lista de modelos',
        of: [
          obj({
            context: 'models',
            purpose: 'item',
            title: 'Modelo',
            fields: [
              stringText({
                type: 'string',
                context: 'models',
                purpose: 'modelName',
                title: `Nombre del modelo`,
              }),
              richText({
                type: 'content',
                context: 'models',
                purpose: 'modelDescription',
                title: `Descripción del modelo`,
              }),
              image({
                type: 'img',
                context: 'models',
                purpose: 'modelImg',
                title: `Imagen del modelo`,
              }),
            ],
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
        title: `Titulo y descripción de la sección de amenidades`,
      }),
      reference({
        context: 'amenities',
        purpose: 'amenityList',
        title: 'Lista de amenidades',
        to: 'amenity',
        isArray: true,
      }),
    ],
  },
  {
    group: { name: "dividers", title: "Divisores" },
    fields: [
      image({
        type: 'img',
        context: 'divider1',
        purpose: 'dividerImg',
        title: 'Imagen del primer divisor',
      }),
      image({
        type: 'img',
        context: 'divider2',
        purpose: 'dividerImg',
        title: 'Imagen del segundo divisor',
      }),
      image({
        type: 'img',
        context: 'divider3',
        purpose: 'dividerImg',
        title: 'Imagen del tercer divisor',
      }),
    ]
  },
  {
    group: { name: 'video', title: 'Video' },
    fields: [
      bool({
        context: 'video',
        purpose: 'hasVideo',
        title: '¿Tiene video?',
      }),
      {
        ...stringText({
          type: 'string',
          context: 'video',
          purpose: 'url',
          title: 'URL del video (Youtube, etc)',
        }),
        hidden: ({ parent }: any) => !parent?.bool_video_hasVideo,
      },
      {
        ...image({
          type: 'img',
          context: 'video',
          purpose: 'fallbackImg',
          title: 'Imagen de respaldo',
        }),
        hidden: ({ parent }: any) => parent?.bool_video_hasVideo,
      },
    ],
  },
  {
    group: { name: 'gallery', title: 'Galería' },
    fields: [
      richText({
        type: 'content',
        context: 'gallery',
        purpose: 'title',
        title: `Titulo y descripción de la sección de galería`,
      }),
      {
        name: 'list_gallery',
        title: 'Galería de imágenes',
        type: 'array',
        of: [{ type: 'image' }],
        options: { layout: 'grid' },
      },
    ],
  },
  { group: { name: 'seo', title: 'SEO' }, fields: SEO() },
]

export const product2 = {
  name: "product2",
  type: 'document',
  groups: [...SECTIONS.map(({ group }) => group)],
  fields: [...SECTIONS.map(({ group, fields }) => createSection(group, fields))],
  preview: {
    select: {
      title: 'general.string_general_title',
      media: 'general.primaryImg',
    },
  },
}
