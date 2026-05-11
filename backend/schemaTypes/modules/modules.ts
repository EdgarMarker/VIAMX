/**
 * type name
 * rich: BlockText[]
 * string: String
 * url: URL
 * image: Image
 * number: Number
 * bool: Boolean
 * ref: Reference
 * slug: SLUG
 * seo: SEO
 * obj: Object
 */

interface Props {
  title?: string
  dsc?: string
  context: string
  purpose: string
}

//*! ----- List block [] -----

export const richText = ({
  type,
  context,
  purpose,
  title,
  dsc,
}: {
  type: 'content' | 'post'
} & Props) => {
  return {
    name: `rich_${context}_${purpose}`,
    title:
      type === 'content'
        ? title || 'Contenido informativo'
        : type === 'post'
          ? title || 'Contenido del artículo'
          : title || 'Información adicional "Dinámica"',
    description:
      type === 'content'
        ? dsc || 'Usar negritas para resaltar el texto diseñado'
        : type === 'post'
          ? dsc || 'Texto del artículo principal'
          : dsc || "Texto de apoyo o información adicional 'Dinámica'",
    type: 'array',
    of: [{ type: 'block' }, ...(type === 'post' ? [{ type: 'image' }] : [])],
  }
}

//*! ----- Strings "" -----

export const stringText = ({
  type,
  context,
  purpose,
  title,
}: {
  type: 'string' | 'textarea'
} & Props) => {
  return {
    name: `${type}_${context}_${purpose}`,
    title: type === 'string' ? title || 'Linea de texto' : title || 'Área de texto',
    type: type === 'string' ? 'string' : 'text',
  }
}

//*! ----- URL url() -----

export const url = ({ context, purpose, title, dsc }: Props) => {
  return {
    name: `url_${context}_${purpose}`,
    title: title || 'Enlace externo',
    description: dsc || 'Enlace externo a otra web',
    type: 'url',
  }
}

//*! ----- Images -----

export const image = ({
  type,
  context,
  purpose,
  title,
  dsc,
}: {
  type: 'img' | 'icon'
} & Props) => {
  return {
    name: `${type}_${context}_${purpose}`,
    title: type === 'img' ? title || 'Imagen' : title || 'Icono',
    description: type === 'img' ? dsc || 'Imagen de contenido' : dsc || 'Icono de contenido',
    type: 'image',
  }
}

//*! ----- Numbers 123 -----

export const number = ({ context, purpose, title }: Props) => {
  return {
    name: `number_${context}_${purpose}`,
    title: title,
    type: 'number',
  }
}

//*! ----- Slug -----
export const slug = ({ value }: { value: string }) => {
  return {
    name: `slug`,
    title: 'Slug',
    type: 'slug',
    options: {
      source: value,
      maxLength: 96,
    },
  }
}

//*! ----- BOOLEAN -----
export const bool = ({ context, purpose, title }: Props) => {
  return {
    name: `bool_${context}_${purpose}`,
    title: title,
    type: 'boolean',
  }
}

//*! ----- REFERENCES -----

export const reference = ({
  context,
  purpose,
  to,
  title,
  isArray = false,
}: {
  to: string | string[]
  isArray?: boolean
} & Props) => {
  const types = Array.isArray(to) ? to : [to]

  const referenceConfig = {
    type: 'reference',
    to: types.map((type) => ({ type })),
  }

  if (isArray) {
    return {
      name: `arr_ref_${context}_${purpose}`,
      title: title || 'Referencia',
      type: 'array',
      of: [referenceConfig],
    }
  }

  return {
    name: `ref_${context}_${purpose}`,
    title: title || 'Referencia',
    ...referenceConfig,
  }
}

//*! ----- Object -----
export const obj = ({ context, purpose, title, fields }: Props & { fields: any[] }) => {
  return {
    name: `obj_${context}_${purpose}`,
    title: title || 'Objeto',
    type: 'object',
    fields: fields,
  }
}

//*! ----- Array -----

export const array = ({ context, purpose, title, of }: Props & { of: any[] }) => {
  return {
    name: `arr_${context}_${purpose}`,
    title: title || 'Listado',
    type: 'array',
    of: of,
  }
}

//*! ----- COMPONENTS -----

export const SEO = () => {
  return [
    {
      name: 'string_titleSeo',
      title: 'Título para posicionar esta página en buscadores',
      type: 'string',
      description: '*Quedará oculto a la vista del usuario, exclusivo para SEO (Max caracteres 70)',

      validation: (rule: any) =>
        rule.max(70).warning('Se han rebasado los 70 caracteres recomendados'),
    },
    {
      name: 'text_descSeo',
      title: 'Descripción para posicionar esta página en buscadores',
      type: 'text',
      description:
        '*Quedará oculto a la vista del usuario, exclusivo para SEO (Max caracteres 155)',

      validation: (rule: any) =>
        rule.max(155).warning('Se han rebasado los 155 caracteres recomendados'),
    },
    {
      name: 'text_keySeo',
      title: 'Palabras clave para posicionar esta página en buscadores',
      type: 'text',
      description: '*Separar palabras con comas',
    },
  ]
}

export const HERO = (props: any[] = []) => {
  return [
    stringText({
      type: 'string',
      context: 'hero',
      purpose: 'h1',
      title: 'Titular web',
    }),
    richText({ type: 'content', context: 'hero', purpose: 'title' }),
    image({
      type: 'img',
      context: 'hero',
      purpose: 'banner',
      title: 'Imagen de la cabecera',
    }),
    stringText({
      type: 'string',
      context: 'hero',
      purpose: 'cta',
      title: 'Texto del botón de llamada a la acción (CTA)',
    }),
    ...props.flat().filter(Boolean),
  ]
}

export const METRICS = ({ context, purpose, title }: Props) => {
  const item = obj({
    context,
    purpose: `${purpose}_item`,
    title: "Métrica u objetivo destacado",
    fields: [
      stringText({
        type: "string",
        context,
        purpose: `${purpose}_item_prefix`,
        title: 'Prefijo de la métrica u objetivo (Ej: "Más de, +")',
      }),
      number({
        context,
        purpose: `${purpose}_item_value`,
        title: "Valor numérico de la métrica u objetivo",
      }),
      stringText({
        type: "string",
        context,
        purpose: `${purpose}_item_suffix`,
        title: 'Sufijo de la métrica u objetivo (Ej: "%, MXN")',
      }),
      stringText({
        type: "string",
        context,
        purpose: `${purpose}_item_label`,
        title: "Descripción de la métrica u objetivo",
      }),
      image({
        type: "img",
        context,
        purpose: `${purpose}_item_icon`,
        title: "Imagen de la métrica u objetivo",
      }),
    ],
  });

  return array({
    title: title || "Listado de métricas u objetivos destacados",
    context,
    purpose: `${purpose}_list`,
    of: [
      {
        ...(item as any),
        preview: {
          select: {
            prefix: `string_${context}_${purpose}_item_prefix`,
            value: `number_${context}_${purpose}_item_value`,
            suffix: `string_${context}_${purpose}_item_suffix`,
            label: `string_${context}_${purpose}_item_label`,
            media: `img_${context}_${purpose}_item_icon`,
          },
          prepare({ prefix, value, suffix, label, media }: any) {
            const p = prefix ? String(prefix).trim() : "";
            const v = value === 0 || value ? String(value) : "";
            const s = suffix ? String(suffix).trim() : "";
            const t = `${p ? p + " " : ""}${v}${s ? " " + s : ""}`.trim();

            return {
              title: t || "Métrica sin valor",
              subtitle: label || "",
              media,
            };
          },
        },
      },
    ],
  });
};