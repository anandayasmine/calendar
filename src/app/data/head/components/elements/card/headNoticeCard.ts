export default Object.assign({
  accessDenied: {
    title: {
      en: "You do not have access",
    },
    message: {
      en: "Apologies, you are unable to access this feature. Please contact the admin.",
    },
    image: "ImageAccessDenied",
    useButton: [
      {
        label: {
          en: "Back to Dashboard",
        },
        href: "/",
      },
    ],
  },
  pageNotFound: {
    title: "404.",
    image: "ImageNotFound",
    theme: "image-small",
    message: {
      en: "Page not found.",
    },
    useButton: [
      {
        label: {
          en: "Back to Dashboard",
        },
        theme: "yellow",
        href: "/",
      },
    ],
  },
  underConstruction: {
    title: {
      en: "Page Under Construction",
    },
    image: "ImageUnderConstruction",
    message: {
      en: "This page is currently under construction.",
    },
    useButton:[
      {
        label: {
          en: "Back to Dashboard",
        },
        theme: "yellow",
        href: "/",
      },
    ]
  },
  dataEmpty: {
    title: {
      en: "Data Not Found",
    },
    image: "ImageDataNotFound",
    theme: 'image-small',
    message: {
      en: "No data available for display.",
    },
  },
});
