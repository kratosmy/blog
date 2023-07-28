const siteMetadata = {
  title: 'kratos',
  author: 'kratos',
  headerTitle: 'kratos',
  description: 'Software Developer at Morgan Stanley',
  language: 'en-us',
  theme: 'dark', // system, dark or light
  siteUrl: 'https://kratos.top',
  siteRepo: 'https://github.com/kratos/blog',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.webp',
  socialBanner: '/static/images/twitter-card.png',
  email: 'kratos@gmail.com',
  github: 'https://github.com/kratos',
  twitter: 'https://twitter.com/kratos_',
  facebook: 'https://facebook.com/kratos',
  linkedin: 'https://www.linkedin.com/in/kratos/',
  spotify: 'https://open.spotify.com/user/tbm4i6cjkxly6n091mhjew7kp',
  steam: 'https://steamcommunity.com/id/kratos/',
  locale: 'en-US',
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO || '',
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID || '',
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || '',
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
    },
  },
};

module.exports = siteMetadata;
