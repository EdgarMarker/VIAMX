import { createSection } from '../../../utils/helper-createSection'
import { array, HERO, obj, richText, SEO, stringText } from '../../modules/modules'

const SECTIONS = [
  { group: { name: 'hero', title: 'Cabecera' }, fields: HERO() },
  {
    group: { name: 'intro', title: 'Introducción' },
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
    ],
  },
  {
    group: { name: 'faqs', title: 'FAQs' },
    fields: [
      richText({
        type: 'content',
        context: 'faqs',
        purpose: 'title',
        title: 'Contenido Informativo',
      }),
      array({
        context: 'faqs',
        purpose: 'list',
        title: 'Preguntas',
        of: [
          obj({
            context: 'faqs',
            purpose: 'item',
            title: 'Pregunta',
            fields: [
              stringText({
                type: 'string',
                context: 'faqs',
                purpose: 'h3',
                title: 'Pregunta',
              }),
              stringText({
                type: 'textarea',
                context: 'faqs',
                purpose: 'p',
                title: 'Respuesta',
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

export const locationsPage = {
  name: 'locationsPage',
  type: 'document',
  groups: [...SECTIONS.map(({ group }) => group)],
  fields: [...SECTIONS.map(({ group, fields }) => createSection(group, fields))],
  preview: {
    prepare() {
      return {
        title: 'Página de Ubicaciones',
      }
    },
  },
}
