import { createSection } from '../../../utils/helper-createSection'
import { array, HERO, image, obj, richText, SEO, stringText } from '../../modules/modules'

const SECTIONS = [
  { group: { name: 'hero', title: 'Cabecera' }, fields: HERO() },
  {
    group: { name: 'quote', title: 'Cita' },
    fields: [
      richText({
        type: 'content',
        context: 'quote',
        purpose: 'quote',
        title: 'Cita',
      }),
    ],
  },
  {
    group: { name: 'about', title: 'Nosotros' },
    fields: [
      richText({
        type: 'content',
        context: 'about',
        purpose: 'title',
        title: 'Contenido informativo',
      }),
      stringText({
        type: 'textarea',
        context: 'about',
        purpose: 'p',
        title: 'Texto de descripción 1',
      }),
      stringText({
        type: 'textarea',
        context: 'about',
        purpose: 'p2',
        title: 'Texto de descripción 2',
      }),
    ],
  },
  {
    group: { name: 'ourHistory', title: 'Nuestra historia' },
    fields: [
      richText({
        type: 'content',
        context: 'ourHistory',
        purpose: 'title',
        title: 'Contenido informativo',
      }),
      image({
        type: 'img',
        context: 'ourHistory',
        purpose: 'banner',
        title: 'Imagen',
      }),
    ],
  },
  {
    group: { name: 'ourValues', title: 'Nuestros Valores' },
    fields: [
      richText({
        type: 'content',
        context: 'ourValues',
        purpose: 'title',
        title: 'Contenido informativo',
      }),
      array({
        context: 'ourValues',
        purpose: 'values',
        title: 'Valores',
        of: [
          obj({
            context: 'ourValues',
            purpose: 'item',
            title: 'Valor',
            fields: [
              stringText({
                type: 'string',
                context: 'ourValues',
                purpose: 'h2',
                title: 'Título de valor',
              }),
              stringText({
                type: 'textarea',
                context: 'ourValues',
                purpose: 'p',
                title: 'Información de valor',
              }),
            ],
          }),
        ],
      }),
    ],
  },
  {
    group: { name: 'seo', title: 'SEO' },
    fields: SEO(),
  },
]

export const aboutPage = {
  name: 'aboutPage',
  type: 'document',
  groups: [...SECTIONS.map(({ group }) => group)],
  fields: [...SECTIONS.map(({ group, fields }) => createSection(group, fields))],
  preview: {
    prepare() {
      return {
        title: 'Página Nosotros',
      }
    },
  },
}
