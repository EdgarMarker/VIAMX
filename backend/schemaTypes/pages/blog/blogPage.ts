import {createSection} from '../../../utils/helper-createSection'
import {HERO, richText, SEO} from '../../modules/modules'

const SECTIONS = [
  {group: {name: 'hero', title: 'Cabecera'}, fields: HERO()},
  {
    group: {name: 'post', title: 'Artículos'},
    fields: [
      richText({
        type: 'content',
        context: 'blog',
        purpose: 'title',
      }),
    ],
  },
  {group: {name: 'seo', title: 'SEO'}, fields: SEO()},
]
export const blogPage = {
  name: 'blogPage',
  type: 'document',
  groups: [...SECTIONS.map(({group}) => group)],
  fields: [...SECTIONS.map(({group, fields}) => createSection(group, fields))],
  preview: {
    prepare() {
      return {
        title: 'Vista de Blog',
      }
    },
  },
}
