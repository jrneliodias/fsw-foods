"use server";

import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  return await db.order.create({ data });
};
