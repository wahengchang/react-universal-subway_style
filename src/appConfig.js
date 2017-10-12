module.exports = {
  host: process.env.NODE_HOST || 'localhost',
  port: process.env.PORT,
  header: {
    htmlAttributes: { lang: 'en' },
    title: 'React Universal Subway Style',
    titleTemplate: 'React Universal - %s',
    meta: [{ name: 'description', content: 'Finest Ingredients of the React JS ecosystem served to you in Subway style' }],
  },
};
