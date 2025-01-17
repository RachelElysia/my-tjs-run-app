const withCSS = require('@zeit/next-css')

// THIS WAS SUGGESTED VIA THE INTERWEBS (withCSS) BUT CAUSED CRASHES IN RUNNING MY APP

// module.exports = withCSS({

//     cssLoaderOptions: {
//       url: false
//     },

module.exports = ({

    cssLoaderOptions: {
      url: false
    },

    webpackDevMiddleware: (config) => {
        // Solve compiling problem via vagrant
        config.watchOptions = {
        poll: 1000,   // Check for changes every second
        aggregateTimeout: 300,   // delay before rebuilding
        };
        return config;
    },

    async rewrites() {
        return [
        {
            source: '/api/:path*',
            destination: 'http://localhost:5000/api/:path*' // Proxy to Backend
        }
        ]
    }
});
