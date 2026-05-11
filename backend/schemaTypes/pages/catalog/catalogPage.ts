import {createSection} from '../../../utils/helper-createSection'
import {HERO, obj, richText, SEO} from '../../modules/modules'

const MAGIC_TITLE = ['servicio', 'producto']

const SECTIONS = [
  {
    group: {name: `${MAGIC_TITLE[1]}`, title: `${MAGIC_TITLE[1]}s`},
    fields: [
      obj({
        context: `${MAGIC_TITLE[1]}`,
        purpose: 'hero',
        title: `Cabecera de la sección de ${MAGIC_TITLE[1]}s`,
        fields: HERO(),
      }),
      richText({
        type: 'content',
        context: `${MAGIC_TITLE[1]}`,
        purpose: 'title',
        title: `Título y introducción de ${MAGIC_TITLE[1]}s`,
      }),
      obj({
        context: `${MAGIC_TITLE[1]}`,
        purpose: 'seo',
        title: `SEO de la sección de ${MAGIC_TITLE[1]}s`,
        fields: SEO(),
      }),
    ],
  },
  {
    group: {name: `${MAGIC_TITLE[0]}`, title: `${MAGIC_TITLE[0]}s`},
    fields: [
      obj({
        context: `${MAGIC_TITLE[0]}`,
        purpose: 'hero',
        title: `Cabecera de la sección de ${MAGIC_TITLE[0]}s`,
        fields: HERO(),
      }),
      richText({
        type: 'content',
        context: `${MAGIC_TITLE[0]}`,
        purpose: 'title',
        title: `Título y introducción de ${MAGIC_TITLE[0]}s`,
      }),
      obj({
        context: `${MAGIC_TITLE[0]}`,
        purpose: 'seo',
        title: `SEO de la sección de ${MAGIC_TITLE[0]}s`,
        fields: SEO(),
      }),
    ],
  },
]

export const catalogPage = {
  name: 'catalogPage',
  type: 'document',
  groups: [...SECTIONS.map(({group}) => group)],
  fields: [...SECTIONS.map(({group, fields}) => createSection(group, fields))],
  preview: {
    prepare() {
      return {
        title: `Vista catálogos`,
      }
    },
  },
}
