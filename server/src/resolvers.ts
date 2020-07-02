import {
  PrismaClient,
  RecordCreateInput,
  RecordWhereInput,
  Prisma__RecordClient,
} from '../prisma';
import objectValuesToLowerCase from './utils/objectValuesToLowerCase';

interface Context {
  prisma: PrismaClient;
};

const resolvers = {
  Query: {
    test: () => 'hello',
    records: async (parent, args, { prisma }: Context) => {
      const records = await prisma.record.findMany();
      return records;
    },
    users: async (parent, args, { prisma }: Context) => {
      const users = await prisma.user.findMany();
      return users;
    },
    productRecords: async (parent, { product }: RecordWhereInput, { prisma }: Context) => {
      const records = await prisma.record.findMany({
        where: {
          product: {
            contains: (product as string).toLowerCase(),
          },
        },
      });

      return records;
    },
    record: async (parent, { id }: RecordWhereInput, { prisma }: Context) => {
      const records = await prisma.record.findMany({
        where: { id },
      });

      return records;
    },
  },

  Mutation: {
    createRecord: async (_, args: RecordCreateInput, { prisma }: Context) => {
      try {
        const record = await prisma.record.create({
          data: {
            ...objectValuesToLowerCase(args),
            user: {
              connect: {
                email: 'some@user.com',
              },
            },
          },
        });

        return {
          success: true,
          record,
        };
      } catch (e) {
        return {
          success: false,
          message: e.message,
        }
      }
    },
    deleteRecord: async (_, { id }, { prisma }: Context) => {
      try {
        const record = await prisma.record.delete({
          where: {
            id: Number(id),
          },
        });
        return {
          success: true,
          record,
        }
      } catch (e) {
        return {
          success: false,
          message: e.message,
        }
      }
    }
  }
};

export default resolvers;
