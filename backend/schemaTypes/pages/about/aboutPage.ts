import { createSection } from '../../../utils/helper-createSection'
import { array, HERO, image, METRICS, obj, richText, SEO, stringText } from '../../modules/modules'

const SECTIONS = [
  { group: { name: 'hero', title: 'Cabecera' }, fields: HERO() },
  {
    group: { name: 'intro', title: 'Introducción' },
    fields: [
      richText({
        type: 'content',
        context: 'intro',
        purpose: 'sectionTitle',
        title: 'Título de sección de introducción',
      }),
      image({
        type: 'img',
        context: 'intro',
        purpose: 'sectionImage',
        title: 'Imagen de sección de introducción',
      }),
    ],
  },
  {
    group: { name: "values", title: "Valores" },
    fields: [
      richText({
        type: 'content',
        context: 'values',
        purpose: 'sectionTitle',
        title: 'Título de sección de valores',
      }),
      image({
        type: 'img',
        context: 'values',
        purpose: 'sectionImage',
        title: 'Imagen de sección de valores',
      }),
      array({
        context: 'values',
        purpose: 'valuesList',
        title: 'Lista de valores',
        of: [
          obj({
            context: 'values',
            purpose: 'valueItem',
            title: 'Valor',
            fields: [
              stringText({
                type: 'string',
                context: 'values',
                purpose: 'valueTitle',
                title: 'Título del valor',
              }),
              stringText({
                type: 'textarea',
                context: 'values',
                purpose: 'valueDescription',
                title: 'Descripción del valor',
              }),
              image({
                type: 'icon',
                context: 'values',
                purpose: 'valueIcon',
                title: 'Icono del valor',
              }),
            ],
          }),
        ],
      }),
    ]
  },
  {
    group: { name: "ourTeam", title: "Nuestro equipo" },
    fields: [
      richText({
        type: 'content',
        context: 'ourTeam',
        purpose: 'sectionTitle',
        title: 'Título de sección de nuestro equipo',
      }),
      array({
        context: 'ourTeam',
        purpose: 'list',
        title: 'Lista de nuestro equipo',
        of: [
          obj({
            context: 'ourTeam',
            purpose: 'item',
            title: 'Nuestro equipo',
            fields: [
              stringText({
                type: 'string',
                context: 'ourTeam',
                purpose: 'name',
                title: 'Nombre del integrante',
              }),
              stringText({
                type: 'string',
                context: 'ourTeam',
                purpose: 'position',
                title: 'Puesto del integrante',
              }),
              stringText({
                type: 'string',
                context: 'ourTeam',
                purpose: 'phone',
                title: 'Teléfono del integrante (opcional)',
              }),
              stringText({
                type: 'string',
                context: 'ourTeam',
                purpose: 'email',
                title: 'Correo electrónico del integrante (opcional)',
              }),
              image({
                type: 'img',
                context: 'ourTeam',
                purpose: 'image',
                title: 'Imagen de nuestro equipo',
              }),
            ],
          }),
        ],
      }),
    ]
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
  group: { name: "faqs", title: "Preguntas frecuentes" },
  fields: [
    richText({
      type: "content",
      context: "faqs",
      purpose: "sectionTitle",
      title: "Título de sección FAQ",
    }),
    array({
      context: "faqs",
      purpose: "list",
      title: "Lista de preguntas",
      of: [
        obj({
          context: "faqs",
          purpose: "item",
          title: "Pregunta",
          fields: [
            stringText({
              type: "string",
              context: "faqs",
              purpose: "question",
              title: "Pregunta",
            }),
            richText({
              type: "content",
              context: "faqs",
              purpose: "answer",
              title: "Respuesta",
            }),
          ],
        }),
      ],
    }),
  ],
},
  { group: { name: 'seo', title: 'SEO' }, fields: SEO() },
]

export const aboutPage = {
  name: 'aboutPage',
  type: 'document',
  groups: [...SECTIONS.map(({ group }) => group)],
  fields: [...SECTIONS.map(({ group, fields }) => createSection(group, fields))],
  preview: {
    prepare() {
      return {
        title: 'Vista de Nosotros',
      }
    },
  },
}
