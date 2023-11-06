const ghpages = require('gh-pages');

ghpages.publish(
    'game', // path to public directory
    () => {
        console.log('Deploy Complete!')
    }
)