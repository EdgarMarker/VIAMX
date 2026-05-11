export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/&/g, "y")
    .replace(/[^a-z0-9\s-]/g, "") // quita caracteres raros
    .trim()
    .replace(/\s+/g, "-") // espacios -> guiones
    .replace(/-+/g, "-"); // colapsa guiones

export const phonify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/&/g, "y")
    .replace(/[^a-z0-9\s-]/g, "") // quita caracteres raros
    .trim()
    .replace(/\s+/g, "") // espacios -> guiones
    .replace(/-+/g, "-"); // colapsa guiones