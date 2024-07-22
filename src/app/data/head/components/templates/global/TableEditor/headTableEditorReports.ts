export default Object.assign({
  title: {
    en: 'Reports',
  },
  action:{
    searchDataGrid: true,
  },
  cardOverview:[
    {
      id: 'post-rerum-count',
      title:{
        en: 'Amount of Post with keyword "Rerum"'
      }
    },
  ],
  table:{
    columns:[
      {
        field: "index",
        headerName: "Index",
      },
      {
        field: "name",
        minWidth: 220,
        flex: 1,
        headerName: "Name",
      },
      {
        field: "postCount",
        minWidth: 100,
        headerName: "Post Count",
      },
      {
        field: "email",
        minWidth: 220,
        headerName: "Email",
      },
      {
        field: "phone",
        minWidth: 200,
        headerName: "Phone",
      },
      {
        field: "website",
        minWidth: 220,
        headerName: "Website",
      },
    ],
  }
});
