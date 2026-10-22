import { pgTable, serial, text, timestamp, integer, date, index } from "drizzle-orm/pg-core";

// Lista viaggio gestita dall'agenzia TravelBuy
export const lists = pgTable("lists", {
  id: serial().primaryKey(),
  code: text().notNull().unique(),
  coupleName: text("couple_name").notNull(), // Nome intestatario / Viaggiatori
  destination: text().notNull(),
  openingDate: date("opening_date"), // Data apertura lista
  closingDate: date("closing_date"), // Data chiusura lista
  description: text().notNull().default(""),
  goalCents: integer("goal_cents"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contributions = pgTable(
  "contributions",
  {
    id: serial().primaryKey(),
    listId: integer("list_id")
      .notNull()
      .references(() => lists.id, { onDelete: "cascade" }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    phone: text().notNull().default(""),
    email: text().notNull().default(""),
    message: text().notNull().default(""),
    amountCents: integer("amount_cents").notNull(),
    method: text().notNull(), // "card" | "cash"
    cardLast4: text("card_last4"),
    note: text().notNull().default(""),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("contributions_list_idx").on(t.listId)],
);

export const staff = pgTable("staff", {
  id: serial().primaryKey(),
  email: text().notNull().unique(),
  role: text().notNull().default("staff"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});