const infoType = {
  name: "info",
  title: "Info",
  type: "document",
  fields: [
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "timeZone",
      title: "Timezone",
      type: "string",
    },
  ],
};

export default infoType;
