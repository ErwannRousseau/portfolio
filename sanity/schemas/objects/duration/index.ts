import { defineField } from "sanity";

import { DurationInput } from "./DurationInput";

export default defineField({
  type: "object",
  name: "duration",
  title: "Duration",
  components: {
    input: DurationInput,
  },
  fields: [
    defineField({
      type: "date",
      name: "start",
      title: "Start",
      options: {
        dateFormat: "YYYY-MM",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "date",
      name: "end",
      title: "End",
      options: {
        dateFormat: "YYYY-MM",
      },
    }),
    defineField({
      type: "boolean",
      name: "current",
      title: "Current",
      initialValue: false,
    }),
  ],
});
