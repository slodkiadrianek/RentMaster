import { int, mysqlTable, serial, varchar, json } from 'drizzle-orm/mysql-core';

export const userTable = mysqlTable('users_table', {
    userId: serial().primaryKey().autoincrement(),
    name: varchar({length:80}).notNull(),
    surname: varchar({length:80}).notNull(),
    email: varchar({length:255}).notNull().unique(),
    age: int().notNull(),
    phone: int().notNull(),
    roleId: int().notNull(),
    data: json().notNull(),
    password: varchar({length:255}).notNull(),
    created_at: int().default(0).$defaultFn(() => new Date().getTime()),
    updated_at: int().default(0).$onUpdateFn(() => new Date().getTime()),
})

export  const userRoleTable = mysqlTable('user_roles_table', {
    id: serial().primaryKey().autoincrement(),
    role_name: varchar({length:80}).notNull().unique(),
})
