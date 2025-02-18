const z = require('zod');

const postSchema = z.object({
  title: z.string().min(3).max(100),
  body: z.string().min(3).max(256),
});

module.exports = postSchema;
