const siteMetadata = {
  title: 'Lov3 Camille',
  author: 'Lov3 Camille',
  headerTitle: 'lov3camille',
  description: 'Software Developer at Morgan Stanley',
  language: 'en-us',
  theme: 'dark', // system, dark or light
  siteUrl: 'https://lov3camille.top',
  siteRepo: 'https://github.com/lov3camille/blog',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.webp',
  socialBanner: '/static/images/twitter-card.png',
  email: 'lov3camille@gmail.com',
  github: 'https://github.com/lov3camille',
  twitter: 'https://twitter.com/lov3camille_',
  facebook: 'https://facebook.com/lov3camille',
  linkedin: 'https://www.linkedin.com/in/lov3camille/',
  spotify: 'https://open.spotify.com/user/tbm4i6cjkxly6n091mhjew7kp',
  steam: 'https://steamcommunity.com/id/lov3camille/',
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
