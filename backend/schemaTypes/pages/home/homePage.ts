import { createSection } from '../../../utils/helper-createSection'
import { array, HERO, image, METRICS, obj, reference, richText, SEO, stringText } from '../../modules/modules'

const SECTIONS = [
  { group: { name: 'hero', title: 'Cabecera' }, fields: HERO() },
  {
    group: { name: 'intro', title: 'Introducción' },
    fields: [
      richText({
        type: 'content',
        context: 'intro',
        purpose: 'title',
        title: 'Título de introducción',
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
        title: 'Título principal',
      }),
      stringText({
        type: 'textarea',
        context: 'about',
        purpose: 'p1',
        title: 'Párrafo 1',
      }),
      stringText({
        type: 'textarea',
        context: 'about',
        purpose: 'p2',
        title: 'Párrafo 2',
      }),
      METRICS({
        context: 'about',
        purpose: 'coldNumbers',
        title: 'Números fríos',
      }),
      image({
        type: 'img',
        context: 'about',
        purpose: 'banner',
        title: 'Imagen banner',
      }),
      richText({
        type: 'content',
        context: 'about',
        purpose: 'title2',
        title: 'Título secundario',
      }),
      stringText({
        type: 'textarea',
        context: 'about',
        purpose: 'p3',
        title: 'Párrafo 3',
      }),
      stringText({
        type: 'textarea',
        context: 'about',
        purpose: 'p4',
        title: 'Párrafo 4',
      }),
    ],
  },
  {
    group: { name: 'ourMethod', title: 'Nuestra Metodología' },
    fields: [
      richText({
        type: 'content',
        context: 'ourMethod',
        purpose: 'title',
        title: 'Título de metodología',
      }),
      image({
        type: 'img',
        context: 'ourMethod',
        purpose: 'banner',
        title: 'Imagen banner',
      }),
      array({
        context: 'ourMethod',
        purpose: 'list',
        title: 'Listado',
        of: [
          obj({
            context: 'ourMethod',
            purpose: 'item',
            title: 'Método',
            fields: [
              stringText({
                type: 'string',
                context: 'ourMethod',
                purpose: 'h2',
                title: 'Título',
              }),
              stringText({
                type: 'textarea',
                context: 'ourMethod',
                purpose: 'p',
                title: 'Información',
              }),
            ],
          }),
        ],
      }),
    ],
  },
   {
    group: { name: 'testy', title: 'Sección de Testimonios' },
    fields: [
      richText({
        type: 'content',
        context: 'testy',
        purpose: 'testyTitle',
        title: 'Título de la Testimonios y Información',
      }),
      reference({
        context: 'testy',
        purpose: 'testyList',
        title: 'Lista de Testimonios',
        isArray: true,
        to: 'testimonial' as any,
      }),
    ],
  },
  {
    group: { name: 'seo', title: 'SEO' },
    fields: SEO(),
  },
]

export const homePage = {
  name: 'homePage',
  type: 'document',
  groups: [...SECTIONS.map(({ group }) => group)],
  fields: [...SECTIONS.map(({ group, fields }) => createSection(group, fields))],
  preview: {
    prepare() {
      return {
        title: 'Página de Inicio',
      }
    },
  },
}
