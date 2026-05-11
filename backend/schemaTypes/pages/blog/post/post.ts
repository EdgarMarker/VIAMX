import {createSection} from '../../../../utils/helper-createSection'
import {image, reference, richText, SEO, slug, stringText} from '../../../modules/modules'

const SECTIONS = [
  {
    group: {name: 'general', title: 'General'},
    fields: [
      stringText({
        type: 'string',
        context: 'general',
        purpose: 'title',
        title: 'Título del artículo',
      }),
      slug({value: 'general.string_general_title'}),
      reference({
        context: 'general',
        purpose: 'category',
        title: 'Categoría del artículo',
        to: 'postCategory',
      }),
      {
        name: 'date',
        title: 'Fecha de publicación',
        type: 'date',
        options: {
          dateFormat: 'DD-MM-YYYY',
        },
      },
      reference({
        context: 'general',
        purpose: 'author',
        title: 'Autor del artículo',
        to: 'postAuthor',
      }),
      stringText({
        type: 'textarea',
        context: 'general',
        purpose: 'cardExcerpt',
        title: `Descripción breve del artículo`,
      }),
      image({
        type: 'img',
        context: 'general',
        purpose: 'primaryImg',
        title: `Imagen del artículo`,
      }),
    ],
  },
  {
    group: {name: 'page', title: 'Página del artículo'},
    fields: [
      richText({
        type: 'post',
        context: 'page',
        purpose: 'content',
        title: 'Contenido del artículo',
      }),
    ],
  },
  {
    group: {name: 'seo', title: 'SEO'},
    fields: SEO(),
  },
]
export const post = {
  name: 'post',
  type: 'document',
  title: 'Artículos de Blog',
  groups: [...SECTIONS.map(({group}) => group)],
  fields: [...SECTIONS.map(({group, fields}) => createSection(group, fields))],
  preview: {
    select: {
      title: 'general.string_general_title',
      media: 'card.img_card_img',
    },
  },
}
