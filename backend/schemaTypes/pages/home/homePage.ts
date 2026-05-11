import { createSection } from '../../../utils/helper-createSection'
import { HERO, richText, reference, SEO, METRICS } from '../../modules/modules'

const MAGIC_TITLE = 'Producto'

const SECTIONS = [
  { group: { name: 'hero', title: 'Cabecera' }, fields: HERO() },
  {
    group: { name: `recentProduct`, title: `${MAGIC_TITLE}s Recientes` },
    fields: [
      richText({
        type: 'content',
        context: `recentProduct`,
        purpose: 'sectionTitle',
        title: `Título de sección de ${MAGIC_TITLE}s recientes`,
      }),
      reference({
        context: `recentProduct`,
        purpose: `${MAGIC_TITLE}s`,
        title: `Referencias de ${MAGIC_TITLE}s`,
        to: "product",
        isArray: true,
      }),
    ],
  },
  {
    group: { name: 'recentPosts', title: 'Artículos Recientes' },
    fields: [
      richText({
        type: 'content',
        context: 'recentPosts',
        purpose: 'sectionTitle',
        title: 'Título de sección de artículos recientes',
      }),
      reference({
        context: 'recentPosts',
        purpose: 'posts',
        title: 'Referencias de artículos',
        to: 'post',
        isArray: true,
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
    group: { name: "results", title: "Resultados" },
    fields: [
      richText({
        type: 'content',
        context: 'results',
        purpose: 'sectionTitle',
        title: 'Título de sección de resultados',
      }),
      METRICS(
        {
          context: 'results',
          purpose: 'list',
          title: 'Lista de resultados',
        }
      )
    ]
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
        title: 'Vista de Inicio',
      }
    },
  },
}
