import { prisma } from "../lib/prisma.js";
export const createExpense = async (req, res) => {
    try {
        const { description, price, group_id, userIds, note, paid_by_id, method, subcategory_id, } = req.body;
        const newExpenseWithUsers = await prisma.expense.create({
            data: {
                description,
                price,
                group_id,
                paid_by_id,
                note,
                method,
                subcategory_id,
                users: {
                    connect: userIds.map((id) => ({ id })),
                },
            },
            select: {
                users: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
            },
        });
        res.status(200).json({ message: newExpenseWithUsers });
    }
    catch (err) {
        console.log(err);
    }
};
