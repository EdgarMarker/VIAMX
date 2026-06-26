import {createSection} from '../../../utils/helper-createSection'
import {HERO, SEO, richText} from '../../modules/modules'

const SECTIONS = [
  
  {group: {name: 'seo', title: 'SEO'}, fields: SEO()},
]

export const contactPage = {
  name: 'contactPage',
  type: 'document',
  groups: [...SECTIONS.map(({group}) => group)],
  fields: [...SECTIONS.map(({group, fields}) => createSection(group, fields))],
  preview: {
    prepare() {
      return {
        title: 'Vista de Contacto',
      }
    },
  },
}
