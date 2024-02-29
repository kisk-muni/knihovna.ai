import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { users } from "./users";
import { blogPosts } from "./blog-posts";

export const usersToBlogPosts = pgTable(
  "users_to_blog_posts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    blogPostId: uuid("blog_post_id")
      .notNull()
      .references(() => blogPosts.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.blogPostId] }),
  })
);

export const usersToBlogPostsRelation = relations(
  usersToBlogPosts,
  ({ one }) => ({
    blogPost: one(blogPosts, {
      fields: [usersToBlogPosts.blogPostId],
      references: [blogPosts.id],
    }),
    user: one(users, {
      fields: [usersToBlogPosts.userId],
      references: [users.id],
    }),
  })
);
