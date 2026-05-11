import {
  FaComment,
  FaDesktop,
  FaNewspaper,
  FaRegBuilding,
  FaStore,
  FaTags,
  FaUser,
} from 'react-icons/fa'
import {MdIntegrationInstructions} from 'react-icons/md'
import type {StructureResolver} from 'sanity/structure'

const MAGIC_TITLE = 'Producto'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .icon(FaDesktop)
        .title('Inicio')
        .child(S.document().schemaType('homePage').documentId('homePage')),

      S.listItem()
        .icon(FaDesktop)
        .title('Nosotros')
        .child(S.document().title('Nosotros').schemaType('aboutPage').documentId('aboutPage')),
      S.listItem()
        .icon(FaDesktop)
        .title(`Catálogo`)
        .child(S.document().title(`Catálogo`).schemaType('catalogPage').documentId('catalogPage')),
      S.listItem()
        .icon(FaDesktop)
        .title('Blog')
        .child(S.document().title('Blog').schemaType('blogPage').documentId('blogPage')),
      S.listItem()
        .icon(FaDesktop)
        .title('Contacto')
        .child(S.document().title('Contacto').schemaType('contactPage').documentId('contactPage')),
      //----------------------------------------------
      S.divider(),
      //----------------------------------------------
      S.listItem()
      .icon(FaStore)
      .title(`Lista de Productos`)
      .child(
        S.documentTypeList('product')
        .title(`Lista de Productos`)
        .filter('_type == "product"'),
      ),
      S.listItem()
      .icon(FaStore)
      .title(`Lista de Productos 2`)
      .child(
        S.documentTypeList('product2')
        .title(`Lista de Productos 2`)
        .filter('_type == "product2"'),
      ),
      S.listItem()
        .icon(FaNewspaper)
        .title('Lista de Artículos')
        .child(S.documentTypeList('post').title('Lista de Artículos').filter('_type == "post"')),
      S.listItem()
        .icon(FaComment)
        .title('Lista de Testimonios')
        .child(
          S.documentTypeList('testimonial')
            .title('Lista de Testimonios')
            .filter('_type == "testimonial"'),
        ),
      S.listItem()
        .icon(FaComment)
        .title('Lista de Amenidades')
        .child(
          S.documentTypeList('amenity').title('Lista de Amenidades').filter('_type == "amenity"'),
        ),
      //----------------------------------------------
      S.divider(),
      //----------------------------------------------
      S.listItem()
        .icon(FaTags)
        .title(`Categorías de Productos`)
        .child(
          S.documentTypeList('productCategory')
            .title(`Categorías de Productos`)
            .filter('_type == "productCategory"'),
        ),
      S.listItem()
        .icon(FaTags)
        .title(`Categorías de Productos 2`)
        .child(
          S.documentTypeList('product2Category')  
            .title(`Categorías de Productos 2`)
            .filter('_type == "product2Category"'),
        ),
      S.listItem()
        .icon(FaTags)
        .title('Categorías de Artículos')
        .child(
          S.documentTypeList('postCategory')
            .title('Categorías de Artículos')
            .filter('_type == "postCategory"'),
        ),
      S.listItem()
        .icon(FaUser)
        .title('Autores de Artículos')
        .child(
          S.documentTypeList('postAuthor')
            .title('Autores de Artículos')
            .filter('_type == "postAuthor"'),
        ),
      //----------------------------------------------
      S.divider(),
      //----------------------------------------------
      S.listItem()
        .icon(FaRegBuilding)
        .title('Empresa')
        .child(S.document().title('Empresa').schemaType('company').documentId('company')),
      S.listItem()
        .icon(MdIntegrationInstructions)
        .title('Marketing')
        .child(S.document().title('Marketing').schemaType('marketing').documentId('marketing')),
    ])
