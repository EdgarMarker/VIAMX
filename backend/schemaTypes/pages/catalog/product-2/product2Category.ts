import { createSection } from '../../../../utils/helper-createSection'
import { SEO, slug, stringText } from '../../../modules/modules'

const SECTIONS = [
    {
        group: { name: 'general', title: 'General' },
        fields: [
            stringText({
                type: 'string',
                context: 'category',
                purpose: 'name',
                title: 'Nombre de la categoría',
                dsc: 'Nombre descriptivo de la categoría',
            }),
            slug({ value: 'general.string_category_name' }),
        ],
    },
    {
        group: { name: 'seo', title: 'SEO' },
        fields: SEO(),
    },
]

export const product2Category = {
    name: 'product2Category',
    type: 'document',
    groups: [...SECTIONS.map(({ group }) => group)],
    fields: [...SECTIONS.map(({ group, fields }) => createSection(group, fields))],
    preview: {
        select: {
            title: 'general.string_category_name',
        },
    },
}
