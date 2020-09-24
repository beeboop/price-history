import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  PrismaClient,
  RecordCreateInput,
  RecordWhereInput,
} from '../prisma';
// import objectValuesToLowerCase from './utils/objectValuesToLowerCase';
import { APP_SECRET, getUserId } from './utils/auth';

interface Context {
  authorization: String;
  prisma: PrismaClient;
};

const resolvers = {
  Query: {
    records: async (parent, { filter, orderBy }, { authorization, prisma }: Context) => {
      if (orderBy?.date) {
        orderBy.createdAt = orderBy.date;
        delete orderBy.date;
      }

      const userId = getUserId(authorization);
      const records = await prisma.user.findOne({ where: { id: userId }}).record({
        where: {
          OR: [
            { product: { contains: filter }},
            { location: { contains: filter }},
          ],
        },
        orderBy: orderBy,
      });
      const recordsWithDate = records.map(record => {
        return {
          ...record,
          date: record.customdate || record.createdAt || 0,
        };
      });
      return recordsWithDate;
    },
    users: async (parent, args, { prisma }: Context) => {
      const users = await prisma.user.findMany();
      console.log(users)
      return [];
    },
    productRecords: async (parent, { product }: RecordWhereInput, { prisma }: Context) => {
      const records = await prisma.record.findMany({
        where: {
          product: {
            contains: (product as string).toLowerCase(),
          },
        },
      });

      // return records;
      return [];
    },
    record: async (parent, { id }: RecordWhereInput, { prisma }: Context) => {
      const records = await prisma.record.findMany({
        where: { id },
      });

      // return records;
      return [];
    },
    isAuth: async (parent, args, { authorization }: Context) => {
      try {
        return !!getUserId(authorization);
      } catch {
        return false;
      }
    }
  },

  Mutation: {
    createRecord: async (parent, args: RecordCreateInput, { authorization, prisma }: Context) => {
      try {
        const userId = getUserId(authorization);
        const record = await prisma.record.create({
          data: {
            // ...objectValuesToLowerCase(args),
            ...args,
            user: { connect: { id: userId } },
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
    deleteRecord: async (parent, { id }, { authorization, prisma }: Context) => {
      try {
        const userId = getUserId(authorization);
        const record = await prisma.record.findMany({ where: { id: Number(id), authorId: userId } }).then(records => {
          if (records?.[0]) {
            return prisma.record.delete({ where: { id: records[0].id }});
          }
          throw new Error('unable to delete');
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
    },
    signup: async (parent, args, { prisma }: Context, info) => {
      const password = await bcrypt.hash(args.password, 10)
      const user = await prisma.user.create({ data: { ...args, password } })
      const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: '3h' })

      return {
        token,
        user,
      }
    },
   login: async (parent, args, { prisma }: Context, info) => {
      const user = await prisma.user.findOne({ where: { email: args.email } });
      if (!user) {
        throw new Error('No such user found')
      }

      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new Error('Invalid password')
      }
    
      const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: '3h' });
      return {
        token,
        user: { record: [], ...user }
      }
    }
  }
};

export default resolvers;
