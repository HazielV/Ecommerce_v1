import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  await prisma.estado.create({
    data: {
      descripcion: 'activo',
    },
  })
  await prisma.estado.create({
    data: {
      descripcion: 'inactivo',
    },
  })
  await prisma.categoria.createMany({
    data: [
      {
        nombre: 'Tejidos y Textiles',
        descripcion:
          'Productos textiles hechos a mano, como ropa, mantas y alfombras',
      },
      {
        nombre: 'Joyería Artesanal',
        descripcion:
          'Joyas únicas y elaboradas a mano, como collares, pulseras y aretes',
      },
      {
        nombre: 'Cerámica y Alfarería',
        descripcion:
          'Piezas de cerámica artesanal, ideales para decoración y uso diario',
      },
      {
        nombre: 'Tallas en Madera',
        descripcion:
          'Esculturas y utensilios tallados en madera, llenos de tradición',
      },
      {
        nombre: 'Productos en Cuero',
        descripcion: 'Accesorios de cuero auténtico, duraderos y elegantes',
      },
      {
        nombre: 'Arte en Metal',
        descripcion:
          'Esculturas y decoraciones en metal con un toque artesanal',
      },
      {
        nombre: 'Cestería y Fibras Naturales',
        descripcion:
          'Cestas y productos hechos con fibras naturales, funcionales y rústicos',
      },
      {
        nombre: 'Arte Textil',
        descripcion:
          'Bordados y tapices decorativos, llenos de historia y color',
      },
      {
        nombre: 'Productos Naturales',
        descripcion:
          'Artículos de cuidado personal y aromaterapia, hechos con ingredientes naturales',
      },
      {
        nombre: 'Arte y Decoración',
        descripcion:
          'Piezas decorativas y artísticas para embellecer cualquier espacio',
      },
    ],
  })
  await prisma.usuario.create({
    data: {
      correoelectronico: 'administrador@gmail.com',
      persona: {
        create: {
          nombres: 'admin',
          primerapellido: 'admin',
          segundoapellido: 'admin',
          nrodocumento: 123456,
        },
      },
      rol: 'ADMINISTRADOR',
      password: bcrypt.hashSync('Admin123', 10),
    },
  })
  await prisma.artesano.create({
    data: {
      usuario: {
        create: {
          correoelectronico: 'artesando@mail.com',
          persona: {
            create: {
              nombres: 'jose',
              primerapellido: 'aguilar',
              segundoapellido: 'sanjinez',
              nrodocumento: 421872,
            },
          },
          rol: 'ARTESANO',
          password: bcrypt.hashSync('Admin123', 10),
        },
      },
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
